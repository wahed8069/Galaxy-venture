const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JOBS_FILE = path.join(__dirname, 'jobs.json');
const APPLICATIONS_FILE = path.join(__dirname, 'applications.json');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(__dirname)); // Serve frontend static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads statically

// Ensure uploads folder exists
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
}

// Admin Credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'password';
const ADMIN_TOKEN = 'galaxy-ventures-admin-session-token-2026';

// Helper: Read jobs from JSON
function readJobs() {
  try {
    if (!fs.existsSync(JOBS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(JOBS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading jobs file:', err);
    return [];
  }
}

// Helper: Write jobs to JSON
function writeJobs(jobs) {
  try {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing jobs file:', err);
    return false;
  }
}

// Helper: Read applications from JSON
function readApplications() {
  try {
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading applications file:', err);
    return [];
  }
}

// Helper: Write applications to JSON
function writeApplications(apps) {
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing applications file:', err);
    return false;
  }
}

// --- API ROUTES ---

// 1. Authenticate Admin Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      message: 'Admin authenticated successfully.'
    });
  } else {
    return res.status(401).json({
      success: false,
      error: 'Invalid username or password.'
    });
  }
});

// 2. Fetch Job Database
app.get('/api/jobs', (req, res) => {
  const jobs = readJobs();
  res.json(jobs);
});

// 3. Add Job Posting (Authenticated)
app.post('/api/jobs', (req, res) => {
  // Validate token in Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing administrator token.'
    });
  }
  
  const { title, company, location, salary, type, industry, logo, requirements } = req.body;
  
  if (!title || !company || !location || !salary || !requirements) {
    return res.status(400).json({
      success: false,
      error: 'Missing required job parameters.'
    });
  }
  
  const jobs = readJobs();
  
  // Calculate next ID
  const nextId = jobs.reduce((max, job) => (job.id > max ? job.id : max), 0) + 1;
  
  const newJob = {
    id: nextId,
    title,
    company,
    location,
    salary,
    type: type || 'Full-time',
    industry: industry || 'IT & Technology',
    logo: logo || '🏢',
    requirements
  };
  
  jobs.unshift(newJob); // Put it at the beginning
  
  if (writeJobs(jobs)) {
    res.status(201).json({
      success: true,
      job: newJob
    });
  } else {
    res.status(500).json({
      success: false,
      error: 'Failed to write job entry to disk.'
    });
  }
});

// 4. Delete Job Posting (Authenticated)
app.delete('/api/jobs/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing administrator token.'
    });
  }
  
  const jobId = parseInt(req.params.id);
  let jobs = readJobs();
  const initialLength = jobs.length;
  jobs = jobs.filter(j => j.id !== jobId);
  
  if (jobs.length === initialLength) {
    return res.status(404).json({
      success: false,
      error: 'Job posting not found.'
    });
  }
  
  if (writeJobs(jobs)) {
    res.json({
      success: true,
      message: 'Job entry deleted successfully.'
    });
  } else {
    res.status(500).json({
      success: false,
      error: 'Failed to write updated jobs list to disk.'
    });
  }
});

// 5. Submit Job Application
app.post('/api/applications', async (req, res) => {
  try {
    const { name, email, phone, country, jobTitle, experience } = req.body;
    
    if (!name || !email || !phone || !country || !jobTitle || !experience) {
      return res.status(400).json({
        success: false,
        error: 'Missing required application fields.'
      });
    }
    
    // Create new application record
    const newApp = {
      id: Date.now(),
      name,
      email,
      phone,
      country,
      jobTitle,
      experience,
      submittedAt: new Date().toISOString(),
      applicantIp: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
    };
    
    // Save to applications.json database
    const apps = readApplications();
    apps.unshift(newApp);
    
    if (!writeApplications(apps)) {
      return res.status(500).json({
        success: false,
        error: 'Failed to write application to database.'
      });
    }
    
    // Send email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      // Build HTML Template
      const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; }
          .header { background-color: #0b1329; color: #ffffff; padding: 18px; text-align: center; border-radius: 6px 6px 0 0; }
          .header h2 { margin: 0; font-size: 1.4rem; letter-spacing: 0.5px; }
          .content { padding: 20px 10px; }
          .detail-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
          .detail-table th, .detail-table td { padding: 12px 10px; border-bottom: 1px solid #edf2f7; text-align: left; }
          .detail-table th { width: 35%; color: #4a5568; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
          .detail-table td { color: #1a202c; font-weight: 500; }
          .section-title { font-size: 1.05rem; color: #0b1329; font-weight: 700; border-left: 4px solid #d97706; padding-left: 10px; margin-top: 25px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .footer { text-align: center; margin-top: 30px; font-size: 0.75rem; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Candidate Application</h2>
          </div>
          <div class="content">
            <p style="font-size: 0.95rem; color: #4a5568;">A new candidate has submitted their profile details for evaluation.</p>
            
            <div class="section-title">Candidate Profile Details</div>
            <table class="detail-table">
              <tr>
                <th>Applicant Name</th>
                <td>${name}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>${phone}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>${country}</td>
              </tr>
              <tr>
                <th>Job Applied For</th>
                <td>${jobTitle}</td>
              </tr>
              <tr>
                <th>Experience</th>
                <td>${experience}</td>
              </tr>
              <tr>
                <th>Date & Time</th>
                <td>${newApp.submittedAt}</td>
              </tr>
              <tr>
                <th>Applicant IP</th>
                <td>${newApp.applicantIp}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            <p>This is an automated recruitment alert from Galaxy Venture Portal.</p>
          </div>
        </div>
      </body>
      </html>
      `;
      
      const payload = {
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: ['info.galaxyventureuae@gmail.com'],
        subject: `📩 New Job Application - ${name}`,
        html: htmlEmail
      };
      
      // Call Resend REST API using native fetch
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(async (response) => {
        const body = await response.json();
        if (response.ok) {
          console.log(`Email successfully dispatched via Resend: ${body.id}`);
        } else {
          console.error('Resend API returned error status:', response.status, body);
        }
      })
      .catch((err) => {
        console.error('Error dispatching request to Resend API:', err);
      });
      
    } else {
      console.warn('RESEND_API_KEY environment variable is not configured. Email dispatch skipped.');
    }
    
    // Respond successfully since application was written to database
    res.status(201).json({
      success: true,
      application: newApp
    });
    
  } catch (err) {
    console.error('Unexpected error processing application:', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred.'
    });
  }
});

// Serve main client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(` Galaxy Ventures Backend Server Running `);
  console.log(` Port: http://localhost:${PORT}          `);
  console.log(`========================================`);
});

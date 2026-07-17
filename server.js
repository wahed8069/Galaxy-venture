const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JOBS_FILE = path.join(__dirname, 'jobs.json');

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve frontend static assets

// Admin Credentials
const ADMIN_USER = 'galaxyadmin';
const ADMIN_PASS = 'Galaxy@2026';
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

const APPLICATIONS_FILE = path.join(__dirname, 'applications.json');

// Helper: Read applications from JSON
function readApplications() {
  try {
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      const defaultApps = [
        {
          id: 201,
          name: 'Tariq Mahmood',
          email: 'tariq.m@gmail.com',
          phone: '+971 50 987 6543',
          location: 'London, UK',
          jobTitle: 'Senior Software Engineer (Full Stack)',
          experience: '8 years in React & Node.js development',
          date: '2026-06-22'
        },
        {
          id: 202,
          name: 'Nisha Pillai',
          email: 'nisha.pillai@outlook.com',
          phone: '+91 94460 12345',
          location: 'Kochi, India',
          jobTitle: 'Registered Nurse',
          experience: '5 years in Intensive Care Unit (ICU)',
          date: '2026-06-23'
        },
        {
          id: 203,
          name: 'Michael Vance',
          email: 'm.vance@yahoo.com',
          phone: '+44 7911 123456',
          location: 'Dublin, Ireland',
          jobTitle: 'Operations Project Manager',
          experience: '6 years managing infrastructure initiatives',
          date: '2026-06-19'
        }
      ];
      fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(defaultApps, null, 2), 'utf8');
      return defaultApps;
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
app.post('/api/applications', (req, res) => {
  const { name, email, phone, location, jobTitle, experience } = req.body;
  
  if (!name || !email || !phone || !location || !jobTitle || !experience) {
    return res.status(400).json({
      success: false,
      error: 'Missing required application fields.'
    });
  }
  
  const apps = readApplications();
  const newApp = {
    id: Date.now(),
    name,
    email,
    phone,
    location,
    jobTitle,
    experience,
    date: new Date().toISOString().split('T')[0]
  };
  
  apps.unshift(newApp);
  
  if (writeApplications(apps)) {
    res.status(201).json({
      success: true,
      application: newApp
    });
  } else {
    res.status(500).json({
      success: false,
      error: 'Failed to save application to disk.'
    });
  }
});

// 6. Fetch all Job Applications (Authenticated)
app.get('/api/applications', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing administrator token.'
    });
  }
  
  const apps = readApplications();
  res.json(apps);
});

// 7. Toggle Application Follow Status (Authenticated)
app.post('/api/applications/:id/toggle-follow', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing administrator token.'
    });
  }
  
  const id = parseInt(req.params.id);
  const apps = readApplications();
  const appIndex = apps.findIndex(a => a.id === id);
  
  if (appIndex > -1) {
    apps[appIndex].followed = !apps[appIndex].followed;
    if (writeApplications(apps)) {
      return res.json({
        success: true,
        followed: apps[appIndex].followed
      });
    }
  }
  
  res.status(400).json({
    success: false,
    error: 'Application not found or write failed.'
  });
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

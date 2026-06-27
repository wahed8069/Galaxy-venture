// --- MOCK DATABASE SYSTEMS ---

const DEFAULT_JOBS = [
  {
    "id": 17,
    "title": "uiux",
    "company": "waaaaa",
    "location": "dubai",
    "salary": "76767665 AED",
    "type": "Full-time",
    "industry": "IT & Technology",
    "logo": "🏢",
    "requirements": "tfgyhjnm"
  },
  {
    "id": 1,
    "title": "Senior Software Engineer (Full Stack)",
    "company": "TechNova UAE",
    "location": "Dubai, UAE",
    "salary": "22,000 - 28,000 AED",
    "type": "Full-time",
    "industry": "IT & Technology",
    "logo": "💻",
    "requirements": "React, Node.js, AWS, 5+ years experience."
  },
  {
    "id": 2,
    "title": "Registered Nurse",
    "company": "Emirates Health Clinic",
    "location": "Abu Dhabi, UAE",
    "salary": "14,000 - 18,000 AED",
    "type": "Full-time",
    "industry": "Healthcare",
    "logo": "🩺",
    "requirements": "HAAD/DHA License, ICU experience."
  },
  {
    "id": 3,
    "title": "Operations Project Manager",
    "company": "Al-Futtaim Group",
    "location": "Dubai, UAE",
    "salary": "18,000 - 24,000 AED",
    "type": "Full-time",
    "industry": "Engineering",
    "logo": "⚙️",
    "requirements": "PMP Certified, Construction background."
  },
  {
    "id": 4,
    "title": "Cloud Infrastructure Architect",
    "company": "GigaScale Cloud Solutions",
    "location": "Remote (UAE)",
    "salary": "30,000 - 35,000 AED",
    "type": "Remote",
    "industry": "IT & Technology",
    "logo": "☁️",
    "requirements": "AWS/Azure Professional Certification."
  },
  {
    "id": 5,
    "title": "F&B Manager",
    "company": "Jumeirah Group Resorts",
    "location": "Dubai, UAE",
    "salary": "12,000 - 15,000 AED",
    "type": "Full-time",
    "industry": "Hospitality",
    "logo": "🏨",
    "requirements": "Luxury resort F&B operations experience."
  },
  {
    "id": 6,
    "title": "Site Structural Engineer",
    "company": "Arabtec Construction",
    "location": "Abu Dhabi, UAE",
    "salary": "16,000 - 20,000 AED",
    "type": "Contract",
    "industry": "Construction",
    "logo": "🏗️",
    "requirements": "Civil Engineering degree, UAE Society of Engineers membership."
  },
  {
    "id": 7,
    "title": "Petroleum Geologist",
    "company": "ADNOC Group",
    "location": "Ruwais, UAE",
    "salary": "25,000 - 32,000 AED",
    "type": "Full-time",
    "industry": "Oil & Gas",
    "logo": "🛢️",
    "requirements": "Master's in Geology, 3+ years upstream experience."
  },
  {
    "id": 8,
    "title": "Logistics Operations Lead",
    "company": "DP World",
    "location": "Sharjah, UAE",
    "salary": "13,000 - 16,000 AED",
    "type": "Full-time",
    "industry": "Logistics",
    "logo": "🚢",
    "requirements": "Supply chain management, Sea freight protocols."
  },
  {
    "id": 9,
    "title": "Financial Analyst",
    "company": "Mashreq Bank",
    "location": "Dubai, UAE",
    "salary": "15,000 - 19,000 AED",
    "type": "Full-time",
    "industry": "Finance",
    "logo": "📊",
    "requirements": "CFA Candidate, advanced valuation modeling."
  },
  {
    "id": 10,
    "title": "Senior Retail Store Manager",
    "company": "Chalhoub Group",
    "location": "Dubai, UAE",
    "salary": "11,000 - 14,000 AED",
    "type": "Full-time",
    "industry": "Retail",
    "logo": "🛍️",
    "requirements": "Fashion retail store management, Arabic speaker preferred."
  },
  {
    "id": 11,
    "title": "Senior AI Research Scientist",
    "company": "UAE AI Council",
    "location": "Dubai, UAE",
    "salary": "35,000 - 45,000 AED",
    "type": "Full-time",
    "industry": "IT & Technology",
    "logo": "🧠",
    "requirements": "PhD in Machine Learning, PyTorch, publications."
  },
  {
    "id": 12,
    "title": "Lead Architect (Aviation Projects)",
    "company": "Dubai Airports",
    "location": "Dubai, UAE",
    "salary": "28,000 - 34,000 AED",
    "type": "Full-time",
    "industry": "Engineering",
    "logo": "✈️",
    "requirements": "10+ years airport terminal design, Revit."
  },
  {
    "id": 13,
    "title": "Chief Financial Officer (CFO)",
    "company": "Majid Al Futtaim",
    "location": "Dubai, UAE",
    "salary": "55,000 - 70,000 AED",
    "type": "Full-time",
    "industry": "Finance",
    "logo": "📈",
    "requirements": "CPA/CA, ex-CFO or Finance Director at major group."
  },
  {
    "id": 14,
    "title": "DHA General Practitioner",
    "company": "King's College Hospital",
    "location": "Dubai Marina, UAE",
    "salary": "20,000 - 26,000 AED",
    "type": "Full-time",
    "industry": "Healthcare",
    "logo": "🏥",
    "requirements": "Active DHA License, Family medicine residency."
  },
  {
    "id": 15,
    "title": "Marine Operations Manager",
    "company": "Jebel Ali Port (DP World)",
    "location": "Dubai, UAE",
    "salary": "18,000 - 22,000 AED",
    "type": "Full-time",
    "industry": "Logistics",
    "logo": "⚓",
    "requirements": "Master Mariner certificate, port cargo operations."
  },
  {
    "id": 16,
    "title": "Regional Sales Manager",
    "company": "Chalhoub Group",
    "location": "Abu Dhabi, UAE",
    "salary": "16,000 - 20,000 AED",
    "type": "Full-time",
    "industry": "Retail",
    "logo": "💼",
    "requirements": "Luxury retail management, UAE driver license."
  }
];

let JOBS_DATABASE = [...DEFAULT_JOBS];

async function fetchJobsFromServer() {
  try {
    const res = await fetch('/api/jobs');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (data && Array.isArray(data)) {
      JOBS_DATABASE = data;
      renderActiveView(); // Update page with dynamic job count and content
    }
  } catch (err) {
    console.error("Failed to load jobs from backend, using default fallback:", err);
  }
}

const BLOGS_DATABASE = [
  { id: 1, title: 'Navigating the Golden Visa: UAE Job Market Insights', category: 'Market', date: 'June 18, 2026', readTime: '5 min read', excerpt: 'Understand how the updated Golden Visa rules in the UAE impact professional recruitment and open new residency pathways.', author: 'Fatima Al-Suwaidi', icon: '🔑' },
  { id: 2, title: 'How to Optimize Your CV for Applicant Tracking Systems', category: 'Tips', date: 'May 29, 2026', readTime: '4 min read', excerpt: 'UAE companies rely heavily on AI scanning tools. Learn how to format and inject key parameters to pass structural candidate filters.', author: 'John Davis', icon: '📝' },
  { id: 3, title: 'Top Hiring Trends in Middle East Tech Hubs for 2027', category: 'Trends', date: 'April 14, 2026', readTime: '7 min read', excerpt: 'Deep dive into emerging AI, Cybersecurity, and cloud migration initiatives that are fueling executive recruiting across UAE.', author: 'Rohan Sharma', icon: '🚀' },
  { id: 4, title: 'Interview Preparation: Cultivating the UAE Business Mindset', category: 'Tips', date: 'March 22, 2026', readTime: '5 min read', excerpt: 'A guide on cultural etiquette, salary negotiation, and presenting international credentials to local recruitment panels.', author: 'Amna Al-Hashemi', icon: '🤝' }
];

const TESTIMONIALS_DATABASE = [
  { quote: "Galaxy Venture guided me step-by-step through my transition from London to Dubai. Their DHA licensing and interview coaching got me a placement at a top clinic within three weeks.", author: "Dr. Sarah Jenkins", role: "Critical Care Nurse, Emirates Health Clinic", type: "candidate" },
  { quote: "Finding qualified structural engineers with specific Middle East project exposure is always a challenge. Galaxy Venture delivered a shortlist of three stellar candidates in days.", author: "Eng. Tariq Al-Mansoori", role: "HR Director, Arabtec Construction", type: "employer" },
  { quote: "The AI search assistant on their portal matched me with a remote position. The resume parsing tool was highly intuitive, and my interview scheduling was fully automated.", author: "Liam Chen", role: "Cloud Infrastructure Architect", type: "candidate" }
];

// --- APP GLOBAL STATE ---
const AppState = {
  currentPage: 'home',
  savedJobs: [1, 5], // Job IDs saved by default
  submittedApplications: [
    { jobId: 3, date: '2026-06-20', status: 'Screening' }
  ],
  candidateProfile: {
    fullName: 'Amir Al-Hassan',
    email: 'amir.alhassan@gmail.com',
    phone: '+971 50 123 4567',
    skills: 'HTML, CSS, JavaScript, Web Operations',
    resumeName: 'Amir_Al_Hassan_Resume.pdf'
  },
  atsCandidates: [
    { id: 101, name: 'Tariq Mahmood', role: 'Senior Software Engineer', stage: 'Applied', date: '2026-06-22' },
    { id: 102, name: 'Nisha Pillai', role: 'Registered Nurse', stage: 'Applied', date: '2026-06-23' },
    { id: 103, name: 'Michael Vance', role: 'Operations Project Manager', stage: 'Screening', date: '2026-06-19' },
    { id: 104, name: 'Leila Farooq', role: 'Financial Analyst', stage: 'Interview', date: '2026-06-18' },
    { id: 105, name: 'Robert Blake', role: 'Petroleum Geologist', stage: 'Placed', date: '2026-06-15' }
  ],
  activeJobToApply: null,
  activeCarouselIndex: 0,
  adminActiveTab: 'pipeline'
};

// --- CLIENT-SIDE ROUTER ---
function navigateTo(pageId) {
  AppState.currentPage = pageId;
  renderActiveView();
  updateNavigationUI();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavigationUI() {
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === AppState.currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// --- NOTIFICATION UTILITY ---
function showNotification(message) {
  const banner = document.getElementById('notif-banner');
  const bannerText = document.getElementById('notif-text');
  bannerText.textContent = message;
  banner.classList.add('show');
  setTimeout(() => {
    banner.classList.remove('show');
  }, 4000);
}

// --- RESUME UPLOAD SIMULATOR ---
function openResumeUploadModal(jobId = null) {
  AppState.activeJobToApply = jobId;
  const overlay = document.getElementById('upload-modal-overlay');
  overlay.classList.add('open');
  
  // Reset upload box view
  document.getElementById('upload-drag-area').style.display = 'block';
  document.getElementById('upload-status-box').style.display = 'none';
  document.getElementById('upload-progress-fill').style.width = '0%';
}

function closeResumeUploadModal() {
  const overlay = document.getElementById('upload-modal-overlay');
  overlay.classList.remove('open');
  AppState.activeJobToApply = null;
}

function handleResumeFileSelect(file) {
  if (!file) return;
  
  const dragArea = document.getElementById('upload-drag-area');
  const statusBox = document.getElementById('upload-status-box');
  const progressFill = document.getElementById('upload-progress-fill');
  const statusLabel = document.getElementById('upload-status-label');
  
  dragArea.style.display = 'none';
  statusBox.style.display = 'block';
  
  let progress = 0;
  statusLabel.textContent = `Uploading ${file.name}...`;
  
  const uploadTimer = setInterval(() => {
    progress += 8;
    if (progress > 100) progress = 100;
    progressFill.style.width = `${progress}%`;
    
    if (progress === 100) {
      clearInterval(uploadTimer);
      
      // Step 2: Scanning
      statusLabel.textContent = "Scanning for UAE compliance standard...";
      setTimeout(() => {
        // Step 3: Parsing
        statusLabel.textContent = "Extracting skills and credentials...";
        setTimeout(() => {
          // Success
          statusLabel.innerHTML = `<span style="color:#10b981; font-weight:700;">✓ Parsing Complete!</span>`;
          
          AppState.candidateProfile.resumeName = file.name;
          
          // If associated with a job application
          if (AppState.activeJobToApply) {
            const job = JOBS_DATABASE.find(j => j.id === AppState.activeJobToApply);
            
            // Add to applied jobs
            AppState.submittedApplications.push({
              jobId: job.id,
              date: new Date().toISOString().split('T')[0],
              status: 'Applied'
            });
            
            // Add to employer ATS dashboard for testing feedback
            AppState.atsCandidates.push({
              id: Date.now(),
              name: AppState.candidateProfile.fullName,
              role: job.title,
              stage: 'Applied',
              date: new Date().toISOString().split('T')[0]
            });
            
            showNotification(`Applied successfully for ${job.title}!`);
          } else {
            showNotification("CV uploaded and candidate profile updated.");
          }
          
          setTimeout(() => {
            closeResumeUploadModal();
            // Redirect to Candidate Dashboard to see application
            navigateTo('candidates');
          }, 1000);
          
        }, 1200);
      }, 1000);
    }
  }, 150);
}

// --- AI SEARCH ASSISTANT DRAWER ---
function toggleAIDrawer() {
  const drawer = document.getElementById('ai-drawer');
  drawer.classList.toggle('open');
}

function sendAIMessage() {
  const input = document.getElementById('ai-chat-input');
  const text = input.value.trim();
  if (!text) return;
  
  appendChatMessage(text, 'user');
  input.value = '';
  
  // Show typing indicator
  const indicator = document.getElementById('ai-typing-indicator');
  indicator.style.display = 'flex';
  
  setTimeout(() => {
    indicator.style.display = 'none';
    const responseHTML = processAIQuery(text);
    appendChatMessage(responseHTML, 'assistant');
  }, 1000);
}

function appendChatMessage(content, sender) {
  const messagesBox = document.getElementById('ai-chat-messages');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = content;
  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function processAIQuery(query) {
  const q = query.toLowerCase();
  let matchedJobs = [];
  
  // Simple Keyword Parsing
  if (q.includes('it') || q.includes('software') || q.includes('developer') || q.includes('cloud') || q.includes('tech')) {
    matchedJobs = JOBS_DATABASE.filter(j => j.industry === 'IT & Technology');
  } else if (q.includes('nurse') || q.includes('health') || q.includes('clinic') || q.includes('medical')) {
    matchedJobs = JOBS_DATABASE.filter(j => j.industry === 'Healthcare');
  } else if (q.includes('dubai')) {
    matchedJobs = JOBS_DATABASE.filter(j => j.location.includes('Dubai'));
  } else if (q.includes('abu dhabi')) {
    matchedJobs = JOBS_DATABASE.filter(j => j.location.includes('Abu Dhabi'));
  } else if (q.includes('remote')) {
    matchedJobs = JOBS_DATABASE.filter(j => j.type === 'Remote');
  } else if (q.includes('finance') || q.includes('analyst') || q.includes('bank')) {
    matchedJobs = JOBS_DATABASE.filter(j => j.industry === 'Finance');
  } else if (q.includes('construction') || q.includes('engineer') || q.includes('project manager')) {
    matchedJobs = JOBS_DATABASE.filter(j => j.industry === 'Construction' || j.industry === 'Engineering');
  }
  
  if (matchedJobs.length > 0) {
    let response = `I found ${matchedJobs.length} match(es) in the UAE directory that fit your interest:<br><div class="chat-suggestions" style="margin-top:8px;">`;
    matchedJobs.forEach(job => {
      response += `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px; display:flex; flex-direction:column; gap:4px;">
          <strong style="color:#0f172a; font-size:0.9rem;">${job.title}</strong>
          <span style="font-size:0.8rem; color:#4b5563;">${job.company} • ${job.location}</span>
          <span style="font-size:0.8rem; color:#6d28d9; font-weight:700;">${job.salary}</span>
          <button onclick="openResumeUploadModal(${job.id}); toggleAIDrawer();" class="btn btn-primary" style="padding:4px 8px; font-size:0.75rem; border-radius:4px; margin-top:4px; align-self:flex-start;">Apply Now</button>
        </div>
      `;
    });
    response += `</div>`;
    return response;
  }
  
  return `I couldn't find a specific match for that keyword. Galaxy Venture handles roles in **IT & Technology, Healthcare, Engineering, Finance, Logistics, and Construction**. Try asking:<br>
          <div class="chat-suggestions">
            <button class="chat-suggest-btn" onclick="triggerSuggest('Show me cloud developer jobs')">"Show me cloud developer jobs"</button>
            <button class="chat-suggest-btn" onclick="triggerSuggest('Jobs in Abu Dhabi')">"Jobs in Abu Dhabi"</button>
            <button class="chat-suggest-btn" onclick="triggerSuggest('Finance jobs in Dubai')">"Finance jobs in Dubai"</button>
          </div>`;
}

function triggerSuggest(text) {
  const input = document.getElementById('ai-chat-input');
  input.value = text;
  sendAIMessage();
}

// --- LIVE CHAT WIDGET ---
function toggleLiveChat() {
  const chatBox = document.getElementById('live-chat-box');
  chatBox.classList.toggle('open');
}

function sendLiveChatMessage() {
  const input = document.getElementById('live-chat-input');
  const text = input.value.trim();
  if (!text) return;
  
  appendLiveMessage(text, 'user');
  input.value = '';
  
  const body = document.getElementById('live-chat-body');
  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  indicator.style.display = 'flex';
  body.appendChild(indicator);
  body.scrollTop = body.scrollHeight;
  
  setTimeout(() => {
    indicator.remove();
    appendLiveMessage("Thank you for contacting Galaxy Support. An agent will be online shortly. You can also contact us instantly via WhatsApp.", 'agent');
  }, 1500);
}

function appendLiveMessage(content, sender) {
  const body = document.getElementById('live-chat-body');
  const msg = document.createElement('div');
  msg.style.padding = '8px';
  msg.style.borderRadius = '8px';
  msg.style.fontSize = '0.85rem';
  msg.style.maxWidth = '85%';
  
  if (sender === 'user') {
    msg.style.backgroundColor = '#6d28d9';
    msg.style.color = '#ffffff';
    msg.style.alignSelf = 'flex-end';
  } else {
    msg.style.backgroundColor = '#ffffff';
    msg.style.color = '#111827';
    msg.style.border = '1px solid #e2e8f0';
    msg.style.alignSelf = 'flex-start';
  }
  msg.textContent = content;
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}

// --- CAROUSEL NAVIGATION ---
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!slides.length) return;
  
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.onclick = () => showSlide(idx);
    dotsContainer.appendChild(dot);
  });
  
  showSlide(0);
}

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;
  
  let newIdx = index;
  if (index >= slides.length) newIdx = 0;
  if (index < 0) newIdx = slides.length - 1;
  
  AppState.activeCarouselIndex = newIdx;
  
  slides.forEach((slide, idx) => {
    if (idx === newIdx) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  dots.forEach((dot, idx) => {
    if (idx === newIdx) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  showSlide(AppState.activeCarouselIndex + 1);
}

function prevSlide() {
  showSlide(AppState.activeCarouselIndex - 1);
}

// --- DYNAMIC VIEW RENDERING ---

function renderActiveView() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Clear previous view
  mainContent.className = 'view-fade'; // Add animation class
  
  switch (AppState.currentPage) {
    case 'home':
      mainContent.innerHTML = getHomeTemplate();
      initCarousel();
      break;
    case 'about':
      mainContent.innerHTML = getAboutTemplate();
      break;
    case 'jobs':
      mainContent.innerHTML = getJobsTemplate();
      filterJobs(); // Populate initial lists
      break;
    case 'employers':
      mainContent.innerHTML = getEmployersTemplate();
      break;
    case 'candidates':
      mainContent.innerHTML = getCandidatesTemplate();
      break;
    case 'blog':
      mainContent.innerHTML = getBlogTemplate();
      break;
    case 'contact':
      mainContent.innerHTML = getContactTemplate();
      break;
    default:
      mainContent.innerHTML = getHomeTemplate();
      initCarousel();
  }
}

// --- COMPONENT TEMPLATES ---

// 1. HOME TEMPLATE
function getHomeTemplate() {
  // Testimonials filter candidates vs employers
  const testSlides = TESTIMONIALS_DATABASE.map((t, idx) => `
    <div class="carousel-slide ${idx === 0 ? 'active' : ''}">
      <p class="testimonial-quote">"${t.quote}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.author.charAt(0)}</div>
        <div class="author-info">
          <div class="author-name">${t.author}</div>
          <div class="author-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  // Featured Jobs cards (take top 3)
  const featJobs = JOBS_DATABASE.slice(0, 3).map(j => `
    <div class="job-card">
      <div class="job-card-header">
        <span class="job-company">${j.company}</span>
        <span class="job-type-badge ${j.type === 'Full-time' ? 'job-type-full' : j.type === 'Remote' ? 'job-type-remote' : 'job-type-contract'}">${j.type}</span>
      </div>
      <h4 class="job-title">${j.title}</h4>
      <div class="job-details">
        <div class="job-detail-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span>${j.location}</span>
        </div>
        <div class="job-detail-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span>${j.industry}</span>
        </div>
      </div>
      <div class="job-card-footer">
        <span class="job-salary">${j.salary}</span>
        <button onclick="openResumeUploadModal(${j.id})" class="btn btn-primary" style="padding:0.5rem 1rem; font-size:0.85rem;">Apply</button>
      </div>
    </div>
  `).join('');

  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="galaxy-glow-bg">
        <div class="glow-orb glow-orb-1"></div>
        <div class="glow-orb glow-orb-2"></div>
        <div class="glow-orb glow-orb-3"></div>
        <div class="dot-grid"></div>
      </div>
      <div class="container hero-content">
        <div class="badge-tag">
          <span style="font-size:0.65rem; color:#06b6d4;">✦</span> Premium UAE Recruitment & Global Search
        </div>
        <h1 class="hero-title">Connecting Talent with Opportunity <span class="gradient-text"><br>Across the UAE and Beyond</span></h1>
        <p class="hero-subtitle">Galaxy Venture helps professionals discover rewarding careers while enabling companies to hire exceptional talent efficiently.</p>
        <div class="hero-ctas">
          <button onclick="navigateTo('jobs')" class="btn btn-primary">Find Jobs <svg style="width:16px;height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
          <button onclick="navigateTo('employers')" class="btn btn-secondary">Hire Talent <svg style="width:16px;height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></button>
        </div>
        
        <!-- Abstract Galaxy Illustration -->
        <div class="galaxy-illustration">
          <div class="galaxy-center"></div>
          <div class="galaxy-orbit orbit-1"><div class="planet planet-cyan"></div></div>
          <div class="galaxy-orbit orbit-2"><div class="planet planet-purple"></div></div>
          <div class="galaxy-orbit orbit-3"><div class="planet planet-dark"></div></div>
        </div>
      </div>
    </section>

    <!-- About Section Sneak Peak -->
    <section class="about-section section-padding">
      <div class="container grid-2">
        <div class="about-features">
          <span class="section-tag">WHO WE ARE</span>
          <h2 class="section-title">Exclusive Recruitment Specialists Based in the United Arab Emirates</h2>
          <p>We are a bespoke, premium talent consultancy offering tailored talent sourcing, local UAE compliance clearance, and global headhunting capabilities. We represent the bridge between industry-leading companies and highly accomplished professionals globally.</p>
          <div style="margin-top:1rem;">
            <button onclick="navigateTo('about')" class="btn btn-secondary">Learn Our Story</button>
          </div>
        </div>
        <div class="about-features" style="background:#f8fafc; padding:2rem; border-radius:16px; border:1px solid #e2e8f0;">
          <div class="about-feat-item">
            <div class="about-feat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9c1.657 0 3 4.03 3 9s-1.343 9-3 9m0-18c-1.657 0-3 4.03-3 9s1.343 9 3 9m-9-9a9 9 0 019-9"></path></svg>
            </div>
            <div>
              <h4 class="about-feat-title">Global Talent Network</h4>
              <p class="about-feat-desc">Access to active and passive talent nodes across GCC, Europe, and Asia-Pacific.</p>
            </div>
          </div>
          <div class="about-feat-item">
            <div class="about-feat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
            </div>
            <div>
              <h4 class="about-feat-title">Local Market Compliance</h4>
              <p class="about-feat-desc">In-depth guidance on UAE labor laws, licensing, DHA/HAAD clinical standards, and visa sponsorship.</p>
            </div>
          </div>
          <div class="about-feat-item">
            <div class="about-feat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <h4 class="about-feat-title">Dedicated Corporate Account Support</h4>
              <p class="about-feat-desc">Providing rapid pipelines for Permanent Staffing and Executive Search.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section section-padding">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">SERVICES</span>
          <h2 class="section-title">Bespoke Talent Solutions Tailored for Success</h2>
          <p class="section-subtitle">Connecting exceptional talent with premium UAE businesses through customized matching strategies.</p>
        </div>
        <div class="services-grid-wrapper">
          <div>
            <h3 class="service-column-title"><span>For</span> Job Seekers</h3>
            <div class="services-list">
              <div class="service-card" onclick="navigateTo('candidates')">
                <div class="service-card-header">
                  <span class="service-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></span>
                  <h4 class="service-card-title">Job Placement</h4>
                </div>
                <p>Curating connections with leading corporations in Dubai, Abu Dhabi, and beyond.</p>
              </div>
              <div class="service-card" onclick="navigateTo('candidates')">
                <div class="service-card-header">
                  <span class="service-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg></span>
                  <h4 class="service-card-title">Career Counseling</h4>
                </div>
                <p>Personalized strategic planning and mentorship tailored to the Middle Eastern corporate landscape.</p>
              </div>
              <div class="service-card" onclick="navigateTo('candidates')">
                <div class="service-card-header">
                  <span class="service-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></span>
                  <h4 class="service-card-title">CV Optimization & Cover Letters</h4>
                </div>
                <p>Re-structuring your resume template to pass scanning mechanisms and impress recruiters.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="service-column-title"><span>For</span> Employers</h3>
            <div class="services-list">
              <div class="service-card" onclick="navigateTo('employers')">
                <div class="service-card-header">
                  <span class="service-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></span>
                  <h4 class="service-card-title">Executive Search</h4>
                </div>
                <p>Direct premium acquisition for board members, C-level leadership, and managing partners.</p>
              </div>
              <div class="service-card" onclick="navigateTo('employers')">
                <div class="service-card-header">
                  <span class="service-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></span>
                  <h4 class="service-card-title">Permanent Staffing Solutions</h4>
                </div>
                <p>End-to-end recruitment management, from listing and testing to final offer onboarding.</p>
              </div>
              <div class="service-card" onclick="navigateTo('employers')">
                <div class="service-card-header">
                  <span class="service-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg></span>
                  <h4 class="service-card-title">Workforce Contracting</h4>
                </div>
                <p>Supplying specialized short-term and contract consultants for operational flexibility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us / Statistics -->
    <section class="why-section section-padding">
      <div class="container">
        <div class="stats-grid grid-4" style="margin-bottom: var(--spacing-lg);">
          <div class="dot-grid"></div>
          <div class="stat-item">
            <div class="stat-number">5,000+</div>
            <div class="stat-label">Candidates Placed</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">300+</div>
            <div class="stat-label">Partner Corporations</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">95%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">10+ Yrs</div>
            <div class="stat-label">UAE Market Experience</div>
          </div>
        </div>
        
        <div class="grid-3">
          <div class="why-card">
            <div class="why-card-icon flex-center">
              <svg style="width:22px;height:22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 class="why-card-title">Verified Opportunities Only</h4>
            <p>Every listing on our network is direct-from-employer and fully vetted for contract accuracy.</p>
          </div>
          <div class="why-card">
            <div class="why-card-icon flex-center">
              <svg style="width:22px;height:22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h4 class="why-card-title">Expedited Sourcing Cycle</h4>
            <p>Our average placement timeline is 14 days, significantly outperforming standard agencies.</p>
          </div>
          <div class="why-card">
            <div class="why-card-icon flex-center">
              <svg style="width:22px;height:22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.945M11 20.077V19a2 2 0 012-2h1a2 2 0 002-2v-1a2 2 0 012-2h1.077M10.025 8a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h4 class="why-card-title">Global Talent Pipeline</h4>
            <p>Connecting international talent from key tech and clinical nodes with Middle East employers.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs Preview -->
    <section class="jobs-section section-padding">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">OPPORTUNITIES</span>
          <h2 class="section-title">Latest UAE Roles We Are Filling</h2>
          <p class="section-subtitle">Apply directly or check our jobs directory for advanced search filters.</p>
        </div>
        <div class="job-cards-grid" style="margin-bottom:var(--spacing-lg);">
          ${featJobs}
        </div>
        <div style="text-align:center;">
          <button onclick="navigateTo('jobs')" class="btn btn-secondary">Explore All Open Roles</button>
        </div>
      </div>
    </section>

    <!-- Success Stories (Testimonials) -->
    <section class="stories-section section-padding">
      <div class="dot-grid"></div>
      <div class="container">
        <div class="section-header">
          <span class="section-tag" style="color:var(--electric-cyan);">SUCCESS STORIES</span>
          <h2 class="section-title">Trusted by Leading Teams & Candidates</h2>
        </div>
        
        <div class="carousel-container">
          ${testSlides}
        </div>
        
        <div class="carousel-controls">
          <button class="carousel-btn" onclick="prevSlide()"><svg style="width:20px;height:20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
          <div class="carousel-dots" id="carousel-dots"></div>
          <button class="carousel-btn" onclick="nextSlide()"><svg style="width:20px;height:20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
        </div>
      </div>
    </section>

    <!-- Industries We Serve Grid -->
    <section class="industries-section section-padding">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">SECTORS OF EXPERTISE</span>
          <h2 class="section-title">Industries We Connect</h2>
        </div>
        
        <div class="industry-grid">
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">🏗️</div>
            <div class="industry-title">Construction</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">🩺</div>
            <div class="industry-title">Healthcare</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">🏨</div>
            <div class="industry-title">Hospitality</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">💻</div>
            <div class="industry-title">IT & Tech</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">⚙️</div>
            <div class="industry-title">Engineering</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">🛢️</div>
            <div class="industry-title">Oil & Gas</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">🚢</div>
            <div class="industry-title">Logistics</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">📊</div>
            <div class="industry-title">Finance</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">🛍️</div>
            <div class="industry-title">Retail</div>
          </div>
          <div class="industry-card" onclick="navigateTo('jobs')">
            <div class="industry-icon">✈️</div>
            <div class="industry-title">Aviation</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Timeline -->
    <section class="process-section section-padding">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">OUR METHODOLOGY</span>
          <h2 class="section-title">The Galaxy Path to Placement</h2>
          <p class="section-subtitle">How we connect premier candidates with the perfect corporate roles.</p>
        </div>
        
        <div class="timeline">
          <div class="timeline-item timeline-left">
            <div class="timeline-content">
              <div class="timeline-number">01</div>
              <h4 class="timeline-title">Submit Application</h4>
              <p>Upload your CV or build a candidate profile. Our systems parse skills and structural parameters matching search tags.</p>
            </div>
          </div>
          <div class="timeline-item timeline-right">
            <div class="timeline-content">
              <div class="timeline-number">02</div>
              <h4 class="timeline-title">Recruiter Screening</h4>
              <p>Our specialized recruiters perform cultural matching and verified clinical or technical vetting phone screening.</p>
            </div>
          </div>
          <div class="timeline-item timeline-left">
            <div class="timeline-content">
              <div class="timeline-number">03</div>
              <h4 class="timeline-title">Interview Coordination</h4>
              <p>We manage scheduling, briefing, and negotiation with employers in Dubai or Abu Dhabi on your behalf.</p>
            </div>
          </div>
          <div class="timeline-item timeline-right">
            <div class="timeline-content">
              <div class="timeline-number">04</div>
              <h4 class="timeline-title">Employer Placement</h4>
              <p>Onboarding clearance verification, DHA/HAAD license transfers, and local contract signing support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Contact section -->
    <section class="section-padding" style="background:#f8fafc; border-top: 1px solid #e2e8f0;">
      <div class="container" style="text-align:center; max-width:800px;">
        <h2 style="font-size:2.25rem; margin-bottom:1rem;">Ready to Expand Your Horizon?</h2>
        <p style="margin-bottom:2rem; font-size:1.1rem;">Whether you are a senior executive aiming to accelerate your career path or a multinational company looking to staff highly specialized pipelines, Galaxy Venture is your strategic partner.</p>
        <div class="hero-ctas">
          <button onclick="navigateTo('contact')" class="btn btn-primary">Connect With Us</button>
          <button onclick="toggleAIDrawer()" class="btn btn-secondary">Talk to AI Recruiter</button>
        </div>
      </div>
    </section>
  `;
}

// 2. ABOUT US TEMPLATE
function getAboutTemplate() {
  return `
    <section class="inner-hero">
      <div class="dot-grid"></div>
      <div class="container" style="text-align:center;">
        <span class="section-tag" style="color:var(--electric-cyan);">ABOUT GALAXY VENTURE</span>
        <h1>We Pioneer Recruiting Innovation</h1>
        <p style="max-width:600px; margin:0 auto; color:rgba(255,255,255,0.8);">Connecting top-tier professionals globally with leading corporations across the United Arab Emirates since 2016.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid-2">
          <div>
            <h2 style="font-size:1.8rem; margin-bottom:1rem; color:var(--midnight-blue);">Our Company Story</h2>
            <p style="margin-bottom:1rem;">Founded in the Dubai International Financial Centre (DIFC) in 2016, Galaxy Venture set out to replace archaic, slow recruitment models with an active, technology-driven approach.</p>
            <p style="margin-bottom:1rem;">We combined advanced candidate parsing software with direct human expertise, setting up specific verticals in IT & Tech, Healthcare, Engineering, and Finance. Today, we stand as one of the UAE\'s most trusted consultancy networks, licensed and approved for executive staffing by the Ministry of Human Resources and Emiratisation (MOHRE).</p>
          </div>
          <div style="background:var(--slate-light); border:1px solid var(--slate-border); padding:2rem; border-radius:16px; display:flex; flex-direction:column; justify-content:center;">
            <div style="margin-bottom:1.5rem;">
              <h4 style="font-size:1.2rem; font-weight:700; color:var(--cosmic-purple); margin-bottom:0.4rem;">Our Mission</h4>
              <p>To eliminate hiring friction by utilizing conversational matching technologies, while maintaining a white-glove, candidate-focused advisory service.</p>
            </div>
            <div>
              <h4 style="font-size:1.2rem; font-weight:700; color:var(--electric-cyan); margin-bottom:0.4rem;">Our Vision</h4>
              <p>To become the premier talent-access gateway for technology, executive management, and healthcare hubs in the Gulf Cooperation Council (GCC).</p>
            </div>
          </div>
        </div>
        
        <h2 style="font-size:1.8rem; margin-top:4rem; text-align:center; color:var(--midnight-blue);">Our Leadership Team</h2>
        <p style="text-align:center; max-width:600px; margin:0.5rem auto 2rem; color:var(--slate-text);">The seasoned industry professionals guiding our global operations.</p>
        
        <div class="team-grid">
          <div class="team-card">
            <div class="team-avatar-box">👤</div>
            <div class="team-info">
              <div class="team-name">Fares Al-Maktoum</div>
              <div class="team-role">Managing Director & Founder</div>
              <p style="font-size:0.85rem;">Ex-DIFC Investment Advisor, 15+ years in Middle East corporate relations.</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar-box">👤</div>
            <div class="team-info">
              <div class="team-name">Dr. Helen Carter</div>
              <div class="team-role">Head of Healthcare Placements</div>
              <p style="font-size:0.85rem;">Clinical operations specialist. Manages DHA/MOH regulatory client pipelines.</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar-box">👤</div>
            <div class="team-info">
              <div class="team-name">Vikram Sinha</div>
              <div class="team-role">Director of Tech Sourcing</div>
              <p style="font-size:0.85rem;">Specializes in Cloud Architect and Senior Software Dev executive search.</p>
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar-box">👤</div>
            <div class="team-info">
              <div class="team-name">Amna Al-Jaber</div>
              <div class="team-role">Lead Onboarding & Visa Lead</div>
              <p style="font-size:0.85rem;">Liaises directly with MOHRE for candidate permits and Golden Visa consulting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// 3. JOBS TEMPLATE WITH FILTER LOGIC
function getJobsTemplate() {
  return `
    <section class="inner-hero">
      <div class="dot-grid"></div>
      <div class="container" style="text-align:center;">
        <span class="section-tag" style="color:var(--electric-cyan);">OPPORTUNITIES IN THE UAE</span>
        <h1>Find Your Next Corporate Role</h1>
        <p style="max-width:600px; margin:0 auto; color:rgba(255,255,255,0.8);">Filter through our vetted, high-paying vacancies in Tech, Healthcare, Finance, and Engineering.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <!-- Dynamic Filter Controls -->
        <div class="jobs-filter-bar">
          <div class="search-input-wrapper">
            <svg style="width:20px;height:20px;color:var(--slate-text);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" id="job-search-input" oninput="filterJobs()" placeholder="Search titles, skills, or companies...">
          </div>
          
          <select id="filter-location" onchange="filterJobs()" class="filter-select">
            <option value="">All Locations</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Remote">Remote</option>
          </select>

          <select id="filter-industry" onchange="filterJobs()" class="filter-select">
            <option value="">All Industries</option>
            <option value="IT & Technology">IT & Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Engineering">Engineering</option>
            <option value="Construction">Construction</option>
            <option value="Oil & Gas">Oil & Gas</option>
            <option value="Logistics">Logistics</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
          </select>

          <select id="filter-type" onchange="filterJobs()" class="filter-select">
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <!-- Render list -->
        <div class="job-cards-grid" id="jobs-listing-container">
          <!-- Rendered dynamically by filterJobs() -->
        </div>
      </div>
    </section>
  `;
}

function filterJobs() {
  const keyword = document.getElementById('job-search-input').value.toLowerCase();
  const location = document.getElementById('filter-location').value;
  const industry = document.getElementById('filter-industry').value;
  const type = document.getElementById('filter-type').value;
  
  const filtered = JOBS_DATABASE.filter(job => {
    const matchKeyword = job.title.toLowerCase().includes(keyword) || 
                         job.company.toLowerCase().includes(keyword) || 
                         job.requirements.toLowerCase().includes(keyword);
                         
    const matchLoc = !location || job.location.includes(location) || (location === 'Remote' && job.type === 'Remote');
    const matchInd = !industry || job.industry === industry;
    const matchType = !type || job.type === type;
    
    return matchKeyword && matchLoc && matchInd && matchType;
  });
  
  const container = document.getElementById('jobs-listing-container');
  if (!container) return;
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:3rem; background:#f8fafc; border-radius:12px; border:1px dashed #e2e8f0;">
        <span style="font-size:2rem;">🔍</span>
        <h4 style="margin-top:1rem; font-weight:700;">No vacancies match your filter settings</h4>
        <p>Try clearing some tags or chat with our AI recruiter for direct matchmaking assistance.</p>
        <button onclick="toggleAIDrawer()" class="btn btn-primary" style="margin-top:1rem;">Ask AI Assistant</button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filtered.map(j => {
    const isSaved = AppState.savedJobs.includes(j.id);
    return `
      <div class="job-card">
        <div class="job-card-header">
          <span class="job-company">${j.company}</span>
          <span class="job-type-badge ${j.type === 'Full-time' ? 'job-type-full' : j.type === 'Remote' ? 'job-type-remote' : 'job-type-contract'}">${j.type}</span>
        </div>
        <h4 class="job-title">${j.title}</h4>
        <div class="job-details">
          <div class="job-detail-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>${j.location}</span>
          </div>
          <div class="job-detail-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span>${j.industry}</span>
          </div>
          <div style="margin-top:0.5rem; font-size:0.8rem; background:#f8fafc; border-radius:4px; padding:6px; border:1px solid #e2e8f0; font-family:monospace;">
            Req: ${j.requirements}
          </div>
        </div>
        <div class="job-card-footer">
          <span class="job-salary" style="font-size:0.95rem;">${j.salary}</span>
          <div style="display:flex; gap:0.4rem;">
            <button onclick="toggleSaveJob(${j.id})" class="btn btn-secondary" style="padding:0.4rem; border-radius:8px;">
              <svg style="width:16px;height:16px; fill:${isSaved ? '#6d28d9' : 'none'}; stroke:${isSaved ? '#6d28d9' : 'currentColor'};" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
            <button onclick="openResumeUploadModal(${j.id})" class="btn btn-primary" style="padding:0.5rem 0.9rem; font-size:0.8rem;">Apply</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleSaveJob(jobId) {
  const index = AppState.savedJobs.indexOf(jobId);
  if (index > -1) {
    AppState.savedJobs.splice(index, 1);
    showNotification("Job removed from saved list.");
  } else {
    AppState.savedJobs.push(jobId);
    showNotification("Job saved to candidate profile!");
  }
  filterJobs(); // Re-render jobs list to update icon
}

// 4. EMPLOYERS TEMPLATE WITH JOB POSTING MOCK
function getEmployersTemplate() {
  return `
    <section class="inner-hero">
      <div class="dot-grid"></div>
      <div class="container" style="text-align:center;">
        <span class="section-tag" style="color:var(--electric-cyan);">CORPORATE SOLUTIONS</span>
        <h1>Hire exceptional talent in UAE</h1>
        <p style="max-width:600px; margin:0 auto; color:rgba(255,255,255,0.8);">Accelerating growth by delivering fully compliant senior professionals and technical specialists.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid-2" style="margin-bottom:4rem;">
          <div>
            <h2 style="font-size:1.8rem; color:var(--midnight-blue); margin-bottom:1rem;">Advanced Recruitment Structuring</h2>
            <p style="margin-bottom:1rem;">Galaxy Venture provides full lifecycle corporate search configurations. We take over the sourcing burden, screening, and legal pre-clearance with the Ministry of Human Resources (MOHRE), delivering a highly vetted candidate roster ready to perform.</p>
            <p style="margin-bottom:1.5rem;">Our search mechanisms connect directly with passive technology nodes and medical pools across Europe, North America, and South Asia, providing localized talent matching for UAE enterprises.</p>
            
            <div style="background:var(--slate-light); border-left:4px solid var(--cosmic-purple); padding:1rem; border-radius:0 12px 12px 0;">
              <strong style="color:var(--midnight-blue); font-size:0.95rem;">Interactive Feature Check</strong><br>
              <span style="font-size:0.85rem; color:var(--slate-text);">Toggle to our **Employer Dashboard** to view a live demonstration of our proprietary Applicant Tracking System (Kanban) and advance candidate files in real-time.</span>
            </div>
            <button onclick="navigateToEmployerDashboard()" class="btn btn-primary" style="margin-top:1rem;">Access Employer Portal</button>
          </div>
          
          <!-- Corporate Infographic/Showcase (Form removed from public page) -->
          <div class="contact-form-wrapper" style="display:flex; flex-direction:column; justify-content:center; gap:var(--spacing-sm); background:linear-gradient(135deg, var(--midnight-blue) 0%, #1e1b4b 100%); color:var(--pure-white); padding:var(--spacing-lg); border-radius:var(--radius-lg);">
            <h3 style="font-size:1.4rem; font-weight:700; color:var(--pure-white); margin-bottom:0.3rem;">Corporate Sourcing Strengths</h3>
            <p style="font-size:0.9rem; color:rgba(255, 255, 255, 0.7); margin-bottom:1rem;">Galaxy Venture provides executive search and permanent staffing solutions tailored to GCC market demands.</p>
            
            <div style="display:flex; flex-direction:column; gap:var(--spacing-sm);">
              <div style="display:flex; gap:var(--spacing-sm); align-items:flex-start;">
                <div style="background:rgba(6, 182, 212, 0.15); color:var(--electric-cyan); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-weight:700; border:1px solid rgba(6, 182, 212, 0.3);">1</div>
                <div>
                  <strong style="color:var(--pure-white); font-size:1rem; display:block;">Talent Vetting</strong>
                  <span style="font-size:0.85rem; color:rgba(255,255,255,0.65);">AI-powered profile ranking coupled with expert human screening.</span>
                </div>
              </div>
              <div style="display:flex; gap:var(--spacing-sm); align-items:flex-start;">
                <div style="background:rgba(6, 182, 212, 0.15); color:var(--electric-cyan); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-weight:700; border:1px solid rgba(6, 182, 212, 0.3);">2</div>
                <div>
                  <strong style="color:var(--pure-white); font-size:1rem; display:block;">Local Compliance</strong>
                  <span style="font-size:0.85rem; color:rgba(255,255,255,0.65);">HAAD/DHA Clinical transfers, visa clearances, and labor card setups.</span>
                </div>
              </div>
              <div style="display:flex; gap:var(--spacing-sm); align-items:flex-start;">
                <div style="background:rgba(6, 182, 212, 0.15); color:var(--electric-cyan); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-weight:700; border:1px solid rgba(6, 182, 212, 0.3);">3</div>
                <div>
                  <strong style="color:var(--pure-white); font-size:1rem; display:block;">Fast Turnarounds</strong>
                  <span style="font-size:0.85rem; color:rgba(255,255,255,0.65);">Qualified pipelines submitted within 48 hours of mandate listing.</span>
                </div>
              </div>
            </div>
            
            <button onclick="navigateTo('contact')" class="btn btn-accent" style="margin-top:1rem; justify-content:center; width:100%;">Initiate Executive Search</button>
          </div>
        </div>

        <h2 style="font-size:1.8rem; text-align:center; color:var(--midnight-blue); margin-bottom:0.5rem;">Recruitment Solutions Packages</h2>
        <p style="text-align:center; max-width:600px; margin:0 auto 2rem; color:var(--slate-text);">Varying structures depending on your operational expansion scales.</p>
        
        <div class="packages-grid">
          <div class="package-card">
            <div class="package-name">Contingent Search</div>
            <div class="package-price">12%<span> of annual salary</span></div>
            <ul class="package-features">
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Pay only on placement success</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Fully vetted candidate list</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> 90-day rebate protection</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> UAE labor law alignment support</li>
            </ul>
            <button onclick="navigateTo('contact')" class="btn btn-secondary" style="width:100%;">Select Package</button>
          </div>
          
          <div class="package-card popular">
            <span class="popular-badge">Recommended</span>
            <div class="package-name">Retained Executive</div>
            <div class="package-price">18%<span> of annual salary</span></div>
            <ul class="package-features">
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Exclusive account dedication</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Direct global mapping & outreach</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Comprehensive technical screening</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Extended 180-day rebate safety</li>
            </ul>
            <button onclick="navigateTo('contact')" class="btn btn-primary" style="width:100%;">Enquire Sourcing</button>
          </div>
          
          <div class="package-card">
            <div class="package-name">Workforce Contracting</div>
            <div class="package-price">Cost + 15%<span> margin</span></div>
            <ul class="package-features">
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Flex contract staff pipelines</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Monthly payroll management</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Compliant visa and medical insurance</li>
              <li><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg> Fast replacement guarantees</li>
            </ul>
            <button onclick="navigateTo('contact')" class="btn btn-secondary" style="width:100%;">Select Package</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

let ADMIN_SESSION_TOKEN = localStorage.getItem('admin_token') || null;

function handleHireTalentClick() {
  if (ADMIN_SESSION_TOKEN) {
    navigateToEmployerDashboard();
  } else {
    openAdminLoginModal();
  }
}

function openAdminLoginModal() {
  document.getElementById('admin-login-overlay').classList.add('open');
  document.getElementById('login-error-msg').style.display = 'none';
}

function closeAdminLoginModal() {
  document.getElementById('admin-login-overlay').classList.remove('open');
  document.getElementById('admin-username').value = '';
  document.getElementById('admin-password').value = '';
}

async function handleAdminLoginSubmit(event) {
  event.preventDefault();
  const user = document.getElementById('admin-username').value;
  const pass = document.getElementById('admin-password').value;
  const errorMsg = document.getElementById('login-error-msg');
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    const data = await res.json();
    if (data.success) {
      ADMIN_SESSION_TOKEN = data.token;
      localStorage.setItem('admin_token', data.token);
      showNotification("Admin authenticated successfully!");
      closeAdminLoginModal();
      navigateToEmployerDashboard();
    } else {
      errorMsg.textContent = data.error;
      errorMsg.style.display = 'block';
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Failed to connect to authentication server.";
    errorMsg.style.display = 'block';
  }
}

function logoutAdmin() {
  ADMIN_SESSION_TOKEN = null;
  localStorage.removeItem('admin_token');
  showNotification("Logged out successfully.");
  navigateTo('home');
}

async function handleEmployerJobPosting(event) {
  event.preventDefault();
  if (!ADMIN_SESSION_TOKEN) {
    showNotification("Error: You must be logged in as an administrator.");
    openAdminLoginModal();
    return;
  }
  
  const company = document.getElementById('post-company').value;
  const title = document.getElementById('post-title').value;
  const industry = document.getElementById('post-industry').value;
  const location = document.getElementById('post-location').value;
  const salary = document.getElementById('post-salary').value + ' AED';
  const reqs = document.getElementById('post-reqs').value;
  
  try {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_SESSION_TOKEN}`
      },
      body: JSON.stringify({
        title,
        company,
        location,
        salary,
        type: 'Full-time',
        industry,
        logo: '🏢',
        requirements: reqs
      })
    });
    const data = await res.json();
    if (data.success) {
      showNotification(`Success! ${title} has been listed on the main board.`);
      await fetchJobsFromServer();
      
      // Transition to Employer Dashboard
      setTimeout(() => {
        navigateToEmployerDashboard();
      }, 1000);
    } else {
      showNotification(`Posting failed: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    showNotification("Network error. Failed to save job.");
  }
}

// 5. CANDIDATES TEMPLATE WITH DASHBOARD INCLUSION
function getCandidatesTemplate() {
  const savedJobsCards = AppState.savedJobs.map(jobId => {
    const j = JOBS_DATABASE.find(x => x.id === jobId);
    if (!j) return '';
    return `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:var(--midnight-blue); font-size:1rem;">${j.title}</strong>
          <div style="font-size:0.8rem; color:var(--slate-text);">${j.company} • ${j.location}</div>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button onclick="openResumeUploadModal(${j.id})" class="btn btn-primary" style="padding:0.4rem 0.8rem; font-size:0.75rem;">Apply Now</button>
          <button onclick="toggleSaveJob(${j.id}); navigateTo('candidates');" class="btn btn-secondary" style="padding:0.4rem; border-radius:8px;">✕</button>
        </div>
      </div>
    `;
  }).join('');

  const appRows = AppState.submittedApplications.map(app => {
    const j = JOBS_DATABASE.find(x => x.id === app.jobId);
    if (!j) return '';
    
    let statusClass = 'job-type-full'; // Default blue badge
    if (app.status === 'Screening') statusClass = 'job-type-contract';
    if (app.status === 'Offered' || app.status === 'Placed') statusClass = 'job-type-remote';
    
    return `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:var(--midnight-blue); font-size:1.05rem;">${j.title}</strong>
          <div style="font-size:0.8rem; color:var(--slate-text);">${j.company} • Applied on ${app.date}</div>
        </div>
        <span class="job-type-badge ${statusClass}">${app.status}</span>
      </div>
    `;
  }).join('');

  return `
    <section class="inner-hero">
      <div class="dot-grid"></div>
      <div class="container" style="text-align:center;">
        <span class="section-tag" style="color:var(--electric-cyan);">CANDIDATE WORKSPACE</span>
        <h1>Unlock Global Placement Channels</h1>
        <p style="max-width:600px; margin:0 auto; color:rgba(255,255,255,0.8);">Optimize your profile, apply directly, and track interview progressions via your live pipeline dashboard.</p>
      </div>
    </section>

    <!-- Dashboard Portal -->
    <section class="section-padding">
      <div class="container">
        <div class="dashboard-container">
          <!-- Sidebar -->
          <div class="dashboard-sidebar">
            <h4 style="font-size:0.95rem; text-transform:uppercase; color:var(--slate-text); margin-bottom:1rem; padding-left:0.5rem; letter-spacing:0.05em;">CANDIDATE CONTROL</h4>
            <ul class="dash-menu-list">
              <li class="dash-menu-item active"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> Profile Summary</li>
              <li class="dash-menu-item" onclick="navigateTo('jobs')"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> Search New Jobs</li>
              <li class="dash-menu-item" onclick="openResumeUploadModal()"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> Upload New Resume</li>
            </ul>
          </div>
          
          <!-- Main Content -->
          <div class="dashboard-content-box">
            <div class="dash-stats-strip">
              <div class="dash-stat-card">
                <span class="dash-stat-val">${AppState.savedJobs.length}</span>
                <span class="dash-stat-lbl">Saved Vacancies</span>
              </div>
              <div class="dash-stat-card">
                <span class="dash-stat-val">${AppState.submittedApplications.length}</span>
                <span class="dash-stat-lbl">Applications</span>
              </div>
              <div class="dash-stat-card">
                <span class="dash-stat-val">Active</span>
                <span class="dash-stat-lbl">Pipeline Status</span>
              </div>
              <div class="dash-stat-card">
                <span class="dash-stat-val">100%</span>
                <span class="dash-stat-lbl">UAE Compliance</span>
              </div>
            </div>
            
            <div class="dashboard-main-panel">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--slate-border); padding-bottom:1rem; margin-bottom:1.5rem;">
                <div>
                  <h3 style="font-size:1.4rem; color:var(--midnight-blue);">${AppState.candidateProfile.fullName}</h3>
                  <span style="font-size:0.85rem; color:var(--slate-text);">${AppState.candidateProfile.email} | ${AppState.candidateProfile.phone}</span>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:0.8rem; background:rgba(16, 185, 129, 0.08); color:#059669; border:1px solid rgba(16, 185, 129, 0.15); padding:0.3rem 0.8rem; border-radius:100px; font-weight:700;">CV: ${AppState.candidateProfile.resumeName}</span>
                </div>
              </div>
              
              <div class="grid-2" style="gap:2rem;">
                <div>
                  <h4 style="font-size:1.15rem; color:var(--midnight-blue); margin-bottom:1rem; display:flex; align-items:center; gap:0.4rem;">
                    <svg style="width:20px;height:20px;color:var(--cosmic-purple);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    Submitted Applications
                  </h4>
                  <div style="display:flex; flex-direction:column; gap:0.8rem;">
                    ${appRows.length ? appRows : '<p style="font-size:0.9rem; color:var(--slate-text);">No active applications. Apply to a job on the jobs page.</p>'}
                  </div>
                </div>
                
                <div>
                  <h4 style="font-size:1.15rem; color:var(--midnight-blue); margin-bottom:1rem; display:flex; align-items:center; gap:0.4rem;">
                    <svg style="width:20px;height:20px;color:var(--electric-cyan);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    Saved Vacancies
                  </h4>
                  <div style="display:flex; flex-direction:column; gap:0.8rem;">
                    ${savedJobsCards.length ? savedJobsCards : '<p style="font-size:0.9rem; color:var(--slate-text);">Saved jobs will show up here. Go browse roles.</p>'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// 6. BLOG TEMPLATE
function getBlogTemplate() {
  const blogs = BLOGS_DATABASE.map(b => `
    <div class="blog-card">
      <div class="blog-image-box">
        <span class="blog-tag">${b.category}</span>
        <div style="font-size:3.5rem;">${b.icon}</div>
      </div>
      <div class="blog-content">
        <div class="blog-meta">${b.date} • ${b.readTime}</div>
        <h4 class="blog-title-text">${b.title}</h4>
        <p class="blog-excerpt">${b.excerpt}</p>
        <div style="margin-top:auto;">
          <a href="#" onclick="event.preventDefault(); showNotification('This full blog post is premium subscriber content.');" class="blog-readmore">Read Full Post ➔</a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="inner-hero">
      <div class="dot-grid"></div>
      <div class="container" style="text-align:center;">
        <span class="section-tag" style="color:var(--electric-cyan);">RECRUITMENT TRENDS</span>
        <h1>Career Advice & UAE Insights</h1>
        <p style="max-width:600px; margin:0 auto; color:rgba(255,255,255,0.8);">Stay updated with the latest regulatory mandates, Golden Visa provisions, and resume optimization tips.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="blog-filters">
          <button class="blog-filter-btn active" onclick="showNotification('Filters applied successfully')">All Articles</button>
          <button class="blog-filter-btn" onclick="showNotification('Category: UAE Job Market loaded')">UAE Job Market</button>
          <button class="blog-filter-btn" onclick="showNotification('Category: CV & Interview Tips loaded')">CV & Interview Tips</button>
          <button class="blog-filter-btn" onclick="showNotification('Category: Executive Trends loaded')">Recruitment Trends</button>
        </div>
        
        <div class="blog-grid">
          ${blogs}
        </div>
      </div>
    </section>
  `;
}

// 7. CONTACT TEMPLATE
function getContactTemplate() {
  return `
    <section class="inner-hero">
      <div class="dot-grid"></div>
      <div class="container" style="text-align:center;">
        <span class="section-tag" style="color:var(--electric-cyan);">GLOBAL OFFICES</span>
        <h1>Get in Touch with Galaxy</h1>
        <p style="max-width:600px; margin:0 auto; color:rgba(255,255,255,0.8);">Have open mandates or seeking recruitment representation in the GCC? Reach out today.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid-2">
          <!-- Information Card Column -->
          <div class="contact-info-cards">
            <h2 style="font-size:1.8rem; color:var(--midnight-blue); margin-bottom:1rem;">Office Information</h2>
            
            <div class="contact-info-card">
              <span class="contact-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></span>
              <div>
                <div class="contact-label">Dubai Office Location</div>
                <p>Level 14, Marina Plaza, Dubai Marina, Dubai, UAE</p>
              </div>
            </div>
            
            <div class="contact-info-card">
              <span class="contact-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></span>
              <div>
                <div class="contact-label">Call Inquiry</div>
                <p>+971 4 456 7890 (General Support)</p>
                <p>+971 50 999 8888 (WhatsApp Corporate Desk)</p>
              </div>
            </div>

            <div class="contact-info-card">
              <span class="contact-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></span>
              <div>
                <div class="contact-label">Email Support</div>
                <p>info@galaxyventures.com</p>
                <p>hiring@galaxyventures.com (Employers Only)</p>
              </div>
            </div>
            
            <div class="contact-info-card">
              <span class="contact-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
              <div>
                <div class="contact-label">Business Hours</div>
                <p>Monday - Friday: 9:00 AM - 6:00 PM (Gulf Standard Time)</p>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2 style="font-size:1.8rem; color:var(--midnight-blue); margin-bottom:0.5rem;">Send a Message</h2>
            <p style="font-size:0.9rem; color:var(--slate-text); margin-bottom:1.5rem;">Fill out the form below and a placement agent will contact you within 24 hours.</p>
            
            <form onsubmit="handleContactSubmission(event)">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="contact-name" class="form-control" placeholder="E.g., Hamdan Al-Neyadi" required>
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="contact-email" class="form-control" placeholder="hamdan@gmail.com" required>
              </div>
              <div class="form-group">
                <label>I am a...</label>
                <select id="contact-role" class="form-control" required>
                  <option value="Employer looking to hire">Employer looking to hire</option>
                  <option value="Candidate looking for a job">Candidate looking for a job</option>
                  <option value="Partner agency">Partner agency / Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Message Details</label>
                <textarea id="contact-message" class="form-control" placeholder="Briefly describe your requirements or job search goals..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Submit Inquiry</button>
            </form>
          </div>
        </div>
        
        <!-- Google Map Container -->
        <div class="map-wrapper">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!15s0x3e5f6b432e3a51f3:0xa293b6e82810f215!2sMarina+Plaza!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  `;
}

function handleContactSubmission(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name').value;
  showNotification(`Thank you ${name}! Your request has been queued.`);
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-message').value = '';
}

// --- PORTAL ROUTING: EMPLOYER DASHBOARD VIEW (ATS BOARD) ---
function navigateToEmployerDashboard() {
  AppState.currentPage = 'employer-dashboard';
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = getEmployerDashboardTemplate();
  mainContent.className = 'view-fade';
  
  // Highlight nothing in main nav
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  if (AppState.adminActiveTab === 'pipeline') {
    renderAtsCandidates();
  }
}

function switchAdminTab(tabName) {
  AppState.adminActiveTab = tabName;
  navigateToEmployerDashboard();
}

function getEmployerDashboardTemplate() {
  const isPipeline = AppState.adminActiveTab === 'pipeline';
  
  const mainPanelHTML = isPipeline ? `
    <h3 style="font-size:1.4rem; color:var(--midnight-blue); margin-bottom:0.5rem;">Applicant Tracking Pipeline (ATS)</h3>
    <p style="font-size:0.85rem; color:var(--slate-text); margin-bottom:1.5rem;">Drag candidates across stages or click the "Advance ➔" button to advance them in real time.</p>
    
    <div class="ats-board">
      <div class="ats-column">
        <div class="ats-col-header">Applied <span class="ats-col-count" id="count-applied">0</span></div>
        <div class="ats-cards-container" id="col-Applied"></div>
      </div>
      <div class="ats-column">
        <div class="ats-col-header">Screening <span class="ats-col-count" id="count-screening">0</span></div>
        <div class="ats-cards-container" id="col-Screening"></div>
      </div>
      <div class="ats-column">
        <div class="ats-col-header">Interview <span class="ats-col-count" id="count-interview">0</span></div>
        <div class="ats-cards-container" id="col-Interview"></div>
      </div>
      <div class="ats-column">
        <div class="ats-col-header">Placed <span class="ats-col-count" id="count-placed">0</span></div>
        <div class="ats-cards-container" id="col-Placed"></div>
      </div>
    </div>
  ` : `
    <h3 style="font-size:1.4rem; color:var(--midnight-blue); margin-bottom:0.5rem;">Post a New Active Mandate</h3>
    <p style="font-size:0.85rem; color:var(--slate-text); margin-bottom:1.5rem;">Fill out the parameters below to add a verified, high-converting vacancy to the main job board.</p>
    
    <form onsubmit="handleEmployerJobPosting(event)" style="max-width: 600px;">
      <div class="form-group">
        <label>Company Name</label>
        <input type="text" id="post-company" class="form-control" placeholder="E.g., Dubai Holdings" required>
      </div>
      <div class="grid-2" style="gap:0.8rem; margin-bottom:0.8rem;">
        <div class="form-group" style="margin-bottom:0;">
          <label>Job Title</label>
          <input type="text" id="post-title" class="form-control" placeholder="E.g., Senior DevOps Coordinator" required>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Industry</label>
          <select id="post-industry" class="form-control" required>
            <option value="IT & Technology">IT & Tech</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Construction">Construction</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Oil & Gas">Oil & Gas</option>
            <option value="Logistics">Logistics</option>
            <option value="Retail">Retail</option>
          </select>
        </div>
      </div>
      <div class="grid-2" style="gap:0.8rem; margin-bottom:0.8rem;">
        <div class="form-group" style="margin-bottom:0;">
          <label>Location</label>
          <input type="text" id="post-location" class="form-control" placeholder="Dubai / Abu Dhabi" required>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Salary (AED/mo)</label>
          <input type="text" id="post-salary" class="form-control" placeholder="E.g., 20,000 - 25,000" required>
        </div>
      </div>
      <div class="form-group">
        <label>Requirements</label>
        <textarea id="post-reqs" class="form-control" placeholder="List key languages, licenses, or experience caps..." required></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Post Listing to Database</button>
    </form>
  `;

  return `
    <section class="dashboard-view">
      <div class="container">
        <div class="dashboard-container">
          <!-- Sidebar -->
          <div class="dashboard-sidebar">
            <h4 style="font-size:0.95rem; text-transform:uppercase; color:var(--slate-text); margin-bottom:1rem; padding-left:0.5rem; letter-spacing:0.05em;">Admin Control</h4>
            <ul class="dash-menu-list">
              <li class="dash-menu-item ${isPipeline ? 'active' : ''}" onclick="switchAdminTab('pipeline')"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2"></path></svg> Candidate pipeline</li>
              <li class="dash-menu-item ${!isPipeline ? 'active' : ''}" onclick="switchAdminTab('post-job')"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Post New Job</li>
              <li class="dash-menu-item dash-menu-logout" onclick="logoutAdmin()"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Logout</li>
            </ul>
          </div>
          
          <!-- Content Box -->
          <div class="dashboard-content-box">
            <div class="dash-stats-strip">
              <div class="dash-stat-card">
                <span class="dash-stat-val">${AppState.atsCandidates.length}</span>
                <span class="dash-stat-lbl">Active Candidates</span>
              </div>
              <div class="dash-stat-card">
                <span class="dash-stat-val">${AppState.atsCandidates.filter(c => c.stage === 'Applied').length}</span>
                <span class="dash-stat-lbl">New Submissions</span>
              </div>
              <div class="dash-stat-card">
                <span class="dash-stat-val">${AppState.atsCandidates.filter(c => c.stage === 'Interview').length}</span>
                <span class="dash-stat-lbl">Interviews Scheduled</span>
              </div>
              <div class="dash-stat-card">
                <span class="dash-stat-val">${AppState.atsCandidates.filter(c => c.stage === 'Placed').length}</span>
                <span class="dash-stat-lbl">Placements Placed</span>
              </div>
            </div>
            
            <div class="dashboard-main-panel">
              ${mainPanelHTML}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAtsCandidates() {
  const columns = {
    Applied: document.getElementById('col-Applied'),
    Screening: document.getElementById('col-Screening'),
    Interview: document.getElementById('col-Interview'),
    Placed: document.getElementById('col-Placed')
  };
  
  if (!columns.Applied) return;
  
  // Clear lists
  Object.keys(columns).forEach(key => {
    if (columns[key]) columns[key].innerHTML = '';
  });
  
  // Set count indicators
  document.getElementById('count-applied').textContent = AppState.atsCandidates.filter(c => c.stage === 'Applied').length;
  document.getElementById('count-screening').textContent = AppState.atsCandidates.filter(c => c.stage === 'Screening').length;
  document.getElementById('count-interview').textContent = AppState.atsCandidates.filter(c => c.stage === 'Interview').length;
  document.getElementById('count-placed').textContent = AppState.atsCandidates.filter(c => c.stage === 'Placed').length;
  
  // Render Cards
  AppState.atsCandidates.forEach(cand => {
    const col = columns[cand.stage];
    if (!col) return;
    
    const card = document.createElement('div');
    card.className = 'ats-candidate-card';
    card.setAttribute('draggable', 'true');
    card.dataset.id = cand.id;
    
    // Drag handling
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', cand.id);
    });
    
    let btnHTML = '';
    if (cand.stage !== 'Placed') {
      btnHTML = `<button class="ats-cand-advance" onclick="advanceCandidate(${cand.id})">Advance ➔</button>`;
    }
    
    card.innerHTML = `
      <div class="ats-cand-name">${cand.name}</div>
      <div class="ats-cand-role">${cand.role}</div>
      <div class="ats-cand-meta">
        <span>${cand.date}</span>
        ${btnHTML}
      </div>
    `;
    col.appendChild(card);
  });
  
  // Setup drop containers
  Object.keys(columns).forEach(stage => {
    const col = columns[stage];
    col.addEventListener('dragover', (e) => e.preventDefault());
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = parseInt(e.dataTransfer.getData('text/plain'));
      moveCandidateToStage(id, stage);
    });
  });
}

function advanceCandidate(candId) {
  const stages = ['Applied', 'Screening', 'Interview', 'Placed'];
  const cand = AppState.atsCandidates.find(c => c.id === candId);
  if (!cand) return;
  
  const currentIdx = stages.indexOf(cand.stage);
  if (currentIdx > -1 && currentIdx < stages.length - 1) {
    const nextStage = stages[currentIdx + 1];
    cand.stage = nextStage;
    
    // Notify candidate if it matches applicant logged in
    if (cand.name === AppState.candidateProfile.fullName) {
      const matchApp = AppState.submittedApplications.find(a => a.status === stages[currentIdx]);
      if (matchApp) matchApp.status = nextStage;
    }
    
    showNotification(`Candidate ${cand.name} advanced to ${nextStage}!`);
    renderAtsCandidates();
  }
}

function moveCandidateToStage(candId, stage) {
  const cand = AppState.atsCandidates.find(c => c.id === candId);
  if (cand) {
    cand.stage = stage;
    showNotification(`Candidate ${cand.name} moved to ${stage}`);
    renderAtsCandidates();
  }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Render default jobs immediately to avoid blank screen
  renderActiveView();
  
  // Try fetching fresh data from backend
  fetchJobsFromServer();
  
  // Listen header scroll class
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Navigation Menu Clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const page = e.target.dataset.page;
      navigateTo(page);
    });
  });
  
  // AI assistant input listener
  const aiInput = document.getElementById('ai-chat-input');
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendAIMessage();
    });
  }
  
  // Live Chat input listener
  const chatInput = document.getElementById('live-chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendLiveChatMessage();
    });
  }
  
  // Drag and Drop files hook
  const dropZone = document.getElementById('upload-drag-area');
  const fileInput = document.getElementById('resume-file-input');
  
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
      handleResumeFileSelect(e.target.files[0]);
    });
    
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      handleResumeFileSelect(e.dataTransfer.files[0]);
    });
  }
});

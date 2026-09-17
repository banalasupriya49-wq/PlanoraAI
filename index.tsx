import React, { useState, useEffect, useMemo, useRef } from 'react';

const TRANSLATIONS = {
  en: {
    appName: "Planora",
    tagline: "From Confusion to Clarity",
    subTagline: "Plan Smart • Be Ready • Grow",
    getStarted: "Get Started →",
    navHome: "Home",
    navExplore: "Explore",
    navChat: "Chat",
    navProgress: "Progress",
    navProfile: "Profile",
    welcomeTitle: "Not sure what you want to do?",
    welcomeSubtitle: "You're not alone. Planora helps you find the right path based on your interests, goals and current situation.",
    next: "Next",
    skip: "Skip",
    savePlan: "Save Plan",
    logout: "Logout",
    askPlanora: "Ask Planora",
    searchPlaceholder: "Search courses, careers, skills, mentors...",
    matchedGoal: "Matched to your career goal",
    overallProgress: "Overall Progress",
    skillsProgress: "Skills Progress",
    roadmapCompletion: "Roadmap Completion",
    requestGuidance: "Request Guidance",
    watchVideo: "Watch Video",
    addToPlan: "Add to My Plan",
    confirmLogoutMsg: "Are you sure you want to log out of Planora?",
    logoutSuccess: "You have been logged out successfully.",
  },
  te: {
    appName: "ప్లానోరా",
    tagline: "అయోమయం నుండి స్పష్టత వైపు",
    subTagline: "తెలివిగా ప్రణాళిక వేసుకోండి • సిద్ధంగా ఉండండి • ఎదగండి",
    getStarted: "ప్రారంభించండి →",
    navHome: "హోమ్",
    navExplore: "అన్వేషించండి",
    navChat: "చాట్",
    navProgress: "పురోగతి",
    navProfile: "ప్రొఫైల్",
    welcomeTitle: "మీరేం చేయాలో అర్థం కావడం లేదా?",
    welcomeSubtitle: "మీరు ఒక్కరే కాదు. ప్లానోరా మీ ఆసక్తులు, లక్ష్యాలు మరియు ప్రస్తుత పరిస్థితి ఆధారంగా సరైన మార్గాన్ని సూచిస్తుంది.",
    next: "తరువాత",
    skip: "స్కిప్ చేయండి",
    savePlan: "ప్లాన్ సేవ్ చేయండి",
    logout: "లాగ్ అవుట్",
    askPlanora: "ప్లానోరాని అడగండి",
    searchPlaceholder: "కోర్సులు, కెరీర్‌లు, నైపుణ్యాల కోసం వెతకండి...",
    matchedGoal: "మీ కెరీర్ లక్ష్యానికి తగినది",
    overallProgress: "మొత్తం పురోగతి",
    skillsProgress: "నైపుణ్యాల పురోగతి",
    roadmapCompletion: "రోడ్‌మ్యాప్ పూర్తి శాతం",
    requestGuidance: "సలహా కోరండి",
    watchVideo: "వీడియో చూడండి",
    addToPlan: "నా ప్లాన్‌లో చేర్చు",
    confirmLogoutMsg: "మీరు ఖచ్చితంగా ప్లానోరా నుండి లాగ్ అవుట్ అవ్వాలనుకుంటున్నారా?",
    logoutSuccess: "మీరు విజయవంతంగా లాగ్ అవుట్ అయ్యారు.",
  },
  hi: {
    appName: "प्लानोरा",
    tagline: "संदेह से स्पष्टता तक",
    subTagline: "स्मार्ट योजना बनाएं • तैयार रहें • आगे बढ़ें",
    getStarted: "शुरू करें →",
    navHome: "होम",
    navExplore: "एक्सप्लोर",
    navChat: "चैट",
    navProgress: "प्रगति",
    navProfile: "प्रोफ़ाइल",
    welcomeTitle: "समझ नहीं आ रहा क्या करना है?",
    welcomeSubtitle: "आप अकेले नहीं हैं। प्लानोरा आपकी रुचियों, लक्ष्यों और वर्तमान स्थिति के आधार पर सही रास्ता चुनने में मदद करता है।",
    next: "आगे बढ़ें",
    skip: "छोड़ें",
    savePlan: "योजना सहेजें",
    logout: "लॉग आउट",
    askPlanora: "प्लानोरा से पूछें",
    searchPlaceholder: "कोर्स, करियर, कौशल खोजें...",
    matchedGoal: "आपके करियर लक्ष्य से मेल खाता है",
    overallProgress: "कुल प्रगति",
    skillsProgress: "कौशल प्रगति",
    roadmapCompletion: "रोडमैप पूर्णता",
    requestGuidance: "मार्गदर्शन का अनुरोध करें",
    watchVideo: "वीडियो देखें",
    addToPlan: "मेरी योजना में जोड़ें",
    confirmLogoutMsg: "क्या आप निश्चित रूप से प्लानोरा से लॉग आउट करना चाहते हैं?",
    logoutSuccess: "आप सफलतापूर्वक लॉग आउट हो गए हैं।",
  },
  ur: {
    appName: "پلانورا",
    tagline: "الجھن سے وضاحت تک",
    subTagline: "سمارٹ منصوبہ بنائیں • تیار رہیں • آگے بڑھیں",
    getStarted: "شروع کریں ←",
    navHome: "ہوم",
    navExplore: "تلاش کریں",
    navChat: "چیٹ",
    navProgress: "پیش رفت",
    navProfile: "پروفائل",
    welcomeTitle: "سمجھ نہیں آ رہا کیا کریں؟",
    welcomeSubtitle: "آپ اکیلے نہیں ہیں۔ پلانورا آپ کی دلچسپیوں اور مقاصد کی بنیاد پر صحیح راستہ دکھاتا ہے۔",
    next: "آگے",
    skip: "چھوڑیں",
    savePlan: "منصوبہ محفوظ کریں",
    logout: "لاگ آؤٹ",
    askPlanora: "پلانورا سے پوچھیں",
    searchPlaceholder: "کورسز، کیریئر، مہارتیں تلاش کریں...",
    matchedGoal: "آپ کے کیریئر کے ہدف کے مطابق",
    overallProgress: "مجموعی پیش رفت",
    skillsProgress: "مہارتوں کی پیش رفت",
    roadmapCompletion: "روڈ میپ کی تکمیل",
    requestGuidance: "رہنمائی کی درخواست کریں",
    watchVideo: "ویڈیو دیکھیں",
    addToPlan: "میرے پلان میں شامل کریں",
    confirmLogoutMsg: "کیا آپ واقعی پلانورا سے لاگ آؤٹ ہونا چاہتے ہیں؟",
    logoutSuccess: "آپ کامیابی کے ساتھ لاگ آؤٹ ہو چکے ہیں۔",
  }
};

const Icon = ({ name, className = "w-5 h-5", color }) => {
  const props = { className, style: color ? { color } : undefined, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case 'compass': return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
    case 'home': return <svg {...props} viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'chat': return <svg {...props} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case 'progress': return <svg {...props} viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case 'user': return <svg {...props} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case 'book': return <svg {...props} viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
    case 'briefcase': return <svg {...props} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
    case 'target': return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'map-pin': return <svg {...props} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'award': return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
    case 'video': return <svg {...props} viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
    case 'users': return <svg {...props} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-3-3.87"/><path d="M9 21v-2a4 4 0 0 1 3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'check-circle': return <svg {...props} viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
    case 'search': return <svg {...props} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    case 'chevron-right': return <svg {...props} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>;
    case 'arrow-right': return <svg {...props} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
    case 'star': return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case 'log-out': return <svg {...props} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
    case 'sparkles': return <svg {...props} viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>;
    case 'send': return <svg {...props} viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
    case 'globe': return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'bell': return <svg {...props} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
    case 'play': return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
    case 'filter': return <svg {...props} viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
    default: return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
  }
};

const CAREER_DATABASE = [
  {
    id: "software-dev",
    title: "Software Developer",
    category: "Software Development",
    matchScore: 94,
    description: "Design, build, and maintain modern scalable web & software applications.",
    whyMatch: "Matches your programming interests, problem solving aptitude and web development experience.",
    requiredSkills: ["Programming", "Web Development", "Database", "Problem Solving", "Git/GitHub", "APIs"],
    prereqs: ["Programming"],
    recommendedCourses: [
      { id: "c1", title: "Modern Full Stack Web Architecture", level: "Intermediate", duration: "6 Weeks", platform: "Planora Academy", category: "Software Development" },
      { id: "c2", title: "Data Structures & Algorithmic Thinking", level: "Beginner", duration: "8 Weeks", platform: "Planora Prep", category: "Programming" },
      { id: "c3", title: "REST APIs & Backend Microservices", level: "Intermediate", duration: "4 Weeks", platform: "Planora Cloud", category: "Web Development" }
    ],
    projects: ["Task Management Dashboard", "E-Commerce Microservice", "Real-Time Collaborative Code Editor"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data Analytics",
    matchScore: 88,
    description: "Transform raw structured and unstructured data into meaningful actionable business insights.",
    whyMatch: "Matches your analytical curiosity, data analysis preferences, and structured reasoning.",
    requiredSkills: ["Data Analysis", "Database", "Problem Solving", "Python", "SQL", "Statistics", "Power BI"],
    prereqs: ["Data Analysis"],
    recommendedCourses: [
      { id: "c4", title: "Mastering SQL for Business Analytics", level: "Beginner", duration: "4 Weeks", platform: "Planora Analytics", category: "Data Analytics" },
      { id: "c5", title: "Python for Data Wrangling & Pandas", level: "Intermediate", duration: "5 Weeks", platform: "Planora Labs", category: "Data Analytics" },
      { id: "c6", title: "Interactive BI Dashboarding with Power BI", level: "Beginner", duration: "3 Weeks", platform: "Planora Design", category: "Data Analytics" }
    ],
    projects: ["Customer Churn Prediction Model", "Interactive Retail Sales Analytics", "Financial Trend Forecasting Dashboard"]
  },
  {
    id: "ai-engineer",
    title: "AI / Machine Learning Engineer",
    category: "Artificial Intelligence",
    matchScore: 85,
    description: "Develop, train and deploy intelligent artificial intelligence algorithms and deep learning models.",
    whyMatch: "Matches your high interest in AI, predictive algorithms, and core programming skills.",
    requiredSkills: ["AI / Machine Learning", "Programming", "Data Analysis", "Python", "Mathematics", "Deep Learning"],
    prereqs: ["Programming", "AI / Machine Learning"],
    recommendedCourses: [
      { id: "c7", title: "Applied Machine Learning Foundations", level: "Intermediate", duration: "8 Weeks", platform: "Planora AI Lab", category: "Artificial Intelligence" },
      { id: "c8", title: "Prompt Engineering & LLM Integrations", level: "Advanced", duration: "4 Weeks", platform: "Planora AI", category: "Artificial Intelligence" },
      { id: "c9", title: "Deep Neural Networks with PyTorch", level: "Advanced", duration: "6 Weeks", platform: "Planora DeepLab", category: "Artificial Intelligence" }
    ],
    projects: ["AI Resume Keyword Matcher", "Autonomous Vision Classifier", "RAG Document Assistant"]
  },
  {
    id: "uiux-designer",
    title: "UI/UX Product Designer",
    category: "Design",
    matchScore: 82,
    description: "Craft intuitive user experiences, wireframes, visually compelling modern web interfaces and design systems.",
    whyMatch: "Matches your visual design sensibilities, empathy, and product-building passion.",
    requiredSkills: ["Design", "Communication", "Problem Solving", "Figma", "User Research", "Prototyping"],
    prereqs: ["Design"],
    recommendedCourses: [
      { id: "c10", title: "Figma UI/UX Masterclass", level: "Beginner", duration: "4 Weeks", platform: "Planora Studio", category: "Design" },
      { id: "c11", title: "Design Systems & Accessibility", level: "Intermediate", duration: "3 Weeks", platform: "Planora UX", category: "Design" }
    ],
    projects: ["Redesigning Student Portal App", "Design System for EdTech Platform"]
  }
];

const MENTOR_DATABASE = [
  {
    id: "m1",
    name: "Rajesh Kumar",
    title: "Senior Data Scientist",
    company: "Tech Analytics Corp",
    experience: "7+ Years",
    industry: "Data Analytics",
    category: "Data Analytics",
    languages: ["English", "Telugu", "Hindi"],
    skills: ["Python", "SQL", "Machine Learning", "Data Visualization"],
    rating: 4.9,
    bio: "Passionate about helping computer science students break into Data Analytics & Machine Learning.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m2",
    name: "Priya Sharma",
    title: "Lead Full-Stack Developer",
    company: "CloudScale Systems",
    experience: "6 Years",
    industry: "Software Development",
    category: "Software Development",
    languages: ["English", "Hindi"],
    skills: ["React", "Node.js", "System Design", "Cloud Architecture"],
    rating: 5.0,
    bio: "Guided over 200+ engineering graduates into high-growth software engineering roles.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m3",
    name: "Srinivas Rao",
    title: "AI Engineer & Researcher",
    company: "Innovate AI Labs",
    experience: "5 Years",
    industry: "Artificial Intelligence",
    category: "Artificial Intelligence",
    languages: ["Telugu", "English"],
    skills: ["PyTorch", "NLP", "LLMs", "Computer Vision"],
    rating: 4.8,
    bio: "Specializes in mentoring beginners transitioning from simple coding to advanced AI projects.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m4",
    name: "Ayesha Khan",
    title: "Product Designer & UI Specialist",
    company: "Designify",
    experience: "4 Years",
    industry: "UI/UX Design",
    category: "Design",
    languages: ["English", "Urdu", "Hindi"],
    skills: ["Figma", "User Research", "Wireframing", "Interaction Design"],
    rating: 4.9,
    bio: "Helping students turn creative ideas into recruiter-approved design portfolios.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m5",
    name: "Vikram Reddy",
    title: "Principal Cloud & DevOps Architect",
    company: "Nexus Cloud Solutions",
    experience: "9+ Years",
    industry: "Cloud & DevOps",
    category: "Software Development",
    languages: ["English", "Telugu"],
    skills: ["AWS", "Kubernetes", "Docker", "CI/CD Pipelines", "Terraform"],
    rating: 4.9,
    bio: "Helping students master cloud deployment, infrastructure automation, and enterprise DevOps pipelines.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m6",
    name: "Dr. Ananya Chatterjee",
    title: "Senior AI Researcher",
    company: "Cognitive AI Systems",
    experience: "8 Years",
    industry: "Artificial Intelligence",
    category: "Artificial Intelligence",
    languages: ["English", "Bengali", "Hindi"],
    skills: ["Deep Learning", "Generative AI", "TensorFlow", "Research Writing"],
    rating: 5.0,
    bio: "Mentors aspiring researchers and engineers looking to publish papers or build frontier AI tools.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m7",
    name: "Karthik Varma",
    title: "Staff Backend Engineer",
    company: "FinTech Global",
    experience: "7 Years",
    industry: "Software Development",
    category: "Software Development",
    languages: ["English", "Telugu", "Hindi"],
    skills: ["Go", "Java", "Microservices", "Distributed Systems", "PostgreSQL"],
    rating: 4.8,
    bio: "Ex-MNC tech lead guiding students on system architecture, database optimization, and high-concurrency coding.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m8",
    name: "Kavita Verma",
    title: "Cybersecurity Specialist",
    company: "SecureNet Defense",
    experience: "6+ Years",
    industry: "Cybersecurity",
    category: "Cybersecurity",
    languages: ["English", "Hindi"],
    skills: ["Ethical Hacking", "Network Security", "Penetration Testing", "SOC Analyst"],
    rating: 4.9,
    bio: "Passionate about training students in ethical hacking, threat hunting, and securing cloud infrastructure.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m9",
    name: "Meera Iyer",
    title: "Business Intelligence Lead",
    company: "DataMetrics Labs",
    experience: "5 Years",
    industry: "Data Analytics",
    category: "Data Analytics",
    languages: ["English", "Tamil", "Hindi"],
    skills: ["Tableau", "Power BI", "SQL", "Business Analytics", "Data Storytelling"],
    rating: 4.8,
    bio: "Specializes in helping non-tech or beginner students present data effectively and win corporate analytics roles.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m10",
    name: "Rohan Gupta",
    title: "Senior Frontend Lead",
    company: "Pixel Craft Studios",
    experience: "6 Years",
    industry: "Software Development",
    category: "Software Development",
    languages: ["English", "Hindi"],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Web Performance"],
    rating: 4.9,
    bio: "Loves conducting mock technical interviews and refining frontend developer portfolios to impress recruiters.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  }
];

const VIDEO_DATABASE = [
  {
    id: "v1",
    title: "Complete SQL Crash Course for Beginners 2026",
    category: "Data Analytics",
    skillFocus: "Database",
    difficulty: "Beginner",
    duration: "42 min",
    language: "Telugu",
    url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    description: "Learn SELECT queries, JOINs, Grouping, and aggregate functions step-by-step."
  },
  {
    id: "v2",
    title: "Full Stack Web Development Roadmap & Core Basics",
    category: "Software Development",
    skillFocus: "Web Development",
    difficulty: "Beginner",
    duration: "35 min",
    language: "English",
    url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
    description: "Understand HTML5, CSS3, Modern JavaScript, APIs and how frontend connects to backend."
  },
  {
    id: "v3",
    title: "Python for Data Analysis - Pandas & NumPy Quickstart",
    category: "Data Analytics",
    skillFocus: "Data Analysis",
    difficulty: "Intermediate",
    duration: "50 min",
    language: "Hindi",
    url: "https://www.youtube.com/watch?v=r-uOLxNrNk8",
    description: "Hands-on data cleaning, filtering, and numerical processing with Python."
  },
  {
    id: "v4",
    title: "Machine Learning Concepts Explained Simply",
    category: "Artificial Intelligence",
    skillFocus: "AI / Machine Learning",
    difficulty: "Intermediate",
    duration: "48 min",
    language: "English",
    url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
    description: "Supervised vs Unsupervised learning, evaluation metrics, and practical python implementation."
  }
];

export default function App() {
  // Load state from local storage or defaults
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('planora_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const savedUser = localStorage.getItem('planora_user');
    return savedUser ? 'dashboard' : 'splash';
  });

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('planora_lang') || 'en';
  });

  // Student profile & selection state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('planora_profile');
    return saved ? JSON.parse(saved) : {
      name: "Sandeep Varma",
      email: "sandeep@example.com",
      degree: "B.Tech",
      year: "3rd Year",
      branch: "CSE",
      techSkills: ["Programming", "Web Development"],
      softSkills: ["Problem Solving", "Teamwork"],
      interests: ["Software Development", "Artificial Intelligence"],
      skillLevel: "Intermediate",
      goals: ["Get a job", "Build projects"],
      selectedCareerId: "software-dev",
      roadmapTasks: {
        "m1-1": true,
        "m1-2": true,
        "m2-1": false,
        "m2-2": false,
        "m3-1": false,
        "m4-1": false,
        "m5-1": false,
        "m6-1": false
      },
      savedCourses: ["c1"],
      requestedMentors: []
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('planora_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('planora_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('planora_lang', selectedLanguage);
  }, [selectedLanguage]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const currentLang = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;

  // Selected Career calculation
  const selectedCareer = useMemo(() => {
    return CAREER_DATABASE.find(c => c.id === profile.selectedCareerId) || CAREER_DATABASE[0];
  }, [profile.selectedCareerId]);

  // Overall progress calculation
  const progressStats = useMemo(() => {
    const tasks = profile.roadmapTasks || {};
    const keys = Object.keys(tasks);
    const completedTasks = keys.filter(k => tasks[k]).length;
    const roadmapPercent = keys.length ? Math.round((completedTasks / keys.length) * 100) : 0;
    
    const skillCount = (profile.techSkills?.length || 0) + (profile.softSkills?.length || 0);
    const skillPercent = Math.min(100, Math.round((skillCount / 12) * 100));

    const overall = Math.round((roadmapPercent * 0.6) + (skillPercent * 0.4));
    return { overall, roadmapPercent, skillPercent, completedTasks, totalTasks: keys.length };
  }, [profile]);

  const handleLogout = () => {
    setUser(null);
    setLogoutModalOpen(false);
    setCurrentPage('login');
    showToast(currentLang.logoutSuccess);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-purple-200 selection:text-purple-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce border border-purple-500/30">
          <Icon name="sparkles" className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100 transform transition-all">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
              <Icon name="log-out" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{currentLang.logout}</h3>
            <p className="text-slate-600 mt-2 text-sm">{currentLang.confirmLogoutMsg}</p>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 shadow-md shadow-red-200 transition"
              >
                {currentLang.logout}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Header (For logged in views) */}
      {user && currentPage !== 'splash' && currentPage !== 'login' && (
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Icon name="compass" className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                {currentLang.appName}
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 font-medium ml-2 border-l border-slate-200 pl-2">
                {currentLang.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-100 rounded-lg p-1 text-xs font-semibold">
              <Icon name="globe" className="w-3.5 h-3.5 ml-1.5 text-slate-500 mr-1" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-slate-700 pr-2 py-0.5 focus:outline-none cursor-pointer"
              >
                <option value="en">EN</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिंदी</option>
                <option value="ur">اردو</option>
              </select>
            </div>

            {/* Profile Avatar & Quick Action */}
            <button
              onClick={() => setCurrentPage('profile')}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition"
            >
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center border border-purple-300">
                {profile.name ? profile.name.charAt(0) : 'S'}
              </div>
            </button>
          </div>
        </header>
      )}

      {/* Dynamic Content View Router */}
      <main className="flex-1">
        {currentPage === 'splash' && <SplashScreen onGetStarted={() => setCurrentPage(user ? 'dashboard' : 'login')} lang={currentLang} />}
        {currentPage === 'login' && <AuthScreen onLogin={(userData) => { setUser(userData); setCurrentPage('welcome'); }} lang={currentLang} />}
        {currentPage === 'welcome' && <WelcomeScreen onNext={() => setCurrentPage('guidance')} lang={currentLang} />}
        {currentPage === 'guidance' && <GuidanceScreen onNext={() => setCurrentPage('plan-future')} onSkip={() => setCurrentPage('dashboard')} lang={currentLang} />}
        {currentPage === 'plan-future' && <PlanFutureScreen onStart={() => setCurrentPage('dashboard')} lang={currentLang} />}
        {currentPage === 'dashboard' && <DashboardScreen profile={profile} setCurrentPage={setCurrentPage} searchQuery={searchQuery} setSearchQuery={setSearchQuery} lang={currentLang} />}
        {currentPage === 'interests-goals' && <InterestsSkillsScreen profile={profile} setProfile={setProfile} onNext={() => setCurrentPage('personalized-plan')} lang={currentLang} />}
        {currentPage === 'personalized-plan' && <PersonalizedPlanScreen profile={profile} setProfile={setProfile} setCurrentPage={setCurrentPage} lang={currentLang} />}
        {currentPage === 'career-details' && <CareerDetailsScreen career={selectedCareer} profile={profile} setCurrentPage={setCurrentPage} showToast={showToast} lang={currentLang} />}
        {currentPage === 'roadmap' && <RoadmapScreen profile={profile} setProfile={setProfile} showToast={showToast} lang={currentLang} />}
        {currentPage === 'explore' && <ExploreScreen profile={profile} setProfile={setProfile} setCurrentPage={setCurrentPage} showToast={showToast} lang={currentLang} />}
        {currentPage === 'progress' && <ProgressScreen profile={profile} stats={progressStats} lang={currentLang} />}
        {currentPage === 'chat' && <AIChatScreen profile={profile} setProfile={setProfile} lang={selectedLanguage} />}
        {currentPage === 'profile' && <ProfileScreen profile={profile} setProfile={setProfile} onLogoutClick={() => setLogoutModalOpen(true)} setCurrentPage={setCurrentPage} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} lang={currentLang} />}
      </main>

      {/* Main Bottom Navigation (Responsive Desktop Bar & Mobile Fixed Nav) */}
      {user && currentPage !== 'splash' && currentPage !== 'login' && (
        <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-around items-center max-w-lg mx-auto sm:max-w-none w-full sm:px-12 shadow-lg">
          <NavItem id="dashboard" icon="home" label={currentLang.navHome} active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
          <NavItem id="explore" icon="compass" label={currentLang.navExplore} active={currentPage === 'explore'} onClick={() => setCurrentPage('explore')} />
          <NavItem id="chat" icon="chat" label={currentLang.navChat} active={currentPage === 'chat'} onClick={() => setCurrentPage('chat')} />
          <NavItem id="progress" icon="progress" label={currentLang.navProgress} active={currentPage === 'progress'} onClick={() => setCurrentPage('progress')} />
          <NavItem id="profile" icon="user" label={currentLang.navProfile} active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
        </nav>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
        active ? 'text-purple-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800 font-medium'
      }`}
    >
      <Icon name={icon} className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
      <span className="text-[11px] mt-1">{label}</span>
    </button>
  );
}

/* ====================================================================
   PAGE 1 — SPLASH SCREEN
   ==================================================================== */
function SplashScreen({ onGetStarted, lang }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center space-x-3 z-10 pt-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-purple-500/40">
          <Icon name="compass" className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-black tracking-wide bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
          {lang.appName}
        </span>
      </div>

      <div className="my-auto py-12 flex flex-col items-center text-center max-w-2xl mx-auto z-10">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-purple-200 border border-white/10 mb-6">
          <Icon name="sparkles" className="w-4 h-4 text-purple-400" />
          <span>{lang.subTagline}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          Your Future, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">Planned.</span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-purple-200/90 font-light">
          "{lang.tagline}"
        </p>

        {/* Dynamic Graphic */}
        <div className="my-10 relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border border-white/10 flex flex-col items-center justify-center p-8 shadow-2xl">
          <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 animate-pulse">
            <Icon name="target" className="w-12 h-12 text-purple-300" />
          </div>
          <div className="space-y-2 text-center">
            <div className="h-2.5 w-32 bg-purple-400/40 rounded-full mx-auto" />
            <div className="h-2 w-48 bg-indigo-400/30 rounded-full mx-auto" />
          </div>
          <div className="mt-6 flex space-x-3">
            <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-xs font-medium text-purple-200 border border-purple-400/30">Skills</span>
            <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-xs font-medium text-blue-200 border border-blue-400/30">Career</span>
            <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-xs font-medium text-indigo-200 border border-indigo-400/30">Roadmap</span>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 text-white font-bold text-lg shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <span>{lang.getStarted}</span>
        </button>
      </div>

      <div className="text-center text-xs text-slate-400 z-10 pb-2">
        Powered by AI & Contextual Student Career Guidance Engine
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 2 — LOGIN / SIGN UP
   ==================================================================== */
function AuthScreen({ onLogin, lang }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState("Sandeep Varma");
  const [email, setEmail] = useState("sandeep@example.com");
  const [password, setPassword] = useState("password123");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: fullName || "Student", email });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full p-6 sm:p-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-purple-500/30 mb-4">
            <Icon name="compass" className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Let's build your future together</p>
        </div>

        {/* Google Mock Btn */}
        <button
          onClick={() => onLogin({ name: "Demo Student", email: "demo@planora.ai" })}
          className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center space-x-3 hover:bg-slate-50 transition mb-5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium uppercase">Or email</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
              placeholder="student@university.edu"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-500/30 hover:opacity-95 transition"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold text-purple-600 hover:underline"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 3 — WELCOME / MAIN OPTIONS
   ==================================================================== */
function WelcomeScreen({ onNext, lang }) {
  const [selectedTopic, setSelectedTopic] = useState('Career?');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6 max-w-xl mx-auto py-12">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
          <Icon name="sparkles" className="w-6 h-6" />
        </div>

        <h2 className="text-3xl font-black text-slate-900">{lang.welcomeTitle}</h2>
        <p className="text-slate-600 mt-2 text-base leading-relaxed">{lang.welcomeSubtitle}</p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {['Career?', 'College?', 'Skills?', 'Future?'].map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`p-5 rounded-2xl border-2 text-left font-bold text-lg transition flex flex-col justify-between h-32 ${
                selectedTopic === topic
                  ? 'border-purple-600 bg-purple-50/50 text-purple-900 shadow-md'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="text-2xl">
                {topic === 'Career?' ? '💼' : topic === 'College?' ? '🎓' : topic === 'Skills?' ? '⚡' : '🚀'}
              </span>
              <span>{topic}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold text-base shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition flex items-center justify-center space-x-2"
        >
          <span>{lang.next}</span>
          <Icon name="arrow-right" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 4 — PERSONAL GUIDANCE
   ==================================================================== */
function GuidanceScreen({ onNext, onSkip, lang }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6 max-w-xl mx-auto py-12">
      <div>
        <h2 className="text-3xl font-black text-slate-900">Your Personal Guidance System</h2>
        <p className="text-slate-600 mt-2 text-base">
          Answer a few simple questions and get personalized career, education and skill recommendations.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            { label: "Education", icon: "book", desc: "Find right courses" },
            { label: "Career", icon: "briefcase", desc: "Explore paths" },
            { label: "Skills", icon: "award", desc: "Bridge gaps" },
            { label: "Goals", icon: "target", desc: "Achieve targets" }
          ].map((item) => (
            <div key={item.label} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Icon name={item.icon} className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">{item.label}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 space-y-3">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold text-base shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition"
        >
          {lang.next}
        </button>
        <button
          onClick={onSkip}
          className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-100 transition"
        >
          {lang.skip}
        </button>
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 5 — PLAN YOUR FUTURE
   ==================================================================== */
function PlanFutureScreen({ onStart, lang }) {
  const steps = [
    { num: "1", title: "Know Yourself", desc: "Interests, strengths and goals" },
    { num: "2", title: "Explore Options", desc: "Courses, careers and skills" },
    { num: "3", title: "Get a Personalized Plan", desc: "Roadmap and learning resources" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6 max-w-xl mx-auto py-12">
      <div>
        <h2 className="text-3xl font-black text-slate-900">Plan Your Future</h2>
        <p className="text-purple-600 font-bold text-lg mt-1">Step by Step</p>

        <div className="mt-8 space-y-4">
          {steps.map((s) => (
            <div key={s.num} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-black flex items-center justify-center shrink-0">
                {s.num}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{s.title}</h4>
                <p className="text-sm text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-purple-500/30 hover:opacity-95 transition"
        >
          {lang.getStarted}
        </button>
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 6 — MAIN DASHBOARD / HOME
   ==================================================================== */
function DashboardScreen({ profile, setCurrentPage, searchQuery, setSearchQuery, lang }) {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl sm:text-4xl font-black">Hello, {profile.name || "Student"} 👋</h1>
          <p className="mt-2 text-purple-100 text-sm sm:text-base font-medium">
            Small steps today, big dreams tomorrow!
          </p>

          {/* Search bar */}
          <div className="mt-6 relative">
            <Icon name="search" className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/95 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-4 focus:ring-purple-400/40 text-sm shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Ask Planora Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-purple-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Icon name="sparkles" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Not sure what's next?</h3>
            <p className="text-xs text-slate-600">Let Planora AI analyze your profile and guide you instantly.</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentPage('chat')}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm shadow-md hover:bg-purple-700 transition shrink-0"
        >
          {lang.askPlanora}
        </button>
      </div>

      {/* Main Options Grid */}
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4">Explore Guidance Areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <DashboardCard
            icon="book"
            title="Education"
            subtitle="Find the right course"
            badge="Courses"
            onClick={() => setCurrentPage('explore')}
          />

          <DashboardCard
            icon="briefcase"
            title="Career"
            subtitle="Explore career paths"
            badge="Recommendations"
            onClick={() => setCurrentPage('personalized-plan')}
          />

          <DashboardCard
            icon="award"
            title="Internship"
            subtitle="Gain real experience"
            badge="Prep Ready"
            onClick={() => setCurrentPage('explore')}
          />

          {/* CRITICAL MANDATORY NAVIGATION RULE */}
          <DashboardCard
            icon="target"
            title="Interests & Goals"
            subtitle="Know yourself and your goals"
            badge="Skills Selection"
            highlight
            onClick={() => setCurrentPage('interests-goals')}
          />

          <DashboardCard
            icon="map-pin"
            title="My Roadmap"
            subtitle="View your personalized plan"
            badge="6-Month Track"
            onClick={() => setCurrentPage('roadmap')}
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, subtitle, badge, onClick, highlight = false }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl border transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${
        highlight
          ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300 shadow-md'
          : 'bg-white border-slate-200 shadow-sm hover:border-purple-200'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${highlight ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'}`}>
            <Icon name={icon} className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {badge}
          </span>
        </div>
        <h3 className="font-extrabold text-slate-900 text-lg">{title}</h3>
        <p className="text-slate-500 text-xs mt-1">{subtitle}</p>
      </div>

      <div className="mt-6 flex items-center text-xs font-bold text-purple-600">
        <span>Explore details</span>
        <Icon name="chevron-right" className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 7 — INTERESTS & GOALS / SKILLS SELECTION
   ==================================================================== */
function InterestsSkillsScreen({ profile, setProfile, onNext, lang }) {
  const [techSkills, setTechSkills] = useState(profile.techSkills || []);
  const [softSkills, setSoftSkills] = useState(profile.softSkills || []);
  const [interests, setInterests] = useState(profile.interests || []);
  const [skillLevel, setSkillLevel] = useState(profile.skillLevel || "Intermediate");
  const [goals, setGoals] = useState(profile.goals || []);

  const toggleArray = (arr, setArr, item) => {
    if (arr.includes(item)) setArr(arr.filter(i => i !== item));
    else setArr([...arr, item]);
  };

  const handleSave = () => {
    setProfile({
      ...profile,
      techSkills,
      softSkills,
      interests,
      skillLevel,
      goals
    });
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Let's understand your interests & skills</h2>
        <p className="text-slate-500 text-sm mt-1">Select all that apply to personalize your career engine.</p>
      </div>

      {/* Technical Skills */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-3">Technical Skills</h3>
        <div className="flex flex-wrap gap-2.5">
          {[
            "Programming", "Data Analysis", "Web Development", "AI / Machine Learning",
            "Database", "Cloud", "Cybersecurity", "Design"
          ].map(skill => (
            <button
              key={skill}
              onClick={() => toggleArray(techSkills, setTechSkills, skill)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                techSkills.includes(skill)
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-3">Soft Skills</h3>
        <div className="flex flex-wrap gap-2.5">
          {["Communication", "Leadership", "Problem Solving", "Teamwork"].map(skill => (
            <button
              key={skill}
              onClick={() => toggleArray(softSkills, setSoftSkills, skill)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                softSkills.includes(skill)
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Interest Areas */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-3">Interest Areas</h3>
        <div className="flex flex-wrap gap-2.5">
          {[
            "Artificial Intelligence", "Software Development", "Data",
            "Cybersecurity", "Design", "Business", "Research"
          ].map(area => (
            <button
              key={area}
              onClick={() => toggleArray(interests, setInterests, area)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                interests.includes(area)
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Level Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-3">Current Skill Level</h3>
        <div className="grid grid-cols-3 gap-3">
          {["Beginner", "Intermediate", "Advanced"].map(lvl => (
            <button
              key={lvl}
              onClick={() => setSkillLevel(lvl)}
              className={`py-3 rounded-xl text-xs font-bold transition border text-center ${
                skillLevel === lvl
                  ? 'bg-purple-900 text-white border-purple-900 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-3">Primary Goals</h3>
        <div className="flex flex-wrap gap-2.5">
          {[
            "Get a job", "Get internship", "Build projects",
            "Higher studies", "Competitive exams", "Explore careers"
          ].map(goal => (
            <button
              key={goal}
              onClick={() => toggleArray(goals, setGoals, goal)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                goals.includes(goal)
                  ? 'bg-pink-600 text-white border-pink-600 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-purple-500/30 hover:opacity-95 transition flex items-center justify-center space-x-2"
      >
        <span>{lang.next}</span>
        <Icon name="arrow-right" className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ====================================================================
   PAGE 8 — PERSONALIZED CAREER PLAN
   ==================================================================== */
function PersonalizedPlanScreen({ profile, setProfile, setCurrentPage, lang }) {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Your Personalized Plan</h2>
        <p className="text-slate-500 text-sm mt-1">
          Based on your profile, here are the best options for you.
        </p>
      </div>

      <div className="space-y-4">
        {CAREER_DATABASE.map((career) => {
          const isSelected = profile.selectedCareerId === career.id;
          return (
            <div
              key={career.id}
              className={`bg-white rounded-2xl p-6 border shadow-sm transition hover:shadow-md ${
                isSelected ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs">
                      {career.matchScore}% Match
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{career.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{career.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">{career.whyMatch}</p>
                </div>

                <button
                  onClick={() => {
                    setProfile({ ...profile, selectedCareerId: career.id });
                    setCurrentPage('career-details');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-700 transition shrink-0"
                >
                  Explore Detailed Plan
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Required Skills: </span>
                  <span className="font-bold text-slate-700">{career.requiredSkills.join(', ')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 9 — CAREER / COURSE DETAILS
   ==================================================================== */
function CareerDetailsScreen({ career, profile, setCurrentPage, showToast, lang }) {
  const missingSkills = career.requiredSkills.filter(s => !profile.techSkills.includes(s));

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-black text-xs">
            {career.matchScore}% Match
          </span>
          <button
            onClick={() => setCurrentPage('roadmap')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition"
          >
            Create My Roadmap →
          </button>
        </div>

        <h1 className="text-3xl font-black text-slate-900">{career.title}</h1>
        <p className="text-slate-600 text-sm">{career.description}</p>
        <div className="p-4 rounded-xl bg-purple-50 text-purple-900 text-xs font-medium border border-purple-100">
          <strong>Why this matches: </strong> {career.whyMatch}
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center text-emerald-600">
            <Icon name="check-circle" className="w-4 h-4 mr-2" /> Current Strengths
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.techSkills.map(s => (
              <span key={s} className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center text-amber-600">
            <Icon name="target" className="w-4 h-4 mr-2" /> Skill Gaps to Bridge
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map(s => (
              <span key={s} className="px-3 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Recommended Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {career.recommendedCourses.map(course => (
            <div key={course.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">{course.level} • {course.duration}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{course.title}</h4>
              </div>
              <button
                onClick={() => showToast(`Added ${course.title} to your plan!`)}
                className="mt-4 w-full py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
              >
                + Add to My Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 10 — 6-MONTH ROADMAP
   ==================================================================== */
function RoadmapScreen({ profile, setProfile, showToast, lang }) {
  const roadmapData = [
    { id: "m1-1", month: "Month 1", title: "Programming Fundamentals", tasks: ["Master Data Types & Control Structures", "Solve 20 Basic Logic Problems"] },
    { id: "m2-1", month: "Month 2", title: "Frontend Development", tasks: ["HTML5, CSS Grid/Flexbox Layouts", "JavaScript DOM & Fetch APIs"] },
    { id: "m3-1", month: "Month 3", title: "Backend Development", tasks: ["RESTful Server Setup", "Authentication & JWT Security"] },
    { id: "m4-1", month: "Month 4", title: "Databases & APIs", tasks: ["SQL Queries & Database Schema Design", "API Integration & Testing"] },
    { id: "m5-1", month: "Month 5", title: "Build Real Projects", tasks: ["Deploy Full-Stack Portfolio App", "GitHub Code Documentation"] },
    { id: "m6-1", month: "Month 6", title: "Resume + Interview Preparation", tasks: ["Mock Technical Interviews", "Resume Optimization & LinkedIn Prep"] }
  ];

  const toggleTask = (id) => {
    const updated = { ...profile.roadmapTasks, [id]: !profile.roadmapTasks[id] };
    setProfile({ ...profile, roadmapTasks: updated });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Your 6-Month Roadmap</h2>
          <p className="text-slate-500 text-sm mt-1">Structured step-by-step career progress tracker.</p>
        </div>
        <button
          onClick={() => showToast("Plan saved successfully to profile!")}
          className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-700 transition"
        >
          {lang.savePlan}
        </button>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 border-l-2 border-purple-200 space-y-8 my-6">
        {roadmapData.map((item) => {
          const isDone = profile.roadmapTasks[item.id];
          return (
            <div key={item.id} className="relative">
              {/* Dot */}
              <div
                onClick={() => toggleTask(item.id)}
                className={`absolute -left-[31px] top-1 w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition ${
                  isDone ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-300'
                }`}
              >
                {isDone && <Icon name="check-circle" className="w-4 h-4" />}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-purple-600">{item.month}</span>
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>

                <ul className="space-y-1.5 pt-2">
                  {item.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => toggleTask(item.id)}
                  className={`mt-3 text-xs font-bold ${isDone ? 'text-emerald-600' : 'text-purple-600'} hover:underline`}
                >
                  {isDone ? "✓ Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 11 — LEARNING RESOURCES, VIDEOS & MENTORS (EXPLORE SCREEN)
   ==================================================================== */
function ExploreScreen({ profile, setProfile, setCurrentPage, showToast, lang }) {
  const [activeTab, setActiveTab] = useState('mentors');
  const [mentorCategoryFilter, setMentorCategoryFilter] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(MENTOR_DATABASE.map(m => m.category));
    return ['All', 'Matched to Me', ...Array.from(set)];
  }, []);

  const filteredMentors = useMemo(() => {
    if (mentorCategoryFilter === 'All') return MENTOR_DATABASE;
    if (mentorCategoryFilter === 'Matched to Me') {
      const primaryInterest = profile.interests[0] || "Software Development";
      return MENTOR_DATABASE.filter(m => m.category === primaryInterest || m.category === "Software Development");
    }
    return MENTOR_DATABASE.filter(m => m.category === mentorCategoryFilter);
  }, [mentorCategoryFilter, profile.interests]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Learning & Mentor Hub</h2>
        <p className="text-slate-500 text-sm mt-1">Courses, video lessons, and verified industry mentors.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6">
        {[
          { id: 'mentors', label: `Mentors (${MENTOR_DATABASE.length})` },
          { id: 'courses', label: 'Courses' },
          { id: 'videos', label: 'Videos' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-bold text-sm transition border-b-2 ${
              activeTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mentors Tab */}
      {activeTab === 'mentors' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold flex items-center shrink-0 mr-1">
              <Icon name="filter" className="w-3.5 h-3.5 mr-1" /> Filter:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setMentorCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 border ${
                  mentorCategoryFilter === cat
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMentors.map(mentor => {
              const requested = profile.requestedMentors?.includes(mentor.id);
              return (
                <div key={mentor.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition">
                  <div className="flex items-start space-x-4">
                    <img src={mentor.avatar} alt={mentor.name} className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                          {mentor.category}
                        </span>
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                          <Icon name="star" className="w-3.5 h-3.5 mr-1" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mt-1">{mentor.name}</h3>
                      <p className="text-xs text-slate-600 font-medium">{mentor.title} • <span className="text-slate-500">{mentor.company}</span></p>
                      <p className="text-xs text-slate-400 mt-0.5">{mentor.experience} Exp • {mentor.languages.join(', ')}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{mentor.bio}"
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {mentor.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const reqs = profile.requestedMentors || [];
                      setProfile({ ...profile, requestedMentors: [...reqs, mentor.id] });
                      showToast(`Guidance request sent successfully to ${mentor.name}!`);
                    }}
                    disabled={requested}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                      requested
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                    }`}
                  >
                    {requested ? "✓ Request Sent" : lang.requestGuidance}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAREER_DATABASE.flatMap(c => c.recommendedCourses).map(course => (
            <div key={course.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                  {course.category}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-2">{course.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Platform: {course.platform} • Duration: {course.duration}</p>
              </div>
              <button
                onClick={() => showToast(`Added ${course.title} to your roadmap!`)}
                className="mt-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-700 transition"
              >
                {lang.addToPlan}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VIDEO_DATABASE.map(video => (
            <div key={video.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>{video.category}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100">{video.language}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{video.title}</h3>
                <p className="text-xs text-slate-600 mt-2">{video.description}</p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">⏱ {video.duration}</span>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center space-x-2 shadow-sm"
                >
                  <Icon name="play" className="w-3.5 h-3.5" />
                  <span>{lang.watchVideo}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ====================================================================
   PAGE 12 — PROGRESS (THE ONLY PROGRESS PAGE)
   ==================================================================== */
function ProgressScreen({ profile, stats, lang }) {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Your Progress</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time stats of your career growth and learning roadmap.</p>
      </div>

      {/* Overall Circle Stat */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300">{lang.overallProgress}</span>
          <h3 className="text-3xl font-black mt-1">{stats.overall}% Completed</h3>
          <p className="text-xs text-slate-300 mt-2">
            Roadmap Tasks Done: {stats.completedTasks} of {stats.totalTasks}
          </p>
        </div>

        <div className="w-24 h-24 rounded-full border-8 border-purple-500 border-t-purple-300 flex items-center justify-center text-xl font-black">
          {stats.overall}%
        </div>
      </div>

      {/* Skills Bars */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">{lang.skillsProgress}</h3>

        {[
          { name: "Programming", val: 45 },
          { name: "Web Development", val: 60 },
          { name: "Database", val: 40 },
          { name: "Communication", val: 70 },
          { name: "Soft Skills", val: 55 }
        ].map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{item.name}</span>
              <span>{item.val}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                style={{ width: `${item.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 13 — AI CAREER CHAT
   ==================================================================== */
function AIChatScreen({ profile, setProfile, lang }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${profile.name}! I'm Planora AI. I see your goal is ${profile.goals[0] || 'career advancement'}. How can I assist you with your roadmap today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customQuery) => {
    const queryText = customQuery || input;
    if (!queryText.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: queryText }];
    setMessages(newMessages);
    if (!customQuery) setInput('');
    setLoading(true);

    try {
      // The Gemini call runs server-side in netlify/functions/chat.mts so no API key
      // is ever shipped to the browser.
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          language: lang,
          profile: {
            name: profile.name,
            techSkills: profile.techSkills,
            softSkills: profile.softSkills,
            interests: profile.interests,
            selectedCareerId: profile.selectedCareerId,
            skillLevel: profile.skillLevel,
            goals: profile.goals
          }
        })
      });

      const data = await response.json().catch(() => ({}));
      const reply = (response.ok && data.reply) ? data.reply : getFallbackReply(queryText, profile);

      setMessages([...newMessages, { sender: 'ai', text: reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'ai', text: getFallbackReply(queryText, profile) }]);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackReply = (query, prof) => {
    const q = query.toLowerCase();
    if (q.includes('next') || q.includes('learn')) {
      return `Based on your profile, you already know ${prof.techSkills.join(', ')}. Next, focus on SQL Database design and REST API fundamentals for your ${prof.selectedCareerId} roadmap.`;
    }
    if (q.includes('missing') || q.includes('gap')) {
      return `You currently need to strengthen SQL, Git version control, and cloud deployment basics to become interview ready!`;
    }
    return `Planora recommends continuing with Month 3 of your personalized roadmap for optimal career growth!`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 flex flex-col h-[calc(100vh-140px)]">
      <div className="bg-white p-4 rounded-t-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
            <Icon name="sparkles" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Planora AI Career Assistant</h3>
            <p className="text-[11px] text-slate-500">Context-aware guidance • Active profile linked</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-slate-50 p-4 border-x border-slate-200 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none shadow-md'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-400 animate-pulse">
              Planora AI is thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="bg-slate-100 p-2 border-x border-slate-200 flex overflow-x-auto space-x-2 text-xs">
        {["What should I learn next?", "What skills am I missing?", "Suggest a project"].map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 whitespace-nowrap hover:bg-slate-50 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white rounded-b-2xl border border-slate-200 shadow-md flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Planora anything about your career path..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <button
          onClick={() => handleSend()}
          className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition shadow-sm"
        >
          <Icon name="send" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ====================================================================
   PAGE 14 — PROFILE / SETTINGS & LOGOUT
   ==================================================================== */
function ProfileScreen({ profile, setProfile, onLogoutClick, setCurrentPage, selectedLanguage, setSelectedLanguage, lang }) {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      {/* User Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-5">
        <div className="w-16 h-16 rounded-full bg-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
          {profile.name ? profile.name.charAt(0) : 'S'}
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">{profile.name}</h2>
          <p className="text-xs text-slate-500 font-semibold">{profile.degree} • {profile.year} • {profile.branch}</p>
          <p className="text-xs text-slate-400 mt-1">{profile.email}</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        
        {/* MANDATORY RULE: Return to Skills Selection */}
        <div
          onClick={() => setCurrentPage('interests-goals')}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-3">
            <Icon name="target" className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-sm text-slate-800">My Interests & Goals</span>
          </div>
          <Icon name="chevron-right" className="w-4 h-4 text-slate-400" />
        </div>

        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition">
          <div className="flex items-center space-x-3">
            <Icon name="award" className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-sm text-slate-800">What I Have Covered</span>
          </div>
          <Icon name="chevron-right" className="w-4 h-4 text-slate-400" />
        </div>

        {/* Language Selection */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="globe" className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-sm text-slate-800">Language Preference</span>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-slate-100 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="ur">اردو (Urdu)</option>
          </select>
        </div>

        {/* Logout Option */}
        <div
          onClick={onLogoutClick}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-red-50 transition text-red-600"
        >
          <div className="flex items-center space-x-3">
            <Icon name="log-out" className="w-5 h-5" />
            <span className="font-bold text-sm">{lang.logout}</span>
          </div>
          <Icon name="chevron-right" className="w-4 h-4" />
        </div>

      </div>
    </div>
  );
}
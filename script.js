// ==========================================================================
// STATIC PORTFOLIO DATA
// ==========================================================================
const PROJECTS_DATA = {
  sketchnest: {
    title: "SketchNest — Art Learning Web Platform",
    image: "images/project2.png",
    summary: "A comprehensive full-stack art-learning platform designed to help users master sketching step-by-step.",
    features: [
      "Structured learning phases for beginners to advanced artists.",
      "Direct sketch uploads and profile galleries.",
      "Side-by-side sketch comparison tool.",
      "Interactive weekly drawing challenges.",
      "Peer feedback, ratings, and gallery exposure.",
      "Artwork showcase feed."
    ],
    stack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/komalmauryagithub/Sketchnest.git",
    demo: "https://sketchnest.onrender.com",
    challenges: "Handling image processing and comparative uploads seamlessly while keeping response rates low on the hosting instance.",
    learnings: "Deepened understanding of MongoDB schema designs for relational data (feedback/ratings) and managing user media assets efficiently."
  },
  kfood: {
    title: "KFOOD — Korean Food E-Commerce Website",
    image: "images/project1.jpg", 
    summary: "A responsive full-stack Korean food e-commerce platform offering specialized features like Idol meals and Drama bites.",
    features: [
      "Dynamic catalog browsing and categorizations.",
      "Wishlist creation and persistent shopping cart states.",
      "Secure user registration and session management.",
      "Order management and historic summaries.",
      "Drama Bites (themed snacks) and Idol Meals recommendations."
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/komalmauryagithub/KFood",
    demo: "https://kfood-1-mfqv.onrender.com",
    challenges: "Managing dynamic state changes across multiple React components while syncing database orders securely.",
    learnings: "Mastered React state controls, writing clean custom hooks, and handling complex e-commerce order workflows."
  },
  aichatbot: {
    title: "AI Chatbot Website",
    image: "images/chatbot.jpg",
    summary: "An interactive full-stack chat portal leveraging generative AI APIs to assist users query dynamic prompts.",
    features: [
      "Generative chatbot powered by OpenAI API integrations.",
      "Real-time streaming responses and smooth chat history loading.",
      "Optimized query token controls to throttle usage charges.",
      "Clean dark-mode interface for reading code output."
    ],
    stack: ["Node.js", "Express.js", "JavaScript", "OpenAI API", "HTML5", "CSS3"],
    github: "https://github.com/komalmauryagithub/Ai-Chatbot",
    demo: "https://ai-chatbot-m9sm.onrender.com",
    challenges: "Structuring system instructions for OpenAI prompts to maintain role accuracy and handling asynchronous API drops.",
    learnings: "Learned context window management, API error mapping, and structuring chatbot memory buffers."
  }
};

const SKILLS_DATA = [
  { name: "HTML5", category: "frontend", icon: "fab fa-html5" },
  { name: "CSS3", category: "frontend", icon: "fab fa-css3-alt" },
  { name: "JavaScript", category: "frontend", icon: "fab fa-js" },
  { name: "Bootstrap", category: "frontend", icon: "fab fa-bootstrap" },
  { name: "Tailwind CSS", category: "frontend", icon: "fas fa-wind" },
  { name: "React.js", category: "frontend", icon: "fab fa-react" },
  { name: "Node.js", category: "backend", icon: "fab fa-node-js" },
  { name: "Express.js", category: "backend", icon: "fas fa-server" },
  { name: "PHP", category: "backend", icon: "fab fa-php" },
  { name: "Python", category: "languages", icon: "fab fa-python" },
  { name: "MySQL", category: "databases", icon: "fas fa-database" },
  { name: "MongoDB", category: "databases", icon: "fas fa-leaf" },
  { name: "Git", category: "tools", icon: "fab fa-git-alt" },
  { name: "GitHub", category: "tools", icon: "fab fa-github" },
  { name: "Canva", category: "tools", icon: "fas fa-palette" },
  { name: "MS Office", category: "tools", icon: "fas fa-file-word" }
];

// ==========================================================================
// DOM INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavigation();
  initHeroSpotlight();
  initRoleTyping();
  initScrollReveal();
  initSkillsFilter();
  initProjectModals();
  initContactForm();
  initMouseSpotlights();
  initBackToTop();
  initBackgroundAnimation();
});

// 1. Intro Loader
function initLoader() {
  const loader = document.getElementById("intro-loader");
  if (!loader) return;

  // Wait for the full page assets to load, then hide loader
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 800); // short elegant loading duration
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 3000);
}

// 2. Navigation Controls
function initNavigation() {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links-container");
  const scrollProgress = document.getElementById("scroll-progress");
  
  if (!header) return;

  let lastScrollY = window.scrollY;

  // Mobile menu toggle
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinksContainer.classList.toggle("active");
    });

    // Close menu when clicking links
    navLinksContainer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinksContainer.classList.remove("active");
      });
    });
  }

  // Scroll Actions (Progress & Navbar Hide/Show & Sticky state)
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Update Scroll Progress Bar
    if (scrollProgress && totalHeight > 0) {
      const progressPercent = (currentScrollY / totalHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Sticky Navbar class additions
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;

    // Track active navigation links based on visible sections
    trackActiveNavLinks();
  });
}

function trackActiveNavLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a:not(.nav-resume-btn)");
  
  let currentActiveSectionId = "";
  const scrollPosition = window.scrollY + 120; // offset for nav header height

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      currentActiveSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentActiveSectionId}`) {
      link.classList.add("active");
    }
  });
}

// 3. Hero Mouse Spotlight Background
function initHeroSpotlight() {
  const heroSection = document.getElementById("home");
  const spotlight = document.getElementById("hero-spotlight");

  if (!heroSection || !spotlight) return;

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    spotlight.style.left = `${x}px`;
    spotlight.style.top = `${y}px`;
  });
}

// 4. Hero Role Typing Effect
function initRoleTyping() {
  const roleElement = document.getElementById("hero-role-text");
  if (!roleElement) return;

  const roles = [
    "Full-Stack Web Developer",
    "Problem Solver",
    "UI/UX Design Enthusiast",
    "Creative Tech Explorer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      delay = 50;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      delay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      delay = 2000; // pause at peak
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500; // pause before starting next word
    }

    setTimeout(type, delay);
  }

  // Start typewriter effect
  setTimeout(type, 1000);
}

// 5. Scroll Reveal Transitions (Intersection Observer)
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    // Fallback: reveal everything immediately if browser does not support it
    revealElements.forEach(el => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // unobserve once revealed to save CPU cycles
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // use viewport
    rootMargin: "0px",
    threshold: 0.15 // trigger when 15% visible
  });

  revealElements.forEach(el => observer.observe(el));
}

// 6. Skills Categories Filter Tabs
function initSkillsFilter() {
  const tabContainer = document.getElementById("skills-tabs");
  const gridContainer = document.getElementById("skills-grid-container");

  if (!tabContainer || !gridContainer) return;

  // Initialize skills rendering
  renderSkills("all");

  tabContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("skill-tab-btn")) {
      // Toggle button classes
      tabContainer.querySelectorAll(".skill-tab-btn").forEach(btn => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      const category = e.target.getAttribute("data-category");
      
      // Fade grid out, re-render, fade grid in
      gridContainer.style.opacity = 0;
      setTimeout(() => {
        renderSkills(category);
        gridContainer.style.opacity = 1;
      }, 200);
    }
  });

  function renderSkills(category) {
    gridContainer.innerHTML = "";
    
    const filtered = category === "all" 
      ? SKILLS_DATA 
      : SKILLS_DATA.filter(skill => skill.category === category);

    filtered.forEach(skill => {
      const card = document.createElement("div");
      card.className = "skill-item-card reveal active"; // active to display
      card.innerHTML = `
        <div class="skill-icon"><i class="${skill.icon}"></i></div>
        <div class="skill-name">${skill.name}</div>
      `;
      gridContainer.appendChild(card);
    });
  }
}

// 7. Featured Projects Detail Dialog Modals
function initProjectModals() {
  const modalOverlay = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const detailButtons = document.querySelectorAll(".btn-details");

  if (!modalOverlay || !modalClose) return;

  // Open modal click handler
  detailButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute("data-project");
      const project = PROJECTS_DATA[projectKey];

      if (project) {
        populateModal(project);
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // block background scroll
      }
    });
  });

  // Close modal click handler
  modalClose.addEventListener("click", () => {
    closeModal();
  });

  // Close when clicking overlay backdrop
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // restore scrolling
  }

  function populateModal(project) {
    const modalImage = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalSummary = document.getElementById("modal-summary");
    const modalFeaturesList = document.getElementById("modal-features-list");
    const modalTechTags = document.getElementById("modal-tech-tags");
    const modalChallenges = document.getElementById("modal-challenges");
    const modalLearnings = document.getElementById("modal-learnings");
    const modalActions = document.getElementById("modal-actions");

    if (modalImage) modalImage.src = project.image;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalSummary) modalSummary.textContent = project.summary;

    // Populate features list
    if (modalFeaturesList) {
      modalFeaturesList.innerHTML = "";
      project.features.forEach(feat => {
        const li = document.createElement("li");
        li.textContent = feat;
        modalFeaturesList.appendChild(li);
      });
    }

    // Populate Tech Stack tags
    if (modalTechTags) {
      modalTechTags.innerHTML = "";
      project.stack.forEach(tech => {
        const span = document.createElement("span");
        span.className = "tech-tag";
        span.textContent = tech;
        modalTechTags.appendChild(span);
      });
    }

    // Populate Challenges and Learnings
    if (modalChallenges) modalChallenges.textContent = project.challenges;
    if (modalLearnings) modalLearnings.textContent = project.learnings;

    // Populate buttons depending on link existence
    if (modalActions) {
      modalActions.innerHTML = "";
      
      if (project.demo) {
        modalActions.innerHTML += `
          <a href="${project.demo}" target="_blank" class="btn-primary">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>
        `;
      }
      if (project.github) {
        modalActions.innerHTML += `
          <a href="${project.github}" target="_blank" class="btn-secondary">
            <i class="fab fa-github"></i> Source Code
          </a>
        `;
      }

      if (!project.demo && !project.github) {
        modalActions.innerHTML = `<p style="font-size:0.85rem;color:var(--text-muted);">Source code or demo link is private.</p>`;
      }
    }
  }
}

// 8. Contact Form Integration (Web3Forms AJAX Submission)
function initContactForm() {
  const form = document.getElementById("contact-form");
  const responseMsg = document.getElementById("form-response");
  const web3FormsEndpoint = "https://api.web3forms.com/submit";

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset error messages and border highlights
    clearFormErrors();
    if (responseMsg) {
      responseMsg.className = "form-response-msg";
      responseMsg.textContent = "";
    }

    const formData = {
      full_name: document.getElementById("full_name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      honeypot: document.getElementById("honeypot").checked
    };

    if (formData.honeypot) {
      if (responseMsg) {
        responseMsg.className = "form-response-msg success";
        responseMsg.textContent = "Thank you! Your message has been received.";
      }
      form.reset();
      return;
    }

    // Client-side quick checks
    let hasErrors = false;

    if (!formData.full_name.trim()) {
      showError("full_name", "Full name is required.");
      hasErrors = true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      showError("email", "Email is required.");
      hasErrors = true;
    } else if (!emailRegex.test(formData.email.trim())) {
      showError("email", "Enter a valid email address.");
      hasErrors = true;
    }

    if (!formData.subject.trim()) {
      showError("subject", "Subject is required.");
      hasErrors = true;
    }

    if (!formData.message.trim()) {
      showError("message", "Message is required.");
      hasErrors = true;
    }

    if (hasErrors) return;

    // Disable submit button and show loading text
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    if (responseMsg) {
      responseMsg.className = "form-response-msg success";
      responseMsg.textContent = "Sending your message...";
    }

    try {
      const payload = {
        access_key: form.querySelector('input[name="access_key"]').value,
        from_name: form.querySelector('input[name="from_name"]').value,
        name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        botcheck: formData.honeypot
      };

      const response = await fetch(web3FormsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const responseText = data.message || data.error || (data.body && data.body.message);

      if (response.ok && data.success) {
        // Success handler
        responseMsg.className = "form-response-msg success";
        responseMsg.textContent = responseText || "Thank you! Your message has been received.";
        form.reset(); // clear inputs
      } else {
        // Validation errors returned from Web3Forms
        responseMsg.className = "form-response-msg error";
        responseMsg.textContent = responseText || "Submission failed. Please try again.";
        
        if (data.errors) {
          Object.keys(data.errors).forEach(field => {
            const fieldId = field === "name" ? "full_name" : field;
            showError(fieldId, data.errors[field]);
          });
        }
      }
    } catch (networkError) {
      console.error("AJAX contact form error:", networkError);
      responseMsg.className = "form-response-msg error";
      responseMsg.textContent = "Unable to send your message right now. Please try again later.";
    } finally {
      // Restore submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showError(fieldId, errorMsg) {
    const errorEl = document.getElementById(`${fieldId}-error`);
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = errorMsg;
    if (inputEl) inputEl.style.borderColor = "#ff4a5a";
  }

  function clearFormErrors() {
    form.querySelectorAll(".form-input-error").forEach(el => {
      el.textContent = "";
    });
    form.querySelectorAll(".form-input").forEach(input => {
      input.style.borderColor = "";
    });
  }
}

// 9. Mouse spotlight coordinates tracking on project cards
function initMouseSpotlights() {
  const cards = document.querySelectorAll(".project-visual-panel");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// 10. Back to top button trigger
function initBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 11. Interactive Background Animation (Neural Network)
function initBackgroundAnimation() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  // Interactive properties
  let mouse = { x: null, y: null, radius: 150 };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  window.addEventListener('click', (e) => {
    // Add burst of particles on click
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(e.x, e.y));
    }
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor(x, y) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height;
      this.size = Math.random() * 2 + 1; // 1 to 3
      this.speedX = (Math.random() * 1) - 0.5;
      this.speedY = (Math.random() * 1) - 0.5;
      this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 1)' : 'rgba(178, 36, 239, 1)';
    }
    
    update() {
      // Base movement
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Bounce off walls
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Mouse interaction (repel)
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          
          // Repel slightly
          this.x -= forceDirectionX * force * 2;
          this.y -= forceDirectionY * force * 2;
        }
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  function init() {
    particles = [];
    // Adjust density based on screen size
    let numberOfParticles = (width * height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle());
    }
  }
  
  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect particles to each other
        if (distance < 110) {
          opacityValue = 1 - (distance / 110);
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.4})`; 
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
      
      // Connect particles to mouse (Glowing Core effect)
      if (mouse.x != null && mouse.y != null) {
        let dx = particles[a].x - mouse.x;
        let dy = particles[a].y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          opacityValue = 1 - (distance / mouse.radius);
          ctx.strokeStyle = `rgba(178, 36, 239, ${opacityValue * 0.8})`; // Purple line connecting to mouse
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    // Deep dark background
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, width, height);
    
    // Draw connections first
    connect();
    
    // Then draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
  }

  init();
  animate();
}

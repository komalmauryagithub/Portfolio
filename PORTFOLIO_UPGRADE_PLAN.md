# Portfolio Upgrade Plan — Komal Maurya (Node.js Backend Version)

This document outlines the roadmap to upgrade Komal Maurya's portfolio into a premium, high-interaction, visually stunning, and responsive portfolio with a lightweight Node.js/Express + MySQL backend for contact submissions.

## 1. What Currently Exists
* **Frontend Structure**: Standard static `index.html`, `style.css`, and a minor `script.js` for smooth scroll.
* **Layout**: A basic light grey/white layout with simple blue headers, simple list blocks for skills, and a two-column layout for projects.
* **Content**: 
  - Owner: Komal Maurya, Full Stack Developer & AI Enthusiast.
  - Projects: *SketchNest* (active repo/demo links present) and *AI Chatbot Website* (needs real details preserved or polished).
  - Contact Form: Basic forms with no backend saving.
* **Assets**: A profile image (`images/profile.jpg`) and one project image (`images/project2.png`).

## 2. What Will Be Preserved
* All original project links and URLs:
  - SketchNest demo: `https://komalmauryagithub.github.io/Sketchnest/SketchNest`
  - SketchNest repo: `https://github.com/komalmauryagithub/Sketchnest.git`
* The profile image and any actual historical details (e.g., degree: Bachelor of Science in Computer Science, University of Mumbai).
* Smooth scrolling behavior (expanded and polished).

## 3. Visual & Aesthetic Improvements (Design System)
* **Color Palette**: Modern dark editorial theme:
  - Background: Deep charcoal/midnight (`#0B0C10` / `#121214`)
  - Surfaces: Card/Section backgrounds using selective glassmorphism and fine dark borders (`#1F2833` / rgba(255,255,255,0.03))
  - Primary Text: Warm off-white (`#F5F5F7`)
  - Secondary Text: Muted silver-grey (`#C5C6C7`)
  - Accent 1: Electric Cyan/Teal (`#66FCF1` / `#00e5ff`)
  - Accent 2: Soft Violet (`#8A2BE2` / `#a18cd1`)
  - Highlight: Soft warm glow/amber (`#FFB347` / `#ff9f43`)
* **Typography**: Clean serif/sans-serif editorial mix. Using Google Fonts **Outfit** (for headers and display text) and **Inter** (for body and UI text).
* **Styling details**: Asymmetric grid layouts, subtle grid patterns, card hover glows, custom interactive mouse spotlights, and custom scrollbars.

## 4. Animations to be Added
* **Intro Loader**: Quick screen-wipe with kinetic text animation of Komal's initials (`KM`). Loads in under 1.2s, skipped on scroll or respect reduced-motion.
* **Hero Reveal**: Typewriter role selection or text fade-in, paired with a mouse-spotlight container.
* **Staggered Reveals**: Scroll triggers using the Intersection Observer API for clean entrance transitions (fade-in & slide-up) on sections and cards.
* **Card Interactive Tilt**: Mouse move hover tilt on project cards.
* **Floating Code Symbols**: Soft HTML/CSS/JS floating ambient symbols in the background.
* **Form Feedback**: Success checkmark animation and validation shakes.

## 5. New Components & Layout Sections
1. **Responsive Navbar**: With a scroll progress indicator, mobile hamburger overlay, active section highlight, and smooth hide/show on scroll.
2. **About Me Carousel/Story Timeline**: Modern asymmetric panel showing Education, Skills, and Interests side-by-side.
3. **Interactive Skills Matrix**: Skills categorized dynamically (Frontend, Backend, Database, Languages, Tools) with hover reveals and category filters (tabs).
4. **Project Details Modal**: A rich dialog revealing details for each project (challenges, learnings, tech stack) when a project is clicked.
5. **Timeline Components**: Educational milestones (B.Sc CS Mumbai, HSC, SSC) styled as modern glowing vertical threads.
6. **Soft Skills Cloud**: Circular responsive grid showing soft skills with elegant interactions.

## 6. Lightweight Node.js/Express + MySQL Backend
* **Database Table**: A single `contact_messages` table will be designed to securely store submissions.
* **Backend Structure**:
  - `package.json` for npm packages (`express`, `mysql2`, `dotenv`, `cors`).
  - `server.js` (or `app.js`): A single, minimal Express server that connects to MySQL, parses JSON body, handles CORS, and exposes `/api/contact` (POST).
  - `.env` for database connection credentials (excluded from git).
  - `.env.example` as a template for environment variables.
* **API Endpoint (`/api/contact`)**:
  - Validates requests via POST.
  - Sanitizes and validates inputs (email check, required inputs, character length limits).
  - Employs lightweight security (Honeypot token to block spambots, rate limiting/throttling).
  - Uses prepared statements (`mysql2` pool) to write submissions to the database.
  - Serves static files in production for seamless hosting, or supports CORS in development.

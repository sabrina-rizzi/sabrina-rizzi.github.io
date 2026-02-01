/*! 
 * (c) 2026 Sabrina Rizzi
 * Role: AI Developer & Data Analyst
 * Tutela legale: All Rights Reserved. Plagiarism is strictly prohibited.
 */


// ===== STATE MANAGEMENT =====
let currentLang = "it";
let currentTheme = "light";

// ===== INIT =====
// Mobile Menu Toggle Logic
const createMobileMenu = () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial State & UI Core
  initTheme();
  initLanguage();
  createMobileMenu();

  // 2. Background Layers
  initRootsBackground();

  // 3. Page components
  initNavbar();
  initBackToTop();
  initScrollAnimations();

  // 4. Interactive & Visual Effects
  initSmoothScroll();
  initWaveHandGreeting();
  initTypingEffect();
  initMouseTracking(); // Handles spotlight form too
  initContactWink();

  // Re-run roots init on theme change to ensure colors are updated
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTimeout(() => initRootsBackground(), 150);
    });
  }
});

// ===== CONTACT WINK EFFECT =====
function initContactWink() {
  const photo = document.getElementById("contact-photo");
  if (!photo) return;

  const originalSrc = "profile-photo.png";
  const winkSrc = "profile-photo-wink.png";

  // Preload wink image
  const preloadImg = new Image();
  preloadImg.src = winkSrc;

  // Hover effect
  photo.addEventListener("mouseenter", () => {
    photo.src = winkSrc;
  });

  photo.addEventListener("mouseleave", () => {
    photo.src = originalSrc;
  });

  // Auto-wink every 8 seconds
  setInterval(() => {
    // Only if not currently hovering
    if (!photo.matches(':hover')) {
      photo.src = winkSrc;
      setTimeout(() => {
        photo.src = originalSrc;
      }, 300); // Quick wink duration
    }
  }, 8000);
}

// ===== MOUSE TRACKING =====
function initMouseTracking() {
  const contactForm = document.querySelector('.contact-form');

  document.addEventListener('mousemove', (e) => {
    // Global mouse tracking (for blobs)
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);

    // Specific tracking for contact form spotlight
    if (contactForm) {
      const rect = contactForm.getBoundingClientRect();
      const formX = e.clientX - rect.left;
      const formY = e.clientY - rect.top;
      contactForm.style.setProperty('--mouse-x-form', `${formX}px`);
      contactForm.style.setProperty('--mouse-y-form', `${formY}px`);
    }
  });
}

// ===== CONTACT FORM =====


// ===== TYPING EFFECT =====
function initTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const roles = [
    { it: "AI Developer", en: "AI Developer" },
    { it: "Data Analyst", en: "Data Analyst" },
    { it: "Creative Developer", en: "Creative Developer" },
    { it: "Tech Enthusiast", en: "Tech Enthusiast" },
    { it: "Wine Lover", en: "Wine Lover" },
    { it: "Empowerer", en: "Empowerer" },
    { it: "Problem Solver", en: "Problem Solver" }
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    // Get current role based on language
    const currentLang = localStorage.getItem("lang") || "it";
    const currentRole = roles[roleIndex][currentLang];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Speed up when deleting
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing word
      isDeleting = true;
      typeSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}


// ===== THEME TOGGLE =====
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// ===== LANGUAGE TOGGLE =====
function initLanguage() {
  const langToggle = document.getElementById("langToggle");
  const savedLang = localStorage.getItem("lang") || "it";

  setLanguage(savedLang);

  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "it" ? "en" : "it";
    setLanguage(newLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Update button display
  const langToggle = document.getElementById("langToggle");
  if (lang === "it") {
    langToggle.innerHTML = `
            <span class="lang-active">IT</span>
            <span class="lang-inactive">EN</span>
        `;
  } else {
    langToggle.innerHTML = `
            <span class="lang-inactive">IT</span>
            <span class="lang-active">EN</span>
        `;
  }

  // Update all translatable elements
  document.querySelectorAll("[data-en]").forEach((element) => {
    const translation = element.getAttribute(`data-${lang}`);
    if (translation) {
      // Check if element has children with their own translations
      if (
        element.children.length === 0 ||
        element.children[0].hasAttribute("data-en")
      ) {
        element.textContent = translation;
      } else {
        // For elements with mixed content, update only text nodes
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue.trim()) {
            node.nodeValue = translation;
            break;
          }
        }
      }
    }
  });

  // Update wave hand greeting
  updateWaveHandGreeting();
}

// ===== WAVE HAND GREETING =====
function initWaveHandGreeting() {
  const waveHand = document.querySelector(".wave-hand");
  if (waveHand) {
    updateWaveHandGreeting();
  }
}

function updateWaveHandGreeting() {
  const waveHand = document.querySelector(".wave-hand");
  if (waveHand) {
    const greeting = currentLang === "it" ? "Ciao!" : "Hi!";
    waveHand.setAttribute("data-greeting", greeting);
  }
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(`
        .service-card,
        .skill-category,
        .soft-skill-card,
        .project-card,
        .why-me-card,
        .highlight-item,
        .education-card
    `);

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ===== ORGANIC ROOTS BACKGROUND =====
function initRootsBackground() {
  const canvas = document.getElementById("roots-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let roots = [];
  const maxRoots = 3; // 3 active cores as requested

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Root {
    constructor(x, y, angle, color) {
      this.x = x;
      this.y = y;
      this.startX = x;
      this.startY = y;
      // Start with a tech angle (multiples of 45 deg)
      this.angle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
      this.color = color;
      this.speed = Math.random() * 0.3 + 0.3; // Increased speed for more dynamic background
      this.thickness = Math.random() * 1.0 + 0.5; // Back to thin and elegant
      this.life = 0;
      this.maxLife = Math.random() * 1200 + 2000; // Drastically increased for section-crossing
      this.branches = 0;
      this.history = [{ x: this.x, y: this.y }];
      this.opacity = 1;
      this.fading = false;
    }

    draw() {
      if (!this.fading) {
        // Tech turn logic: ELONGATED (much less frequent turns)
        if (this.life > 0 && this.life % 120 === 0 && Math.random() < 0.2) {
          const turns = [-Math.PI / 4, Math.PI / 4, -Math.PI / 2, Math.PI / 2];
          this.angle += turns[Math.floor(Math.random() * turns.length)];
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.history.push({ x: this.x, y: this.y });

        this.life++;
        if (this.life >= this.maxLife) {
          this.fading = true;
        }
      } else {
        // Post-cycle fade: the whole trail disappears slowly
        this.opacity -= 0.005; // Fade over a few seconds
      }

      if (this.opacity <= 0) return;

      // Redraw the entire trail from history with root's current opacity
      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
      }

      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.thickness;

      // Glow effect
      ctx.shadowBlur = localStorage.getItem("theme") === "dark" ? 6 : 3;
      ctx.shadowColor = this.color;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Initial Node
      this.drawNode(this.startX, this.startY);

      // Current Head (Glowing Data Pulse) - only if not fading
      if (!this.fading) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.thickness * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = localStorage.getItem("theme") === "dark" ? 10 : 5;
        ctx.shadowColor = "#ffffff";
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // Still draw end node
        this.drawNode(this.x, this.y);
      }
      ctx.restore();

      // Rare branching (Selective to keep it Zen)
      if (!this.fading && this.life > 100 && this.life < this.maxLife - 100 && Math.random() < 0.005 && this.branches < 1) {
        const branchAngle = this.angle + (Math.random() < 0.5 ? Math.PI / 2 : -Math.PI / 2);
        roots.push(new Root(this.x, this.y, branchAngle, this.color));
        this.branches++;
      }
    }

    drawNode(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, this.thickness * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, this.thickness * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
  }

  function init() {
    roots = [];
    const isDark = localStorage.getItem("theme") === "dark";
    const colors = isDark ? [
      "rgba(168, 85, 247, 0.9)",
      "rgba(59, 130, 246, 0.9)",
      "rgba(244, 114, 182, 0.8)",
    ] : [
      "rgba(58, 81, 213, 1)",
      "rgba(121, 120, 199, 1)",
      "rgba(168, 85, 247, 1)",
    ];

    for (let i = 0; i < maxRoots; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      roots.push(new Root(x, y, Math.random() * Math.PI * 2, colors[Math.floor(Math.random() * colors.length)]));
    }
  }

  function animate() {
    // Immaculate background - clear completely every frame
    ctx.clearRect(0, 0, width, height);

    for (let i = roots.length - 1; i >= 0; i--) {
      roots[i].draw();
      if (roots[i].opacity <= 0) {
        roots.splice(i, 1);
        // Replace with new root if too few
        if (roots.length < maxRoots) {
          const isDark = localStorage.getItem("theme") === "dark";
          const currentColors = isDark ? [
            "rgba(168, 85, 247, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(244, 114, 182, 0.95)",
          ] : [
            "rgba(58, 81, 213, 1)",
            "rgba(121, 120, 199, 1)",
            "rgba(168, 85, 247, 1)",
          ];
          roots.push(new Root(Math.random() * width, Math.random() * height, Math.random() * Math.PI * 2, currentColors[Math.floor(Math.random() * currentColors.length)]));
        }
      }
    }

    requestAnimationFrame(animate);
  }

  init();
  animate();
}

// ===== DYNAMIC PROJECT LOADING (Example) =====
// Projects section now shows a CTA card instead
// No need for loadProjects function anymore

// ===== EXPORT FUNCTIONS FOR TESTING =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    setTheme,
    setLanguage,
  };
}

console.log(
  "%c© Sabrina Rizzi | AI Developer & Data Analyst%c\nQuesto sito è protetto da copyright. Il plagio accademico verrà segnalato.",
  "color: #6a5acd; font-size: 20px; font-weight: bold;",
  "color: #555; font-size: 12px;"
);
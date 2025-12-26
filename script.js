// ===== STATE MANAGEMENT =====
let currentLang = "it";
let currentTheme = "light";

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  initNavbar();
  initBackToTop();
  initScrollAnimations();
  initSmoothScroll();
});

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

// ===== DYNAMIC PROJECT LOADING (Example) =====
// You can expand this to fetch projects from GitHub API
function loadProjects() {
  const projects = [
    {
      title: "Data Analysis Dashboard",
      description: {
        it: "Dashboard interattiva per analisi esplorativa dati con Python e SQL",
        en: "Interactive dashboard for exploratory data analysis with Python and SQL",
      },
      tags: ["Python", "SQL", "Pandas"],
      icon: "📊",
      link: "https://github.com/your-username/project-1",
    },
    {
      title: "AI Chatbot Integration",
      description: {
        it: "Bot conversazionale AI integrato in sistema CRM aziendale",
        en: "AI conversational bot integrated into corporate CRM system",
      },
      tags: ["Python", "NLP", "API"],
      icon: "🤖",
      link: "https://github.com/your-username/project-2",
    },
    {
      title: "Automated Data Pipeline",
      description: {
        it: "Pipeline automatizzata per ETL e pulizia dati da fonti multiple",
        en: "Automated pipeline for ETL and data cleaning from multiple sources",
      },
      tags: ["Python", "Docker", "SQL"],
      icon: "⚙️",
      link: "https://github.com/your-username/project-3",
    },
  ];

  const projectsGrid = document.querySelector(".projects-grid");
  projectsGrid.innerHTML = "";

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder">${project.icon}</div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description" data-en="${
                  project.description.en
                }" data-it="${project.description.it}">
                    ${project.description[currentLang]}
                </p>
                <div class="project-tags">
                    ${project.tags
                      .map((tag) => `<span class="project-tag">${tag}</span>`)
                      .join("")}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">
                    <span data-en="View on GitHub" data-it="Vedi su GitHub">${
                      currentLang === "it" ? "Vedi su GitHub" : "View on GitHub"
                    }</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="currentColor"/>
                    </svg>
                </a>
            </div>
        `;
    projectsGrid.appendChild(projectCard);
  });
}

// Load projects on init
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy load images (if you add real project images)
function initLazyLoad() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== EASTER EGG - Konami Code =====
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join("") === konamiSequence.join("")) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  // Add confetti or special animation
  document.body.style.animation = "rainbow 2s ease infinite";
  setTimeout(() => {
    document.body.style.animation = "";
  }, 3000);
}

// Add rainbow animation
const style = document.createElement("style");
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== CURSOR EFFECT (Optional - can be removed for simplicity) =====
function initCursorEffect() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.display = "block";
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
    });
  });
}

// Uncomment to enable cursor effect
// initCursorEffect();

// ===== EXPORT FUNCTIONS FOR TESTING =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    setTheme,
    setLanguage,
    loadProjects,
  };
}

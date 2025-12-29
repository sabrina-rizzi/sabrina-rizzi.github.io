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
  initWaveHandGreeting();
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

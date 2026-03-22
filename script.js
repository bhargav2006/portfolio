/* ============================================================
   THEME TOGGLE
   ============================================================ */
(function () {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function initTheme() {
  const btns = document.querySelectorAll(".theme-btn");
  function update() {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    btns.forEach((btn) => {
      btn.innerHTML = isDark
        ? `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    });
  }
  update();
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      update();
    }),
  );
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const dropdown = document.getElementById("mobile-dropdown");
  const mobileHomeLink = document.querySelector(".mobile-home-link");
  if (!hamburger || !dropdown) return;

  function closeMenu() {
    hamburger.classList.remove("open");
    dropdown.classList.remove("open");
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    dropdown.classList.toggle("open");
  });

  dropdown.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  mobileHomeLink?.addEventListener("click", () => {
    closeMenu();
  });

  document.addEventListener("click", (e) => {
    const clickedInsideMenu = dropdown.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);
    if (!clickedInsideMenu && !clickedHamburger) {
      closeMenu();
    }
  });
}

/* ============================================================
   ACTIVE NAV HIGHLIGHT
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    ".sidebar-nav a, .mobile-dropdown a",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelectorAll(
            `a[href="#${entry.target.id}"]`,
          );
          active.forEach((a) => a.classList.add("active"));
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ============================================================
   TYPING EFFECT
   ============================================================ */
function initTyping() {
  const el = document.getElementById("typed-text");
  if (!el) return;
  // const roles = ['Full Stack Developer', 'Java Programmer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
  const roles = ["Dev", "Data Analyst", "Tech Enthusiast"];
  let roleIdx = 0,
    charIdx = 0,
    deleting = false;

  function tick() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        setTimeout(tick, 1800);
        deleting = true;
        return;
      }
      setTimeout(tick, 90);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 50);
    }
  }
  tick();
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  els.forEach((el) => obs.observe(el));
}

/* ============================================================
   SKILLS PROGRESS BARS
   ============================================================ */
function initSkills() {
  const bars = document.querySelectorAll(".skill-bar-fill[data-pct]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pct = entry.target.getAttribute("data-pct");
          entry.target.style.width = pct + "%";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  bars.forEach((bar) => obs.observe(bar));
}

/* ============================================================
   TABS (Experience section)
   ============================================================ */
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));
      document.getElementById(target)?.classList.add("active");
    });
  });
}

/* ============================================================
   PDF MODAL
   ============================================================ */
function initModal() {
  const overlay = document.getElementById("pdf-modal");
  const title = document.getElementById("modal-title");
  const certName = document.getElementById("modal-cert-name");
  const placeholder = document.getElementById("modal-placeholder");
  const pdfFrame = document.getElementById("modal-pdf");
  const imageWrap = document.getElementById("modal-image-wrap");
  const previewImage = document.getElementById("modal-image");
  const closeBtn = document.getElementById("modal-close");

  const pdfEmbedParams =
    "toolbar=0&navpanes=0&statusbar=0&messages=0&view=FitB&zoom=page-fit";

  let modalOpenState = false;
  let skipNextPopstate = false;
  let imageScale = 1;
  let pinchStartDistance = 0;
  let pinchStartScale = 1;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setImageScale(nextScale) {
    imageScale = clamp(nextScale, 1, 4);
    if (previewImage) {
      previewImage.style.transform = `scale(${imageScale})`;
    }
  }

  function resetImageZoom() {
    imageScale = 1;
    pinchStartDistance = 0;
    pinchStartScale = 1;
    if (previewImage) {
      previewImage.style.transform = "scale(1)";
    }
  }

  function getTouchDistance(touchA, touchB) {
    const dx = touchA.clientX - touchB.clientX;
    const dy = touchA.clientY - touchB.clientY;
    return Math.hypot(dx, dy);
  }

  function isPdfUrl(url) {
    return /\.pdf(?:$|[?#])/i.test(url);
  }

  function isImageUrl(url) {
    return /\.(png|jpe?g|gif|webp|bmp|svg)(?:$|[?#])/i.test(url);
  }

  function getPreviewUrl(rawUrl) {
    const cleanUrl = (rawUrl || "").trim();
    if (!cleanUrl) return "";

    // Hide built-in browser PDF controls when loading PDF files in the modal.
    if (!isPdfUrl(cleanUrl)) return cleanUrl;

    const [base, hashPart] = cleanUrl.split("#");
    const nextHash = hashPart
      ? `${hashPart}&${pdfEmbedParams}`
      : pdfEmbedParams;

    return `${base}#${nextHash}`;
  }

  document.querySelectorAll("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalTitle = btn.getAttribute("data-modal") || "Document";
      const pdfUrl = btn.getAttribute("data-pdf");
      const cleanUrl = (pdfUrl || "").trim();

      title.textContent = modalTitle;
      if (certName) certName.textContent = modalTitle;
      resetImageZoom();

      if (cleanUrl && isPdfUrl(cleanUrl) && pdfFrame) {
        pdfFrame.src = getPreviewUrl(cleanUrl);
        pdfFrame.classList.add("open");
        imageWrap?.classList.remove("open");
        if (previewImage) previewImage.src = "";
        placeholder?.classList.remove("open");
      } else if (cleanUrl && isImageUrl(cleanUrl) && previewImage) {
        previewImage.src = cleanUrl;
        imageWrap?.classList.add("open");
        pdfFrame?.classList.remove("open");
        if (pdfFrame) pdfFrame.src = "";
        placeholder?.classList.remove("open");
      } else {
        pdfFrame?.classList.remove("open");
        if (pdfFrame) pdfFrame.src = "";
        imageWrap?.classList.remove("open");
        if (previewImage) previewImage.src = "";
        placeholder?.classList.add("open");
      }

      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      modalOpenState = true;

      // Push state for back button support
      window.history.pushState({ modal: true }, "");
    });
  });

  function close(fromPopstate = false) {
    overlay.classList.remove("open");
    if (pdfFrame) pdfFrame.src = "";
    imageWrap?.classList.remove("open");
    if (previewImage) previewImage.src = "";
    resetImageZoom();
    document.body.style.overflow = "";
    modalOpenState = false;

    // If user closes manually, consume the modal history entry.
    if (!fromPopstate && window.history.state?.modal) {
      skipNextPopstate = true;
      window.history.back();
    }
  }

  window.addEventListener("popstate", () => {
    if (skipNextPopstate) {
      skipNextPopstate = false;
      return;
    }

    if (modalOpenState) {
      close(true);
    }
  });

  imageWrap?.addEventListener(
    "wheel",
    (e) => {
      if (!imageWrap.classList.contains("open")) return;
      e.preventDefault();
      const step = e.deltaY < 0 ? 0.15 : -0.15;
      setImageScale(imageScale + step);
    },
    { passive: false },
  );

  imageWrap?.addEventListener(
    "touchstart",
    (e) => {
      if (!imageWrap.classList.contains("open")) return;
      if (e.touches.length === 2) {
        pinchStartDistance = getTouchDistance(e.touches[0], e.touches[1]);
        pinchStartScale = imageScale;
      }
    },
    { passive: false },
  );

  imageWrap?.addEventListener(
    "touchmove",
    (e) => {
      if (!imageWrap.classList.contains("open")) return;
      if (e.touches.length === 2 && pinchStartDistance > 0) {
        e.preventDefault();
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const ratio = currentDistance / pinchStartDistance;
        setImageScale(pinchStartScale * ratio);
      }
    },
    { passive: false },
  );

  imageWrap?.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) {
      pinchStartDistance = 0;
      pinchStartScale = imageScale;
    }
  });

  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        const offset = window.innerWidth < 1024 ? 64 : 0;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

/* ============================================================
   PROFILE IMAGE FALLBACK
   ============================================================ */
function initImageFallback() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", function () {
      const fallback = this.getAttribute("data-fallback");
      const parent = this.parentElement;
      if (fallback && parent) {
        parent.innerHTML = fallback;
      }
    });
  });
}

/* ============================================================
   LOADING SCREEN
   ============================================================ */
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const progressText = loader.querySelector(".loader-progress");
  const progressBar = loader.querySelector(".loader-progress-bar");

  // Define critical assets to preload
  const criticalAssets = [
    "./img/IMG_7926.png", // Profile image
    "./img/projects/ToDo_Backend.jpg",
    "./img/projects/React_ToDo.png",
    "./img/projects/StocksApp.png",
  ];

  let loadedCount = 0;
  const totalAssets = criticalAssets.length;
  const timeout = 3000; // 3 second max timeout

  function updateProgress() {
    const percentage = Math.round((loadedCount / totalAssets) * 100);
    progressText.textContent = percentage;
    progressBar.style.width = percentage + "%";
  }

  function fadeOutLoader() {
    loader.classList.add("fadeOut");
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }

  // Track image loading
  criticalAssets.forEach((src) => {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      updateProgress();
      if (loadedCount === totalAssets) {
        fadeOutLoader();
      }
    };
    img.onerror = () => {
      loadedCount++;
      updateProgress();
      if (loadedCount === totalAssets) {
        fadeOutLoader();
      }
    };
    img.src = src;
  });

  // Fallback timeout to ensure loader fades out
  setTimeout(() => {
    if (!loader.classList.contains("fadeOut")) {
      fadeOutLoader();
    }
  }, timeout);

  updateProgress();
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initTheme();
  initMobileNav();
  initActiveNav();
  initTyping();
  initScrollReveal();
  initSkills();
  initTabs();
  initModal();
  initSmoothScroll();
  initImageFallback();
});

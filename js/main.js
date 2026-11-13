/* =========================================================
   Md Moztaba Rafid — Portfolio interactions
   Theme, sheet progress, rails, mobile menu, reveals,
   hero drawing, copy email.
   ========================================================= */

(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const store = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
    }
  };

  /* ---------------------------------------------------------
     Theme
     --------------------------------------------------------- */
  const themeToggle = $("#themeToggle");
  const themeMeta = $('meta[name="theme-color"]');

  const THEME_COLOR = { light: "#ded4c1", dark: "#0a0a08" };

  function syncThemeUI() {
    const isLight = root.getAttribute("data-theme") === "light";

    root.style.colorScheme = isLight ? "light" : "dark";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }

    if (themeMeta) {
      themeMeta.setAttribute("content", isLight ? THEME_COLOR.light : THEME_COLOR.dark);
    }
  }

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    store.set("theme", next);
    syncThemeUI();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
  }

  syncThemeUI();

  // If the visitor has never chosen a theme, follow the system setting.
  const schemeQuery = window.matchMedia("(prefers-color-scheme: light)");
  if (schemeQuery.addEventListener) {
    schemeQuery.addEventListener("change", (event) => {
      if (store.get("theme")) return;
      root.setAttribute("data-theme", event.matches ? "light" : "dark");
      syncThemeUI();
    });
  }

  /* ---------------------------------------------------------
     Sheet progress + active section
     --------------------------------------------------------- */
  const nav = $("#nav");
  const progressBar = $("#progressBar");
  const scrollPct = $("#scrollPct");

  const navLinks = $$("#navLinks a");
  const railLinks = $$("#railIndex a");

  const sectionIds = ["top", "about", "experience", "projects", "skills", "education", "notes", "contact"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let activeId = "";
  let queued = false;

  function paintActive(id) {
    if (!id || id === activeId) return;
    activeId = id;

    navLinks.concat(railLinks).forEach((link) => {
      const match = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", match);
      if (match) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function currentSection() {
    const navH = nav ? nav.getBoundingClientRect().height : 0;
    const line = navH + 46;
    let current = sections.length ? sections[0].id : "";

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    });

    // At the very bottom, the last section must win even if it is short.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      const last = sections[sections.length - 1];
      if (last) current = last.id;
    }

    return current;
  }

  function onScroll() {
    const y = window.scrollY || window.pageYOffset || 0;

    if (nav) nav.classList.toggle("is-stuck", y > 18);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

    if (progressBar) progressBar.style.width = (ratio * 100).toFixed(2) + "%";

    if (scrollPct) {
      scrollPct.textContent = String(Math.round(ratio * 100)).padStart(3, "0") + "%";
    }

    paintActive(currentSection());
    queued = false;
  }

  function requestScrollUpdate() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(onScroll);
  }

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);
  window.addEventListener("load", requestScrollUpdate);

  onScroll();

  /* ---------------------------------------------------------
     Mobile menu
     --------------------------------------------------------- */
  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");
  const menuLinks = mobileMenu ? $$("a", mobileMenu) : [];

  let menuOpen = false;
  let returnFocus = null;

  function menuFocusables() {
    return [burger, themeToggle].concat(menuLinks).filter((el) => el && !el.hasAttribute("inert"));
  }

  function focusFirstInMenu() {
    const first = menuLinks[0];
    if (first) {
      first.focus({ preventScroll: true });
    }
  }

  function openMenu() {
    if (!burger || !mobileMenu || menuOpen) return;
    menuOpen = true;
    returnFocus = document.activeElement;

    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");

    mobileMenu.classList.add("is-open");
    mobileMenu.removeAttribute("inert");
    mobileMenu.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // Wait one frame so visibility has resolved before moving focus.
    window.requestAnimationFrame(() => {
      window.setTimeout(focusFirstInMenu, 60);
    });
  }

  function closeMenu(restoreFocus) {
    if (!burger || !mobileMenu || !menuOpen) return;
    menuOpen = false;

    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");

    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("inert", "");
    mobileMenu.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (restoreFocus && returnFocus && typeof returnFocus.focus === "function") {
      returnFocus.focus({ preventScroll: true });
    }
    returnFocus = null;
  }

  function onMenuKeydown(event) {
    if (!menuOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key !== "Tab") return;

    const items = menuFocusables();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];
    const current = document.activeElement;

    if (!items.includes(current)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && current === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      if (menuOpen) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => closeMenu(false));
    });

    document.addEventListener("keydown", onMenuKeydown);

    const wideQuery = window.matchMedia("(min-width: 1081px)");
    const onWide = (event) => {
      if (event.matches) closeMenu(false);
    };
    if (wideQuery.addEventListener) wideQuery.addEventListener("change", onWide);
    else if (wideQuery.addListener) wideQuery.addListener(onWide);
  }

  /* ---------------------------------------------------------
     Reveal on scroll (staggered within each group)
     --------------------------------------------------------- */
  const revealItems = $$(".reveal");

  const groups = new Map();
  revealItems.forEach((el) => {
    const parent = el.parentElement || document.body;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  groups.forEach((items) => {
    items.forEach((el, index) => {
      el.style.setProperty("--delay", Math.min(index * 70, 350) + "ms");
    });
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-in"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     Hero drawing draws itself in
     --------------------------------------------------------- */
  const drawings = $$(".lfr");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    drawings.forEach((el) => el.classList.add("is-drawn"));
  } else {
    const drawObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-drawn");
          drawObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    drawings.forEach((el) => drawObserver.observe(el));
  }

  /* ---------------------------------------------------------
     Copy email + toast
     --------------------------------------------------------- */
  const toast = $("#toast");
  const copyBtn = $("#copyEmail");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  async function copyText(text) {
    // Modern API first, with a timeout so a stalled permission prompt
    // (common on file:// pages) never blocks the interface.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((resolve, reject) => {
            window.setTimeout(() => reject(new Error("clipboard timeout")), 1200);
          })
        ]);
        return true;
      } catch (e) {
        /* fall through to the legacy path */
      }
    }

    try {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.setAttribute("readonly", "");
      temp.style.position = "fixed";
      temp.style.top = "-1000px";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      temp.setSelectionRange(0, temp.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(temp);
      return ok;
    } catch (e) {
      return false;
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email") || "moztabarafid@gmail.com";
      const ok = await copyText(email);
      showToast(ok ? "Email copied — " + email : "Copy failed. Email: " + email);
    });
  }

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

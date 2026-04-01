/* =================================================
   TAYDIN CONSULTING — Main Script
   ================================================= */

/* ─── Nav: shrink on scroll + mobile toggle ──────── */
(function () {
  var nav    = document.querySelector('nav');
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('nav-menu');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.innerHTML = open ? iconClose() : iconMenu();
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = iconMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = iconMenu();
      }
    });
  }

  function iconMenu() {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }
  function iconClose() {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }
})();

/* ─── Intune accordion ───────────────────────────── */
function toggleItem(el) {
  var wasActive = el.classList.contains('active');
  document.querySelectorAll('.il-item').forEach(function (i) {
    i.classList.remove('active');
  });
  if (!wasActive) el.classList.add('active');
}

/* ─── Scroll-reveal (.a → .s) ────────────────────── */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () {
          e.target.classList.add('s');
        }, i * 50);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.a').forEach(function (el) {
    obs.observe(el);
  });
})();

/* ─── Animated skill bars ────────────────────────── */
(function () {
  var barObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w;
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.bar').forEach(function (b) {
    b.style.width = '0%';
    barObs.observe(b);
  });
})();

/* ─── Language switcher ──────────────────────────── */
(function () {
  var btn = document.getElementById('lang-toggle');
  if (!btn) return;

  var lang = localStorage.getItem('lang') || 'de';
  applyLang(lang);

  btn.addEventListener('click', function () {
    lang = lang === 'de' ? 'en' : 'de';
    localStorage.setItem('lang', lang);
    applyLang(lang);
  });

  function applyLang(l) {
    document.documentElement.lang = l;
    document.documentElement.dataset.lang = l;
    btn.textContent = l === 'de' ? 'EN' : 'DE';
    btn.setAttribute('aria-label', l === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln');

    // Plain text nodes
    document.querySelectorAll('[data-de]').forEach(function (el) {
      el.textContent = l === 'de' ? el.dataset.de : el.dataset.en;
    });

    // Rich HTML nodes (data-de-html / data-en-html)
    document.querySelectorAll('[data-de-html]').forEach(function (el) {
      el.innerHTML = l === 'de' ? el.dataset.deHtml : el.dataset.enHtml;
    });
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // ==================== MOBILE MENU ====================
  const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
  const smallMenu  = document.querySelector('.header__sm-menu');
  const menuLinks  = document.querySelectorAll('.header__sm-menu-link');

  if (hamMenuBtn && smallMenu) {

    // Inject the CSS-animated middle bar (ham-line)
    if (!hamMenuBtn.querySelector('.ham-line')) {
      const midLine = document.createElement('span');
      midLine.className = 'ham-line';
      hamMenuBtn.appendChild(midLine);
    }

    // Inject dim backdrop once
    let backdrop = document.querySelector('.menu-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'menu-backdrop';
      document.body.appendChild(backdrop);
    }

    function openMenu() {
      smallMenu.classList.add('header__sm-menu--active');
      hamMenuBtn.classList.add('is-active');
      backdrop.classList.add('is-active');
      hamMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      smallMenu.classList.remove('header__sm-menu--active');
      hamMenuBtn.classList.remove('is-active');
      backdrop.classList.remove('is-active');
      hamMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      smallMenu.classList.contains('header__sm-menu--active') ? closeMenu() : openMenu();
    });

    menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && smallMenu.classList.contains('header__sm-menu--active')) {
        closeMenu();
        hamMenuBtn.focus();
      }
    });
  }

  // ==================== HEADER SCROLL SHADOW ====================
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ==================== SCROLL TO TOP BUTTON ====================
  const goTopBtn = document.getElementById('goTopBtn');
  if (goTopBtn) {
    window.addEventListener('scroll', function () {
      goTopBtn.classList.toggle('show', window.scrollY > 120);
    }, { passive: true });

    window.scrollToTop = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // ==================== FADE-IN ANIMATIONS ====================
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-up');
  if (fadeEls.length > 0) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(function (el) {
      el.style.opacity = '0';
      if (el.classList.contains('fade-in-up')) el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      obs.observe(el);
    });
  }

  // ==================== COPYRIGHT YEAR ====================
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();
});

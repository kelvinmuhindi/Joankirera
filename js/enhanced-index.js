// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== MOBILE MENU ====================
  const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
  const smallMenu = document.querySelector('.header__sm-menu');
  const hamIcon = document.querySelector('.ham-icon');
  const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link a');
  
  // Only initialize if elements exist
  if (hamMenuBtn && smallMenu && hamIcon) {
    
    // Toggle mobile menu
    hamMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle menu visibility
      const isActive = smallMenu.classList.toggle('header__sm-menu--active');
      
      // Toggle hamburger animation
      hamIcon.classList.toggle('active');
      
      // Update ARIA attribute
      hamMenuBtn.setAttribute('aria-expanded', isActive);
      
      // Prevent body scroll when menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on links
    headerSmallMenuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        smallMenu.classList.remove('header__sm-menu--active');
        hamIcon.classList.remove('active');
        hamMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = smallMenu.contains(event.target);
      const isClickOnHamburger = hamMenuBtn.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnHamburger && smallMenu.classList.contains('header__sm-menu--active')) {
        smallMenu.classList.remove('header__sm-menu--active');
        hamIcon.classList.remove('active');
        hamMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && smallMenu.classList.contains('header__sm-menu--active')) {
        smallMenu.classList.remove('header__sm-menu--active');
        hamIcon.classList.remove('active');
        hamMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
  
  // ==================== SCROLL TO TOP BUTTON ====================
  const goTopBtn = document.getElementById("goTopBtn");
  
  if (goTopBtn) {
    window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        goTopBtn.style.display = "block";
      } else {
        goTopBtn.style.display = "none";
      }
    });
    
    // Make scrollToTop function globally available
    window.scrollToTop = function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  }
  
  // ==================== FADE-IN ANIMATIONS ====================
  const fadeInElements = document.querySelectorAll('.fade-in, .fade-in-up');
  
  if (fadeInElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    fadeInElements.forEach(function(el) {
      el.style.opacity = '0';
      if (el.classList.contains('fade-in-up')) {
        el.style.transform = 'translateY(20px)';
      }
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }
  
  // ==================== COPYRIGHT YEAR ====================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});


document.addEventListener("DOMContentLoaded", () => {
      const linksToUpdate = document.querySelectorAll('a[href*=".html"]');
        linksToUpdate.forEach(link => {
        link.href = link.href.replace(".html", "");
      });

      if (window.location.pathname.endsWith(".html")) {
        const newPath = window.location.pathname.replace(".html", "");
        window.history.replaceState(null, "", newPath);
      }
});
// ==================== AUTOMATIC YEAR UPDATE ====================
// Update copyright year automatically
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// ==================== MOBILE MENU FUNCTIONALITY ====================
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
const smallMenu = document.querySelector('.header__sm-menu');
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu');
const headerHamMenuCloseBtn = document.querySelector('.header__main-ham-menu-close');
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link');

if (hamMenuBtn) {
  hamMenuBtn.addEventListener('click', () => {
    smallMenu.classList.toggle('header__sm-menu--active');
    headerHamMenuBtn.classList.toggle('d-none');
    headerHamMenuCloseBtn.classList.toggle('d-none');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = smallMenu.classList.contains('header__sm-menu--active') ? 'hidden' : '';
  });
}

// Close mobile menu when clicking on a link
headerSmallMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active');
    headerHamMenuBtn.classList.remove('d-none');
    headerHamMenuCloseBtn.classList.add('d-none');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    if (!e.target.closest('.header__sm-menu') && !e.target.closest('.header__main-ham-menu-cont')) {
      smallMenu.classList.remove('header__sm-menu--active');
      headerHamMenuBtn.classList.remove('d-none');
      headerHamMenuCloseBtn.classList.add('d-none');
      document.body.style.overflow = '';
    }
  }
});

// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ==================== SCROLL TO TOP BUTTON ====================
const goTopBtn = document.getElementById('goTopBtn');
let scrollTimeout;

// Show/hide button with debouncing
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  
  scrollTimeout = setTimeout(() => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      if (!goTopBtn.classList.contains('show')) {
        goTopBtn.style.display = 'flex';
        // Small delay to trigger animation
        setTimeout(() => goTopBtn.classList.add('show'), 10);
      }
    } else {
      if (goTopBtn.classList.contains('show')) {
        goTopBtn.classList.remove('show');
        // Hide after animation completes
        setTimeout(() => {
          if (!goTopBtn.classList.contains('show')) {
            goTopBtn.style.display = 'none';
          }
        }, 300);
      }
    }
  }, 100);
});

// Smooth scroll to top with easing
function scrollToTop() {
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  
  if (currentScroll > 0) {
    // Smooth scroll with custom easing - increased speed
    const scrollStep = Math.max(currentScroll / 10, 80);
    
    const scrollInterval = setInterval(() => {
      const current = document.documentElement.scrollTop || document.body.scrollTop;
      
      if (current > 0) {
        window.scrollBy(0, -scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
  }
}

// Add ripple effect on click
if (goTopBtn) {
  goTopBtn.addEventListener('click', function(e) {
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Get click position
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
  });
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in classes
document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
  observer.observe(el);
});

// ==================== LAZY LOADING IMAGES ====================
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ==================== FORM VALIDATION (if contact form exists) ====================
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#ef4444';
        
        // Reset border color on input
        input.addEventListener('input', function() {
          this.style.borderColor = '';
        }, { once: true });
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      alert('Please fill in all required fields.');
    }
  });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
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

// Optimize scroll listeners
const optimizedScrollHandler = debounce(() => {
  // Any additional scroll handling can go here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ==================== ACCESSIBILITY IMPROVEMENTS ====================
// Skip to main content functionality
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-to-main';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
`;

skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ==================== CONSOLE LOG (Development Only) ====================
console.log('%c Joan Kirera Website ', 'background: #9505e3; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
console.log('Website loaded successfully ✓');

// ==================== SERVICE WORKER (Optional - for PWA) ====================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered:', registration))
    //   .catch(error => console.log('SW registration failed:', error));
  });
}

// ==================== ANALYTICS (Add your tracking code) ====================
// Example: Google Analytics, Plausible, etc.
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID');

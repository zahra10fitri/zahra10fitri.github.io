/* ============================================
   PORTFOLIO - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===== Navbar scroll effect =====
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5,5,5,0.8)';
      navbar.style.backdropFilter = 'blur(16px)';
      navbar.style.WebkitBackdropFilter = 'blur(16px)';
      navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.WebkitBackdropFilter = 'none';
      navbar.style.borderBottom = '1px solid transparent';
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ===== Active nav link on scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleActiveLink);

  // ===== Mobile Menu =====
  var menuBtn = document.getElementById('menuBtn');
  var closeMenuBtn = document.getElementById('closeMenuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileLinks = document.querySelectorAll('.mobile-link');

  menuBtn.addEventListener('click', function () {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeMenuBtn.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ===== Scroll Animations (Intersection Observer) =====
  var scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add visible class
        entry.target.classList.add('visible');

        // Animate skill bars inside this element
        var skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(function (bar) {
          bar.style.width = bar.dataset.width;
        });

        // Counter animation
        var counter = entry.target.querySelector('.stat-number[data-count]');
        if (counter && !counter.dataset.counted) {
          counter.dataset.counted = 'true';
          animateCounter(counter);
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    scrollObserver.observe(el);
  });

  // ===== Counter Animation =====
  function animateCounter(element) {
    var target = parseInt(element.dataset.count);
    var current = 0;
    var increment = target / 40;
    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 40);
  }

  // ===== Project Filter =====
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('#projectGrid .project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button styles
      filterBtns.forEach(function (b) {
        b.classList.remove('active', 'text-green-400', 'border', 'border-green-500/30');
        b.classList.add('text-neutral-400');
      });
      btn.classList.add('active', 'text-green-400', 'border', 'border-green-500/30');
      btn.classList.remove('text-neutral-400');

      var filter = btn.dataset.filter;

      projectCards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          // Show card with animation
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(function () {
            card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          // Hide card with animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function () {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ===== Contact Form =====
  var contactForm = document.getElementById('contactForm');
  var toast = document.getElementById('toast');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast();
    contactForm.reset();
  });

  function showToast() {
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 3500);
  }

  // ===== Smooth scroll for all anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
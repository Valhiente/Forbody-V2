// ========================================
// FORBODY V2 - JAVASCRIPT INTERACTIONS
// ========================================

// ========================================
// 1. NAVIGATION & HEADER
// ========================================

const header = document.getElementById('header');
const navTabs = document.querySelectorAll('.nav-tab');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Update active nav tab on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navTabs.forEach(tab => {
    tab.classList.remove('active', 'text-forbody-red', 'bg-forbody-red/20');
    if (tab.getAttribute('href') === `#${current}`) {
      tab.classList.add('active', 'text-forbody-red', 'bg-forbody-red/20');
    }
  });
  
  // Header shadow on scroll
  if (window.pageYOffset > 50) {
    header.style.boxShadow = '0 10px 30px rgba(227, 6, 19, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// ========================================
// 2. REVEAL ON SCROLL
// ========================================

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: Stop observing after animation
      // observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

reveals.forEach(reveal => {
  observer.observe(reveal);
});

// ========================================
// 3. FAQ ACCORDION
// ========================================

const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const item = toggle.parentElement;
    const content = item.querySelector('.faq-content');
    const isOpen = !content.classList.contains('hidden');
    
    // Close all others
    document.querySelectorAll('.faq-content').forEach(c => {
      c.classList.add('hidden');
    });
    
    // Toggle icon
    document.querySelectorAll('.faq-toggle i').forEach(icon => {
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    });
    
    // Open selected
    if (!isOpen) {
      content.classList.remove('hidden');
      toggle.querySelector('i').classList.remove('fa-plus');
      toggle.querySelector('i').classList.add('fa-minus');
    }
  });
});

// ========================================
// 4. FORM SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('formName').value,
    email: document.getElementById('formEmail').value,
    phone: document.getElementById('formPhone').value,
    message: document.getElementById('formMessage').value
  };
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="loading"></div>';
  formStatus.textContent = 'Enviando...';
  formStatus.className = 'text-sm text-center text-forbody-silver';
  
  try {
    // Simulate API call (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success response
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!';
    submitBtn.classList.add('bg-green-600');
    formStatus.textContent = 'Obrigado! Nossa equipe entrará em contato em breve.';
    formStatus.className = 'text-sm text-center text-green-400 font-medium';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3s
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Enviar Consulta</span><i class="fas fa-paper-plane"></i>';
      submitBtn.classList.remove('bg-green-600');
      submitBtn.disabled = false;
      formStatus.textContent = '';
    }, 3000);
    
  } catch (error) {
    // Error response
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-times"></i> Erro ao enviar';
    submitBtn.classList.add('bg-red-600');
    formStatus.textContent = 'Erro ao enviar. Tente novamente.';
    formStatus.className = 'text-sm text-center text-red-400';
    
    // Reset button after 3s
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Enviar Consulta</span><i class="fas fa-paper-plane"></i>';
      submitBtn.classList.remove('bg-red-600');
      submitBtn.disabled = false;
    }, 3000);
  }
});

// ========================================
// 5. CTA BUTTONS
// ========================================

const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Scroll to contact form
    const footer = document.getElementById('footer');
    footer.scrollIntoView({ behavior: 'smooth' });
  });
});

// ========================================
// 6. SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ========================================
// 7. PERFORMANCE OPTIMIZATIONS
// ========================================

// Lazy load images (if added in future)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// 8. CONSOLE EASTER EGG
// ========================================

console.log('%c🏋️ Forbody V2 - Premium Fitness Franchise', 'color: #E30613; font-size: 20px; font-weight: bold;');
console.log('%cHighest Performance. Premium Experience.', 'color: #C0C0C0; font-size: 14px;');
console.log('%cTecnologia & Inovação 360º', 'color: #F5F5F5; font-size: 12px;');

// ========================================
// 9. ANALYTICS & TRACKING (Ready for integration)
// ========================================

// Track section views
const trackSectionView = (sectionId) => {
  console.log(`[Analytics] Section viewed: ${sectionId}`);
  // Replace with actual analytics code (Google Analytics, Mixpanel, etc.)
};

// Track form submission
const trackFormSubmit = () => {
  console.log('[Analytics] Form submitted');
  // Replace with actual analytics code
};

// Track CTA clicks
const trackCTAClick = (buttonText) => {
  console.log(`[Analytics] CTA clicked: ${buttonText}`);
  // Replace with actual analytics code
};

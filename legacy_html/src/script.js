// ========================================
// FORBODY V2 - PREMIUM INTERACTIONS
// ========================================

// 1. INITIALIZE AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
  });
  
  // Call dynamic data fetcher
  fetchTestimonials();
});

// 2. HEADER & NAVIGATION
const header = document.getElementById('header');
const navTabs = document.querySelectorAll('.nav-tab');

window.addEventListener('scroll', () => {
  // Sticky header effect
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Active tab spy
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
    tab.classList.remove('text-white', 'bg-white/5');
    tab.classList.add('text-forbody-silver');
    if (tab.getAttribute('href') === `#${current}`) {
      tab.classList.remove('text-forbody-silver');
      tab.classList.add('text-white', 'bg-white/5');
    }
  });
});

// 3. MOBILE MENU
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileMenu() {
  const isOpen = mobileMenu.style.opacity === '1';
  if (isOpen) {
    mobileMenu.style.opacity = '0';
    mobileMenu.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  } else {
    mobileMenu.style.opacity = '1';
    mobileMenu.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMobileMenu));

// 4. ANIMATED COUNTERS (Resultados)
const counters = document.querySelectorAll('.stat-counter');
let hasAnimated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // ms
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
};

// Intersection Observer for counters
const statsSection = document.getElementById('resultados');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      animateCounters();
      hasAnimated = true;
    }
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}

// 5. SMOOTH SCROLL
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

// 6. FIREBASE DYNAMIC CONTENT SIMULATION (Placeholder)
// In a real scenario, this would import Firebase SDK and fetch from Firestore.
async function fetchTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  try {
    // Simulate network delay for Firebase fetch
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Fallback/Default data (simulate what Firestore would return)
    const testimonials = [
      {
        id: 1,
        name: "Marcos Silva",
        time: "Aluno há 1 ano",
        text: "Nunca consegui manter a rotina de treinos até conhecer a Forbody. O ambiente premium e os professores mudaram minha perspectiva.",
        initial: "M"
      },
      {
        id: 2,
        name: "Carla Mendes",
        time: "Aluna há 6 meses",
        text: "O app integrado faz toda a diferença. Consigo ver minha evolução de cargas e me sinto muito mais motivada a não faltar.",
        initial: "C"
      },
      {
        id: 3,
        name: "Roberto Almeida",
        time: "Aluno há 2 anos",
        text: "Estrutura impecável. As aulas coletivas inclusas são excelentes e o maquinário é top de linha. Vale cada centavo do investimento.",
        initial: "R"
      }
    ];

    container.innerHTML = ''; // Clear loader

    testimonials.forEach((item, index) => {
      // Create element dynamically
      const delay = index * 100;
      const html = `
        <div data-aos="fade-up" data-aos-delay="${delay}" class="premium-card p-8 flex flex-col justify-between h-full">
          <div>
            <div class="flex text-forbody-red mb-4 text-sm">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p class="text-forbody-silver italic mb-6 leading-relaxed">"${item.text}"</p>
          </div>
          <div class="flex items-center gap-4 mt-auto">
            <div class="w-12 h-12 bg-gradient-to-br from-forbody-red to-red-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              ${item.initial}
            </div>
            <div>
              <h4 class="text-white font-bold text-sm">${item.name}</h4>
              <p class="text-forbody-silver text-xs">${item.time}</p>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', html);
    });

  } catch (error) {
    console.error("Error fetching testimonials:", error);
    container.innerHTML = `<p class="text-red-500 text-center col-span-full">Erro ao carregar depoimentos.</p>`;
  }
}

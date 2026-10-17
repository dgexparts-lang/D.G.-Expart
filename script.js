// 1. PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2000);
});

// 2. CUSTOM CURSOR (SINGLE DOT WITH COLOR CHANGE)
const cursorDot = document.getElementById('cursorDot');

window.addEventListener('mousemove', (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
});

// Color-changing hover effect
document.querySelectorAll('a, button, .stack-card, .faq-stack-card, .testimonial-card, .why-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hover');
    
    // Dynamic color based on the element
    if (el.classList.contains('btn-gold') || el.classList.contains('why-card')) {
      cursorDot.style.background = 'var(--accent-blue)';
    } else if (el.classList.contains('btn-outline') || el.classList.contains('contact-item')) {
      cursorDot.style.background = 'var(--accent-gold)';
    } else if (el.classList.contains('stack-card')) {
      cursorDot.style.background = 'var(--accent-gold)';
    } else if (el.classList.contains('faq-stack-card')) {
      cursorDot.style.background = 'var(--accent-blue)';
    } else {
      cursorDot.style.background = 'var(--accent-blue)';
    }
  });
  
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hover');
    cursorDot.style.background = 'var(--accent-gold)';
  });
});

// 3. HEADER SCROLL
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// 4. SCROLL REVEAL
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, observerOptions);
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// 5. COUNTER
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current) + (target === 98 ? '%' : (target === 3 ? 'x' : '+'));
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + (target === 98 ? '%' : (target === 3 ? 'x' : '+'));
        }
      };
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// 6. DYNAMIC COLORS
const colorStops = [
  { scroll: 0,    bg: '#ffffff', text: '#0a0e17', card: 'rgba(0,0,0,0.03)', border: 'rgba(0,0,0,0.08)' },
  { scroll: 15,   bg: '#0a0e17', text: '#ffffff', card: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
  { scroll: 30,   bg: '#064e3b', text: '#ffffff', card: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
  { scroll: 45,   bg: '#7f1d1d', text: '#ffffff', card: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
  { scroll: 60,   bg: '#fef3c7', text: '#0a0e17', card: 'rgba(0,0,0,0.03)', border: 'rgba(0,0,0,0.08)' },
  { scroll: 75,   bg: '#831843', text: '#ffffff', card: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
  { scroll: 90,   bg: '#78350f', text: '#ffffff', card: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' }
];
let currentColorIndex = 0;
function updateColors() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  let targetIndex = 0;
  for (let i = 0; i < colorStops.length; i++) {
    if (scrollPercent >= colorStops[i].scroll) targetIndex = i;
  }
  if (targetIndex !== currentColorIndex) {
    currentColorIndex = targetIndex;
    const stop = colorStops[targetIndex];
    document.documentElement.style.setProperty('--bg-color', stop.bg);
    document.documentElement.style.setProperty('--text-color', stop.text);
    document.documentElement.style.setProperty('--card-bg', stop.card);
    document.documentElement.style.setProperty('--card-border', stop.border);
    const isDark = (targetIndex === 0 || targetIndex === 4);
    if (isDark) {
      header.classList.remove('dark-mode');
      document.getElementById('bottomNav').classList.remove('dark-mode');
    } else {
      header.classList.add('dark-mode');
      document.getElementById('bottomNav').classList.add('dark-mode');
    }
  }
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateColors();
      ticking = false;
    });
    ticking = true;
  }
});
updateColors();

// 7. TILT
document.querySelectorAll('.testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// 8. MAGNETIC
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// 9. STACKED CARDS
const stackCards = document.querySelectorAll('.stack-card');
const faqStackCards = document.querySelectorAll('.faq-stack-card');
window.addEventListener('scroll', () => {
  stackCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= 120) {
      card.style.transform = `scale(${1 - (index * 0.03)})`;
      card.style.opacity = 1 - (index * 0.05);
    } else {
      card.style.transform = 'scale(1)';
      card.style.opacity = 1;
    }
  });
  faqStackCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= 140) {
      card.style.transform = `scale(${1 - (index * 0.04)})`;
      card.style.opacity = 1 - (index * 0.08);
    } else {
      card.style.transform = 'scale(1)';
      card.style.opacity = 1;
    }
  });
});

// 10. MOBILE BOTTOM NAV ACTIVE
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.bottom-nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
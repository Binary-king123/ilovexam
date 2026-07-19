// =================== Smooth Scroll for Anchor Links ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// =================== Fade-In Animation on Scroll ===================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .timeline-item, .stat-item').forEach(el => {
  observer.observe(el);
});

// =================== Animated Stats Counter ===================
function animateCounter(el, target) {
  let count = 0;
  const increment = Math.ceil(target / 100);
  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.innerText = count.toLocaleString();
  }, 20);
}

document.querySelectorAll('[data-count]').forEach(el => {
  const target = +el.getAttribute('data-count');
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounter(el, target);
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(el);
});

// =================== Dummy Newsletter Form Handling ===================
const form = document.querySelector('.signup-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input').value;
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    alert('🎉 Thank you for subscribing! Our team will contact you soon.');
    form.reset();
  });
}

// =================== Lazy Load Images ===================
document.querySelectorAll('img[data-src]').forEach(img => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.disconnect();
    }
  });
  observer.observe(img);
});

// =================== Mobile Menu (Optional for SaaS Look) ===================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

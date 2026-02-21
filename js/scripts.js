// ── Scroll reveal (progressive enhancement — items visible by default)
const animItems = document.querySelectorAll('.timeline-item, .pub-card');

// Only apply hide-then-reveal if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
  animItems.forEach(el => el.classList.add('animate-hidden'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.remove('animate-hidden');
          entry.target.classList.add('visible');
        }, i * 120);
      }
    });
  }, { threshold: 0.1 });

  animItems.forEach(el => observer.observe(el));
}

// ── Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

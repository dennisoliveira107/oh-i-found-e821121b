document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const waBtn = document.getElementById('whatsapp-flutuante');
  const scrollThreshold = 40;
  const waThreshold = 420;
  let lastY = 0;
  let ticking = false;

  function updateScroll() {
    const y = window.scrollY;
    if (Math.abs(y - lastY) > 5) {
      if (navbar) navbar.classList.toggle('scrolled', y > scrollThreshold);
      if (waBtn) waBtn.classList.toggle('wa-visivel', y > waThreshold);
      lastY = y;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  // Mobile Menu
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu-mobile');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isHidden = menu.classList.toggle('hidden');
      btn.classList.toggle('open');
      document.body.classList.toggle('menu-aberto', !isHidden);
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        btn.classList.remove('open');
        document.body.classList.remove('menu-aberto');
      });
    });
  }

  // Optimized Counter Animation
  if ('IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target);
          if (isNaN(target)) return;
          let current = 0;
          const duration = 1500;
          const start = performance.now();
          
          function animate(time) {
            const progress = Math.min((time - start) / duration, 1);
            current = Math.floor(progress * target);
            el.textContent = '+' + current.toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = '+' + target.toLocaleString('pt-BR');
          }
          requestAnimationFrame(animate);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));
  }

  // Optimized Fade-in
  if ('IntersectionObserver' in window) {
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          fadeObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section, h2, h3, .card-servico, .card-feature, .card-depo, .num-card').forEach(el => {
      el.classList.add('fade-in-on-scroll');
      fadeObs.observe(el);
    });
  }

  // Accordion
  document.querySelectorAll('.faq-wrap, .causas-acordeao').forEach(group => {
    const isFAQ = group.classList.contains('faq-wrap');
    const itemSel = isFAQ ? '.faq-item' : '.causa-item';
    const btnSel = isFAQ ? '.faq-btn' : '.causa-btn';
    const contentSel = isFAQ ? '.faq-content' : '.causa-content';
    const signSel = isFAQ ? '.sign' : '.causa-sign';
    
    group.querySelectorAll(itemSel).forEach(item => {
      const btn = item.querySelector(btnSel);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        group.querySelectorAll(itemSel).forEach(i => {
          i.classList.remove('is-open');
          const c = i.querySelector(contentSel);
          if (c) c.style.maxHeight = null;
          const s = i.querySelector(signSel);
          if (s) s.textContent = '+';
        });
        if (!isOpen) {
          item.classList.add('is-open');
          const c = item.querySelector(contentSel);
          if (c) c.style.maxHeight = c.scrollHeight + 'px';
          const s = item.querySelector(signSel);
          if (s) s.textContent = isFAQ ? '−' : '−';
        }
      });
    });
  });
});

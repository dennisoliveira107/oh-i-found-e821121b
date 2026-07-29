
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  var navbar = document.getElementById('navbar');
  var waBtn = document.getElementById('whatsapp-flutuante');
  // Unified scroll handler batched with requestAnimationFrame to avoid forced reflow
  var scrollTicking = false;
  function onScrollFrame(){
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (waBtn) waBtn.classList.toggle('wa-visivel', y > 420);
    scrollTicking = false;
  }
  window.addEventListener('scroll', function(){
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScrollFrame); }
  }, {passive:true});
  onScrollFrame();

  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu-mobile');
  if (btn && menu) {
    btn.addEventListener('click', function() {
      menu.classList.toggle('hidden');
      btn.classList.toggle('open');
      document.body.classList.toggle('menu-aberto', !menu.classList.contains('hidden'));
    });
    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        menu.classList.add('hidden');
        btn.classList.remove('open');
        document.body.classList.remove('menu-aberto');
      });
    });
  }
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          var el = e.target, target = parseInt(el.dataset.target), cur = 0, step = target/60;
          var t = setInterval(function(){
            cur += step;
            if (cur >= target) { el.textContent = '+' + target.toLocaleString('pt-BR'); clearInterval(t); }
            else el.textContent = '+' + Math.floor(cur).toLocaleString('pt-BR');
          }, 16);
          obs.unobserve(el);
        }
      });
    });
    document.querySelectorAll('[data-target]').forEach(function(el){ obs.observe(el); });
  }
});

// Fade-in ao scroll
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    var fadeObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in-view'); fadeObs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    // Auto-aplicar em seções e títulos
    document.querySelectorAll('.section, h2, h3, .card-servico, .card-feature, .card-depo, .num-card').forEach(function(el){
      el.classList.add('fade-in-on-scroll');
      fadeObs.observe(el);
    });
  }
});

/* ===== EFEITOS INTERATIVOS PREMIUM ===== */
document.addEventListener('DOMContentLoaded', function() {
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Barra de progresso de leitura (topo da pagina)
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  var barTicking = false;
  function updateBar(){
    var h = document.documentElement;
    var denom = h.scrollHeight - h.clientHeight;
    var scrolled = denom > 0 ? h.scrollTop / denom : 0;
    bar.style.transform = 'scaleX(' + scrolled + ')';
    barTicking = false;
  }
  window.addEventListener('scroll', function(){
    if (!barTicking) { barTicking = true; requestAnimationFrame(updateBar); }
  }, {passive:true});
  updateBar();

  // 2) Efeito 3D (tilt) nos cards seguindo o mouse — só desktop, sem reduzir movimento
  if (!reduz && window.matchMedia('(hover:hover) and (min-width:1024px)').matches) {
    var tiltCards = document.querySelectorAll('.card-servico, .pq-card, .num-card, .estrutura-card, .step-card');
    tiltCards.forEach(function(card){
      card.classList.add('tilt');
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateX(' + (-py*5).toFixed(2) + 'deg) rotateY(' + (px*5).toFixed(2) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = '';
      });
    });
  }

  // 3) Brilho que segue o cursor dentro dos cards (spotlight sutil)
  if (!reduz && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.card-servico, .pq-card').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }
});

// Acordeao (FAQ / causas) — substitui Alpine.js por JS puro, sem dependencia externa
document.addEventListener('DOMContentLoaded', function() {
  function initAccordionGroup(group, itemSel, btnSel, contentSel, signSel){
    var items = group.querySelectorAll(itemSel);
    items.forEach(function(item){
      var btn = item.querySelector(btnSel);
      var content = item.querySelector(contentSel);
      var sign = item.querySelector(signSel);
      if (!btn || !content) return;
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function(){
        var isOpen = item.classList.contains('is-open');
        items.forEach(function(other){
          other.classList.remove('is-open');
          other.querySelector(contentSel).style.maxHeight = '';
          var otherBtn = other.querySelector(btnSel);
          var otherSign = other.querySelector(signSel);
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherSign) otherSign.textContent = '+';
        });
        if (!isOpen) {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
          if (sign) sign.textContent = '−';
        }
      });
    });
  }
  document.querySelectorAll('.faq-wrap').forEach(function(group){
    initAccordionGroup(group, '.faq-item', '.faq-btn', '.faq-content', '.sign');
  });
  document.querySelectorAll('.causas-acordeao').forEach(function(group){
    initAccordionGroup(group, '.causa-item', '.causa-btn', '.causa-content', '.causa-sign');
  });
});

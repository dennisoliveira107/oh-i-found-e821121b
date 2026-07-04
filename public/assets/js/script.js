
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function(){
      if (window.scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }, {passive:true});
  }

  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu-mobile');
  if (btn && menu) {
    btn.addEventListener('click', function() {
      menu.classList.toggle('hidden');
      btn.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        menu.classList.add('hidden');
        btn.classList.remove('open');
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
  // FAQ accordion
  document.querySelectorAll('.faq-item .faq-question, details.faq-item summary').forEach(function(q){
    q.addEventListener('click', function(ev){
      var item = q.closest('.faq-item');
      if (item) { ev.preventDefault(); item.classList.toggle('active'); }
    });
  });
});

/* ===== EFEITOS INTERATIVOS PREMIUM ===== */
document.addEventListener('DOMContentLoaded', function() {
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Barra de progresso de leitura (topo da pagina)
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  function updateBar(){
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    bar.style.transform = 'scaleX(' + (scrolled || 0) + ')';
  }
  window.addEventListener('scroll', updateBar, {passive:true});
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


document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

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

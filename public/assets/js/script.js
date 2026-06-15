
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('menu-btn');
  if (btn) btn.addEventListener('click', function() {
    document.getElementById('menu-mobile').classList.toggle('hidden');
  });
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

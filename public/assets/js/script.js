
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

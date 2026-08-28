function openBooking(){document.getElementById('bookingModal').classList.add('open');document.body.style.overflow='hidden';}
function closeBooking(){document.getElementById('bookingModal').classList.remove('open');document.body.style.overflow='';}
document.addEventListener('click', function(e){
  if(e.target.matches('[data-book]')){ e.preventDefault(); openBooking(); }
});
// hero rotating headline (used on homepage)
document.addEventListener('DOMContentLoaded', function(){
  var texts = document.querySelectorAll('.slide-text');
  var dots = document.querySelectorAll('.hero-dots button');
  if(texts.length){
    var i = 0;
    function show(n){
      texts.forEach(function(t){t.classList.remove('active');});
      dots.forEach(function(d){d.classList.remove('active');});
      texts[n].classList.add('active'); if(dots[n]) dots[n].classList.add('active');
      i = n;
    }
    dots.forEach(function(d,idx){ d.addEventListener('click', function(){ show(idx); }); });
    setInterval(function(){ show((i+1)%texts.length); }, 5000);
  }
  // gallery filter
  var filterBtns = document.querySelectorAll('.filter-bar button');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      var cat = btn.dataset.filter;
      document.querySelectorAll('.masonry .item').forEach(function(it){
        it.style.display = (cat==='all' || it.dataset.cat===cat) ? '' : 'none';
      });
    });
  });
  // mobile nav menu (hamburger) — button previously did nothing
  var header = document.querySelector('header.main-nav');
  var toggle = document.querySelector('.nav-toggle');
  if(header && toggle){
    function closeMenu(){
      header.classList.remove('nav-open');
      toggle.innerHTML = '&#9776;';
      document.body.classList.remove('nav-lock');
    }
    toggle.addEventListener('click', function(){
      var open = header.classList.toggle('nav-open');
      toggle.innerHTML = open ? '&times;' : '&#9776;';
      document.body.classList.toggle('nav-lock', open);
    });
    // hover dropdowns don't work on touch — make them tap-to-expand on mobile
    document.querySelectorAll('.has-dd > .dd-trigger').forEach(function(trigger){
      trigger.addEventListener('click', function(e){
        if(window.innerWidth > 980) return;
        e.preventDefault();
        trigger.parentElement.classList.toggle('open');
      });
    });
    // tapping an actual link closes the menu
    document.querySelectorAll('nav.links > a, nav.links .dd-menu a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
  }
  // sticky booking bar (home)
  var bar = document.getElementById('bookingBar');
  var wrap = document.querySelector('.booking-bar-wrap');
  if(bar && wrap){
    window.addEventListener('scroll', function(){
      var trigger = wrap.getBoundingClientRect().top;
      if(trigger < 73){ bar.classList.add('is-stuck'); } else { bar.classList.remove('is-stuck'); }
    });
  }
});

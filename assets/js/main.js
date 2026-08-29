function openBooking(){document.getElementById('bookingModal').classList.add('open');document.body.style.overflow='hidden';}
function closeBooking(){document.getElementById('bookingModal').classList.remove('open');document.body.style.overflow='';}
function openMenuGallery(){document.getElementById('menuGalleryModal').classList.add('open');document.body.style.overflow='hidden';}
function closeMenuGallery(){document.getElementById('menuGalleryModal').classList.remove('open');document.body.style.overflow='';}

function submitBooking(form){
  var d = new FormData(form);
  var lines = [
    "Hi, I'd like to book a room at J's Signature Hotel.",
    "",
    "Room Type: " + d.get('roomType'),
    "Rooms: " + d.get('rooms') + " | Adults: " + d.get('adults') + " | Children: " + d.get('children'),
    "Check-in: " + d.get('checkin') + " | Check-out: " + d.get('checkout'),
    "Name: " + d.get('fullName'),
    "Email: " + d.get('email'),
    "Mobile: " + d.get('mobile')
  ];
  if(d.get('message')){ lines.push("Message: " + d.get('message')); }
  var text = encodeURIComponent(lines.join("\n"));
  window.open("https://wa.me/2347026680025?text=" + text, "_blank");
  closeBooking();
  return false;
}
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
  // close (X) button on interior pages — every subpage has .page-hero, home uses .hero instead
  var pageHero = document.querySelector('.page-hero');
  if(pageHero){
    var thisScript = document.querySelector('script[src*="main.js"]');
    var prefix = (thisScript && thisScript.getAttribute('src').indexOf('../') === 0) ? '../' : '';
    var closeBtn = document.createElement('a');
    closeBtn.href = prefix + 'index.html';
    closeBtn.className = 'page-close';
    closeBtn.setAttribute('aria-label','Close');
    closeBtn.innerHTML = '&times;';
    pageHero.appendChild(closeBtn);
  }
  // sticky booking bar (home) — pins to the top of the viewport once the hero scrolls past
  var bar = document.getElementById('bookingBar');
  var wrap = document.querySelector('.booking-bar-wrap');
  if(bar && wrap){
    var stuckHeight = 0;
    window.addEventListener('scroll', function(){
      var trigger = wrap.getBoundingClientRect().top;
      var stuck = bar.classList.contains('is-stuck');
      if(trigger < 105 && !stuck){
        stuckHeight = bar.offsetHeight; // capture height before it leaves normal flow
        wrap.style.height = stuckHeight + 'px';
        bar.classList.add('is-stuck');
      } else if(trigger >= 105 && stuck){
        bar.classList.remove('is-stuck');
        wrap.style.height = '';
      }
    }, {passive:true});
  }
});

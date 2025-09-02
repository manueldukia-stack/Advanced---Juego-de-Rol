// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  /* NAV - cambiar fondo cuando scrollea */
  const topbar = document.querySelector('.topbar');
  const hero = document.querySelector('.hero');

  function onScroll(){
    if(window.scrollY > 40) topbar.classList.add('scrolled');
    else topbar.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* SMOOTH SCROLL para enlaces de menú (si usás <a href="#id">...) */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* HIGHLIGHT del índice / menú usando IntersectionObserver */
  const sections = document.querySelectorAll('main, section, article, .container > *');
  const menuLinks = document.querySelectorAll('.topbar nav a, .toc a');

  const idToLink = {};
  menuLinks.forEach(l => {
    const href = l.getAttribute('href');
    if(href && href.startsWith('#')) idToLink[href.slice(1)] = l;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      const id = ent.target.id;
      if(!id) return;
      const link = idToLink[id];
      if(!link) return;
      if(ent.isIntersecting){
        link.style.opacity = '1';
        link.style.fontWeight = '700';
      } else {
        link.style.opacity = '.9';
        link.style.fontWeight = '600';
      }
    });
  }, { threshold: 0.12 });

  // Observa solo secciones con id
  document.querySelectorAll('section[id], article[id]').forEach(s => observer.observe(s));

  /* ACORDEONES: animación suave de <details> si los usás */
  document.querySelectorAll('details').forEach(d => {
    const body = d.querySelector('.rule-body');
    if(!body) return;
    body.style.overflow = 'hidden';
    body.style.transition = 'max-height .26s ease, padding .18s ease';
    // inicial
    if(d.open){
      body.style.maxHeight = body.scrollHeight + 'px';
      body.style.paddingTop = '12px';
    } else {
      body.style.maxHeight = '0px';
      body.style.paddingTop = '0px';
    }
    d.addEventListener('toggle', () => {
      if(d.open){
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.paddingTop = '12px';
      } else {
        body.style.maxHeight = '0px';
        body.style.paddingTop = '0px';
      }
    });
  });

  /* Si querés: botón 'abrir todo' / 'cerrar todo' (buscale por id en tu HTML) */
  const expandBtn = document.getElementById('expand');
  const collapseBtn = document.getElementById('collapse');
  if(expandBtn && collapseBtn){
    expandBtn.addEventListener('click', ()=> document.querySelectorAll('details').forEach(d=> d.open = true));
    collapseBtn.addEventListener('click', ()=> document.querySelectorAll('details').forEach(d=> d.open = false));
  }
});

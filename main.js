/* main.js */
'use strict';

// ── PROGRESSIVE ENHANCEMENT
document.body.classList.add('js-loaded');

// ── THEME
function updateThemeIcon(){
  const t=document.documentElement.getAttribute('data-theme')||'dark';
  document.querySelectorAll('.theme-toggle').forEach(b=>{b.textContent=t==='dark'?'☀️':'🌙';b.setAttribute('aria-label',t==='dark'?'Switch to light':'Switch to dark');});
}
function toggleTheme(){
  const c=document.documentElement.getAttribute('data-theme')||'dark',n=c==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',n);localStorage.setItem('mk-theme',n);updateThemeIcon();
}
(function(){const s=localStorage.getItem('mk-theme');if(s)document.documentElement.setAttribute('data-theme',s);updateThemeIcon();})();

// ── HAMBURGER
(function(){
  const h=document.querySelector('.nav-ham'),m=document.querySelector('.mobile-menu');
  if(!h||!m)return;
  h.addEventListener('click',function(){
    const o=this.classList.toggle('open');
    m.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';
  });
  m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('open');m.classList.remove('open');document.body.style.overflow='';}));
})();

// ── ACTIVE NAV
(function(){
  const p=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(a=>{
    const h=(a.getAttribute('href')||'').split('#')[0];
    if(h===p||(p===''&&h==='index.html'))a.classList.add('active');
  });
})();

// ── STICKY NAV
(function(){
  const nav=document.querySelector('nav');
  if(!nav)return;
  window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>20);},{passive:true});
})();

// ── READING PROGRESS BAR
(function(){
  const bar=document.querySelector('.reading-progress');
  if(!bar)return;
  window.addEventListener('scroll',()=>{
    const h=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.width=(h>0?(window.scrollY/h*100):0)+'%';
  },{passive:true});
})();

// ── BACK TO TOP
(function(){
  const btn=document.querySelector('.back-top');
  if(!btn)return;
  window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>400),{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

// ── SCROLL REVEALS
const revObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('reveal-left'))e.target.classList.add('in-left');}}),{threshold:0.07,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el=>revObs.observe(el));

// ── SKILL BARS
const barObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:0.3});
document.querySelectorAll('.sbar').forEach(el=>barObs.observe(el));

// ── ANIMATED COUNTERS
function animateCounter(el){
  const target=parseInt(el.dataset.target||el.textContent)||0;
  const suffix=el.dataset.suffix||'';const duration=1800;
  let start=null;
  function step(ts){
    if(!start)start=ts;
    const p=Math.min((ts-start)/duration,1);
    const ease=1-Math.pow(1-p,3);
    el.textContent=Math.round(ease*target)+suffix;
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const cntObs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting&&!e.target.dataset.animated){e.target.dataset.animated='1';animateCounter(e.target);}
}),{threshold:.5});
document.querySelectorAll('.counter').forEach(el=>cntObs.observe(el));

// ── MODALS
function openModal(id){const m=document.getElementById(id);if(m){m.classList.add('open');document.body.style.overflow='hidden';}}
function closeModal(id){const m=document.getElementById(id);if(m){m.classList.remove('open');document.body.style.overflow='';}}
document.addEventListener('click',e=>{if(e.target.classList.contains('modal-bg')){e.target.classList.remove('open');document.body.style.overflow='';}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal-bg.open').forEach(m=>{m.classList.remove('open');document.body.style.overflow='';});});

// ── WCAG PANEL
function toggleWcag(){document.getElementById('wcag-panel')?.classList.toggle('open');}
document.addEventListener('click',e=>{
  const p=document.getElementById('wcag-panel');
  if(p?.classList.contains('open')&&!p.contains(e.target)&&!e.target.closest('.wcag-badge'))p.classList.remove('open');
});

// ── DRAG TO SCROLL (for horizontal scroll containers)
document.querySelectorAll('[data-drag-scroll]').forEach(el=>{
  let d=false,sx,sl;
  el.addEventListener('mousedown',e=>{d=true;sx=e.pageX-el.offsetLeft;sl=el.scrollLeft;el.style.cursor='grabbing';});
  el.addEventListener('mouseleave',()=>{d=false;el.style.cursor='grab';});
  el.addEventListener('mouseup',()=>{d=false;el.style.cursor='grab';});
  el.addEventListener('mousemove',e=>{if(!d)return;e.preventDefault();el.scrollLeft=sl-(e.pageX-el.offsetLeft-sx)*1.2;});
});

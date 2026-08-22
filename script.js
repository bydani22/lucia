/* --- Side falling hearts (laterales) --- */
function spawnSideHeart(containerId){const container=document.getElementById(containerId);if(!container)return;const h=document.createElement('span');h.className='side-heart';h.textContent=['♡','♥','✦'][Math.floor(Math.random()*3)];const startX = 10 + Math.random()*60; h.style.left = startX + '%'; h.style.top = (-10 - Math.random()*8) + 'vh'; h.style.fontSize = (14 + Math.random()*22) + 'px'; h.style.opacity = 0.95; container.appendChild(h);
	const duration = 4000 + Math.random()*4500; const wobble = (Math.random()-.5)*80;
	h.animate([
		{transform:`translateY(0) translateX(0) rotate(${Math.random()*40-20}deg)`,opacity:1},
		{transform:`translateY(${110 + Math.random()*40}vh) translateX(${wobble}px) rotate(${Math.random()*720}deg)`,opacity:0}
	],{duration:duration,iterations:1,easing:'cubic-bezier(.2,.8,.2,1)'}).finished.then(()=>h.remove());
}

// start spawning hearts on both sides
setInterval(()=>spawnSideHeart('leftHearts'),700);
setInterval(()=>spawnSideHeart('rightHearts'),900);

/* --- Glitter canvas --- */
function startGlitter(){const canvas=document.getElementById('glitterCanvas');if(!canvas)return;const ctx=canvas.getContext('2d');let w=canvas.width=innerWidth;let h=canvas.height=innerHeight;let particles=[];const count = Math.max(60, Math.floor((w*h)/12000));
function init(){particles=[];for(let i=0;i<count;i++){particles.push({x:Math.random()*w,y:Math.random()*h,vy:0.2+Math.random()*0.8,alpha:0.05+Math.random()*0.25,size:1+Math.random()*2,dx:(Math.random()-.5)*0.4})}}
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;init()}
window.addEventListener('resize',resize);init();
function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){p.y += p.vy; p.x += p.dx; if(p.y>h+10){p.y=-10; p.x=Math.random()*w} ctx.beginPath(); ctx.fillStyle = `rgba(255,240,255,${p.alpha})`; ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();}
requestAnimationFrame(draw)}
requestAnimationFrame(draw);
}
startGlitter();

/* --- Search gallery utility --- */
const searchInput = document.getElementById('gallerySearch');if(searchInput){searchInput.addEventListener('input',e=>{const q = e.target.value.trim().toLowerCase();const items = document.querySelectorAll('.gallery-item');let any=false;items.forEach(it=>{const title = (it.dataset.title||it.textContent||'').toLowerCase();const matches = title.includes(q)||q==='';it.classList.toggle('hidden',!matches); if(matches) any=true}); if(!any && q.length>0) showToast('No se han encontrado fotos')})}
// Base counter: empieza en 736 en la fecha indicada y suma 1 cada día que pase
const BASE_DAYS = 736; // número inicial proporcionado
const BASE_DATE = "2026-08-22"; // fecha en la que BASE_DAYS es válido (AAAA-MM-DD)
window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("loader-hide"),1700));
const daysEl=document.getElementById("daysTogether");
function updateDays(){
	const base = new Date(BASE_DATE+"T00:00:00");
	const now = new Date();
	const extra = Math.floor((now - base) / 86400000);
	const total = Math.max(0, BASE_DAYS + extra);
	daysEl.textContent = String(total).padStart(3, "0");
}
updateDays();

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

document.addEventListener("mousemove",e=>{const c=document.getElementById("cursorHeart");c.style.left=e.clientX+"px";c.style.top=e.clientY+"px";c.style.opacity=.75});
document.addEventListener("click",e=>{if(Math.random()>.35)return;const h=document.createElement("span");h.textContent=["♡","♥","✦"][Math.floor(Math.random()*3)];h.style.position="fixed";h.style.left=e.clientX+"px";h.style.top=e.clientY+"px";h.style.color="#f29ab8";h.style.pointerEvents="none";h.style.zIndex=95;document.body.appendChild(h);h.animate([{transform:"translate(-50%,-50%) scale(.5)",opacity:1},{transform:`translate(${(Math.random()-.5)*80}px,-80px) scale(1.2)`,opacity:0}],{duration:850}).finished.then(()=>h.remove())});

document.querySelectorAll(".filters button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;document.querySelectorAll(".gallery-item").forEach(x=>x.classList.toggle("hidden",f!=="all"&&!x.classList.contains(f)))}));

const photoModal=document.getElementById("photoModal"),modalPhoto=document.getElementById("modalPhoto"),modalTitle=document.getElementById("modalTitle");
document.querySelectorAll(".photo-placeholder[data-photo-src]").forEach(slot=>{
	slot.innerHTML=`<img class="photo-image" src="${slot.dataset.photoSrc}" alt="${slot.dataset.photoLabel}">`;
});
document.querySelectorAll(".gallery-item").forEach(item=>item.addEventListener("click",event=>{if(event.target.closest("button,input"))return;modalPhoto.innerHTML=item.querySelector(".photo-placeholder").innerHTML;modalPhoto.querySelectorAll("button,input").forEach(element=>element.remove());modalTitle.textContent=item.dataset.title;photoModal.classList.add("show")}));
const heroPhoto=document.querySelector(".hero-photo");
if(heroPhoto)heroPhoto.addEventListener("click",()=>{modalPhoto.innerHTML=heroPhoto.innerHTML;modalTitle.textContent=heroPhoto.dataset.photoLabel;photoModal.classList.add("show")});
function closePhoto(){photoModal.classList.remove("show")}photoModal.addEventListener("click",e=>{if(e.target===photoModal)closePhoto()});

const letterModal=document.getElementById("letterModal");function openLetter(){letterModal.classList.add("show");burstHearts()}function closeLetter(){letterModal.classList.remove("show")}letterModal.addEventListener("click",e=>{if(e.target===letterModal)closeLetter()});document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeLetter();closePhoto()}});

let toastTimer;function showToast(text){const t=document.getElementById("toast");t.textContent=text;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function burstHearts(){for(let i=0;i<20;i++){const h=document.createElement("span");h.textContent=["♡","♥","✦","🌸"][Math.floor(Math.random()*4)];h.style.position="fixed";h.style.left="50%";h.style.top="50%";h.style.zIndex=100;h.style.pointerEvents="none";document.body.appendChild(h);h.animate([{transform:"translate(0,0) scale(.4)",opacity:1},{transform:`translate(${(Math.random()-.5)*500}px,${-100-Math.random()*350}px) scale(1.5)`,opacity:0}],{duration:1000+Math.random()*800}).finished.then(()=>h.remove())}}


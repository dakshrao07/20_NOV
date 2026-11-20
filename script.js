const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms)),R=(a,b)=>a+Math.random()*(b-a);

// balloons
const bc=['#ff9ec7','#ffd36e','#8fd8ff','#c5a3ff','#9be8c0','#ffa98a'];
for(let i=0;i<9;i++){const b=document.createElement('i');b.className='bl';b.style.cssText=`left:${R(2,92)}%;--c:${bc[i%6]};--t:${R(18,32)}s;--x:${R(-40,40)}px;animation-delay:${-R(0,28)}s;transform-origin:50% 100%;scale:${R(.8,1.3)}`;$('balloons').appendChild(b)}

// confetti canvas
const cv=$('fx'),cx=cv.getContext('2d');let W,H,parts=[];
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
const cc=['#ff7eb3','#ffd36e','#6fd3ff','#b88cff','#7be0a8','#ff9a5c'];
function confetti(x,y,n=90){for(let i=0;i<n;i++){const a=R(-Math.PI,0),v=R(5,15);parts.push({x,y,vx:Math.cos(a)*v*R(.5,1.2),vy:Math.sin(a)*v,w:R(6,11),h:R(4,8),r:R(0,6),vr:R(-.3,.3),c:cc[Math.random()*6|0],l:1})}}
(function lp(){cx.clearRect(0,0,W,H);parts=parts.filter(p=>p.l>0&&p.y<H+20);parts.forEach(p=>{p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l-=.006;cx.save();cx.globalAlpha=Math.min(1,p.l*2);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()});requestAnimationFrame(lp)})();
let tt;function toast(m,ms=2600){const e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),ms)}

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.25});
const delayAll=(sel,step)=>document.querySelectorAll(sel).forEach((e,i)=>e.style.transitionDelay=i*step+'s');
delayAll('.reasons .rc',.15);
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

// notes
const N=[
 ['You are the kindest and most loving person I\'ve ever met.','#fff3b0',-2],
 ['Thank you for being so patient with me, for understanding, for tolerating my random moods.','#ffd6e6',1.5],
 ['Kabhi life difficult ho toh... remember, main toh hoon hi, yaaar!','#d4f1ff',-1.5],
 ['I want to celebrate many more birthdays with you, make so many memories and look back one day at how far we\'ve come.','#e6dcff',2],
 ['You\'re so special to me and I\'ll never stop appreciating the person you are.','#d8f8e3',-1.5],
 ['I hope it\'s us for a lifetime.','#ffe2c9',1.5]
];
N.forEach(([t,c,r])=>{const d=document.createElement('div');d.className='nt';d.style.cssText=`--n:${c};--r:${r}deg`;d.innerHTML=`${t}<i>- Disha ji 💌</i>`;$('stack').appendChild(d);io.observe(d)});

// reply typing
const T="Dishaaaa, its my 21st brdy, but honestly most special brdy h ye mera, yeh saal aapki wajah se special h. Like the way you wished me, I read that letter and felt that i am really blessed ki mujhe aap mile, aapse baate hue and today we are together. Aapne likha ki aap mere efforts ko notice karti h, aur m bhi aapki hr chhoti baat notice karta hu and hmesa ase hi krta rhuga. Mera pehla birthday aapke saath hai, aur m chahta hu ki aise hi saare birthdays aapke saath hon. Aap mere liye bahut special ho. Thank you for being you. 💖";
let typed=false;
new IntersectionObserver(async es=>{if(es[0].isIntersecting&&!typed){typed=true;await sleep(900);const e=$('rt');for(const ch of T){e.textContent+=ch;await sleep(26)}$('sig').classList.add('on');confetti(innerWidth/2,innerHeight*.8,50)}},{threshold:.5}).observe($('reply'));

// cake
const W2="Meri wish: aap, hamesha mere saath. Har birthday, har saal. 💖";
let off=0;
document.querySelectorAll('.cd').forEach(c=>c.addEventListener('click',async e=>{
  if(c.classList.contains('off'))return;c.classList.add('off');off++;
  if(off===1)$('cl').textContent='Bas ek aur... 🕯️';
  if(off===2){const r=$('cakeSvg').getBoundingClientRect();confetti(r.left+r.width/2,r.top+80,140);$('cl').textContent='Wish ho gayi! 🎉';
    const w=$('wish');for(const ch of W2){w.textContent+=ch;await sleep(45)}
    await sleep(600);toast('Happy Birthday to me, thanks to you, Disha ji 🎂',3600);confetti(innerWidth*.2,innerHeight*.9,60);confetti(innerWidth*.8,innerHeight*.9,60)}
}));
$('go').onclick=e=>{confetti(e.clientX,e.clientY,80);$('why').scrollIntoView({behavior:'smooth'})};

/* 示意價：全站價格只寫在這裡（單位 NT$）。換成真價格改數字即可；要整個移除就把 PRICES 清空（{}），各處會顯示「NT$ —」。已售出商品不列價格 */
const PRICES={'手串 01':3280,'手串 02':2680,'手串 04':3880,'手串 06':2980,'手鐲 01':4680,'手鐲 03':5280,'商品名稱':3600};
const priceHTML=n=>n==null||isNaN(n)?'NT$ —':'NT$ '+n.toLocaleString('en-US')+'<small class="pn">示意</small>';
document.querySelectorAll('[data-p]').forEach(e=>e.innerHTML=priceHTML(PRICES[e.dataset.p]));
const dP=document.querySelector('.drawer .li [data-p]'),setDSum=n=>{const e=document.getElementById('dsum');if(e&&dP)e.innerHTML=priceHTML(PRICES[dP.dataset.p]*n)};setDSum(1);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.rv').forEach(el=>io.observe(el));
document.querySelectorAll('.qty:not([data-cart])').forEach(q=>{const s=q.querySelector('span'),mx=+(q.dataset.max||99),[mi,pl]=q.querySelectorAll('button');const u=()=>{mi.disabled=+s.textContent<=1;pl.disabled=+s.textContent>=mx};u();q.addEventListener('click',e=>{const d=e.target.dataset.d;if(d&&!e.target.disabled){s.textContent=Math.min(mx,Math.max(1,+s.textContent+ +d));u()}})});
/* 頁首購物車徽章：0 件隱藏、1–9 顯示數字、10 件以上顯示 9+；件數存在 data-n；抽屜標題同步 */
const B=document.getElementById('bagn');
const bagN=()=>B?+(B.dataset.n||0):0;
function setBag(n,bump){if(!B)return;n=Math.max(0,n|0);B.dataset.n=n;B.textContent=n>9?'9+':n||'';B.hidden=!n;const a=B.closest('a');if(a)a.setAttribute('aria-label',n?'購物車，'+n+' 件商品':'購物車，目前沒有商品');const dt=document.getElementById('dtitle');if(dt)dt.textContent='購物車（'+n+'）';if(bump&&n){B.classList.remove('bump');void B.offsetWidth;B.classList.add('bump')}}
if(B){setBag(+B.textContent||0);B.addEventListener('animationend',()=>B.classList.remove('bump'))}
/* 抽屜 */
const D=document.querySelector('.drawer');let dFrom=null;
function openD(){dFrom=document.activeElement;document.body.classList.add('dopen');const x=D&&D.querySelector('.x');if(x)x.focus()}
function closeD(){if(!document.body.classList.contains('dopen'))return;document.body.classList.remove('dopen');if(dFrom&&dFrom.focus)dFrom.focus()}
document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const stock=document.body.classList.contains('stock');const q=stock?document.querySelector('.buy .qty span'):null;const n=q?+q.textContent:1;setBag(bagN()+n,true);const dn=document.getElementById('dq');if(dn)dn.textContent=stock?'數量：'+n:'僅此一件';const ck=document.querySelector('.drawer a[href^="cart.html"]');if(ck)ck.href=stock?'cart.html?qty='+n:'cart.html';const sz=document.querySelector('.opt .on');const ds=document.getElementById('dsz');if(ds&&sz)ds.textContent=sz.textContent;setDSum(n);openD()}));
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeD);
addEventListener('keydown',e=>{if(e.key==='Escape')closeD()});
document.querySelectorAll('.opt').forEach(g=>g.addEventListener('click',e=>{if(e.target.tagName==='BUTTON'){g.querySelectorAll('button').forEach(b=>b.classList.remove('on'));e.target.classList.add('on')}}));

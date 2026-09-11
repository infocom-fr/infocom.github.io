const cart=[];const favs=new Set();
const drawer=document.getElementById('drawer'),overlay=document.getElementById('overlay');
const toastEl=document.getElementById('toast');
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),1600)}
function updateCart(){
 document.getElementById('bagCount').textContent=cart.length;
 document.getElementById('drawerCount').textContent=cart.length;
 const items=document.getElementById('cartItems');
 if(!cart.length){items.innerHTML='<p style="padding:22px 0;color:#879198;font-size:10px">Tu bag está vacío.</p>'}
 else{items.innerHTML=cart.map((p,i)=>`<div class="cart-line"><div><b>${p.name}</b><small>INFOCOM / COLLECTION 001</small></div><strong>$${Number(p.price).toFixed(2)}</strong></div>`).join('')}
 const total=cart.reduce((s,p)=>s+Number(p.price),0);
 document.getElementById('total').textContent='$'+total.toFixed(2);
}
function openBag(){drawer.classList.add('open');overlay.classList.add('show')}
function closeBag(){drawer.classList.remove('open');overlay.classList.remove('show')}
document.getElementById('bagBtn').onclick=openBag;
document.getElementById('closeDrawer').onclick=closeBag;
overlay.onclick=closeBag;
document.querySelectorAll('.add').forEach(btn=>btn.onclick=()=>{cart.push({name:btn.dataset.name,price:btn.dataset.price});updateCart();openBag();toast(btn.dataset.name+' añadido al bag')});
document.querySelectorAll('.heart').forEach(btn=>btn.onclick=()=>{
 const id=btn.dataset.id;
 if(favs.has(id)){favs.delete(id);btn.classList.remove('active');btn.textContent='♡'}
 else{favs.add(id);btn.classList.add('active');btn.textContent='♥'}
 document.getElementById('favCount').textContent=favs.size;
});
document.querySelectorAll('.categories button').forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll('.categories button').forEach(x=>x.classList.remove('active'));
 btn.classList.add('active');
 const f=btn.dataset.filter;
 document.querySelectorAll('.product').forEach(p=>p.style.display=(f==='all'||p.dataset.category===f)?'block':'none');
});
document.getElementById('sort').onclick=()=>{
 const wrap=document.getElementById('products');
 [...wrap.children].sort((a,b)=>Number(a.dataset.price)-Number(b.dataset.price)).forEach(x=>wrap.appendChild(x));
 toast('Colección ordenada por precio');
};
const modal=document.getElementById('searchModal');
document.getElementById('searchBtn').onclick=()=>modal.classList.add('show');
document.querySelector('[data-close="searchModal"]').onclick=()=>modal.classList.remove('show');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};
document.getElementById('searchInput').oninput=e=>{
 const q=e.target.value.toLowerCase().trim();
 document.querySelectorAll('.product').forEach(p=>p.style.display=p.innerText.toLowerCase().includes(q)?'block':'none');
};
document.getElementById('favBtn').onclick=()=>toast(favs.size?`${favs.size} favorito(s) guardado(s)`:'Aún no tienes favoritos');
document.getElementById('newsletter').onsubmit=e=>{e.preventDefault();e.target.reset();toast('Bienvenido a INFOCOM Insider')};
document.getElementById('checkout').onclick=()=>toast('Checkout preparado para conectar con pagos');
updateCart();

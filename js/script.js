const products=PRODUCTS;let filter='all',cart=[],favs=new Set();
const grid=document.getElementById('grid'),empty=document.getElementById('empty');
function render(){const q=(document.getElementById('searchInput')?.value||'').toLowerCase().trim();let shown=0;
document.querySelectorAll('.product').forEach(c=>{let ok=(filter==='all'||c.dataset.cat===filter)&&(!q||c.dataset.name.includes(q)||c.dataset.cat.includes(q));c.style.display=ok?'block':'none';if(ok)shown++});empty.hidden=shown>0}
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()});
document.getElementById('sortBtn').onclick=()=>{let a=[...document.querySelectorAll('.product')];a.sort((x,y)=>+x.dataset.price-+y.dataset.price);a.forEach(x=>grid.appendChild(x));toast('Ordenado por precio')};
function toast(t){let x=document.querySelector('.toast');if(!x){x=document.createElement('div');x.className='toast';document.body.appendChild(x)}x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1600)}
function updateCart(){document.getElementById('cartCount').textContent=cart.length;document.getElementById('drawerCount').textContent=cart.length;document.getElementById('cartItems').innerHTML=cart.length?cart.map(p=>`<div class="cart-line"><div><b>${p.name}</b><small>${p.category}</small></div><strong>$${p.price.toFixed(2)}</strong></div>`).join(''):'<p style="color:#89939b;font-size:11px;padding-top:25px">Tu bag está vacío.</p>';document.getElementById('cartTotal').textContent='$'+cart.reduce((s,p)=>s+p.price,0).toFixed(2)}
function add(id){const p=products.find(x=>x.id===id);cart.push(p);updateCart();openCart();toast(p.name+' añadido')}
document.querySelectorAll('.details').forEach(b=>b.onclick=()=>{const p=products.find(x=>x.id===+b.dataset.id);document.getElementById('productDetail').innerHTML=`<div class="detail-modal"><img src="assets/products/${p.id}.webp" alt="${p.name}"><div><div class="eyebrow">${p.badge} / ${p.category}</div><h2>${p.name}</h2><div class="price">$${p.price.toFixed(2)}</div><p>${p.description}. Una pieza INFOCOM diseñada para formar parte de tu identidad diaria.</p><button class="add" onclick="add(${p.id});hide('productModal')">AÑADIR AL BAG →</button></div></div>`;show('productModal')});
document.querySelectorAll('.heart').forEach(b=>b.onclick=()=>{let id=+b.dataset.id;if(favs.has(id)){favs.delete(id);b.classList.remove('active');b.textContent='♡'}else{favs.add(id);b.classList.add('active');b.textContent='♥'}document.getElementById('favCount').textContent=favs.size});
function show(id){document.getElementById(id).classList.add('show')}function hide(id){document.getElementById(id).classList.remove('show')}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('overlay').classList.add('show')}function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
document.getElementById('openCart').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;document.getElementById('overlay').onclick=closeCart;
document.getElementById('openSearch').onclick=()=>show('searchModal');document.getElementById('searchShop').onclick=()=>show('searchModal');document.getElementById('searchInput').oninput=render;
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>hide(b.dataset.close));
document.querySelectorAll('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)hide(m.id)});
document.getElementById('newsletter').onsubmit=e=>{e.preventDefault();toast('¡Bienvenido a INFOCOM Insider!');e.target.reset()};
document.getElementById('checkout').onclick=()=>toast('Checkout listo para conectar con tu método de pago');
updateCart();

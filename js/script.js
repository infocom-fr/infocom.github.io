const cart=[];const cartEl=document.getElementById('cart');const overlay=document.getElementById('overlay');
function updateCart(){
 document.getElementById('cartCount').textContent=cart.length;
 document.getElementById('cartItems').innerHTML=cart.length
 ? cart.map(p=>`<div class="cart-item"><b>${p.name}</b><small>$${p.price}</small></div>`).join('')
 : '<p style="color:#8c969e;font-size:11px;padding-top:20px">Tu carrito está vacío.</p>';
 const total=cart.reduce((sum,p)=>sum+Number(p.price),0);
 document.getElementById('cartTotal').textContent='$'+total.toFixed(2);
}
function openCart(){cartEl.classList.add('open');overlay.classList.add('show')}
function closeCart(){cartEl.classList.remove('open');overlay.classList.remove('show')}
document.getElementById('cartButton').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
overlay.onclick=closeCart;
document.querySelectorAll('.add').forEach(btn=>btn.onclick=()=>{
 cart.push({name:btn.dataset.name,price:btn.dataset.price});
 updateCart();openCart();
});
document.getElementById('checkout').onclick=()=>alert('El checkout se puede conectar a tu sistema de pagos en la siguiente versión.');

document.querySelectorAll('.filter').forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
 btn.classList.add('active');
 const filter=btn.dataset.filter;
 document.querySelectorAll('.product').forEach(card=>{
   card.style.display=(filter==='all'||card.dataset.category===filter)?'block':'none';
 });
});
updateCart();

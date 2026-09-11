
const PRODUCTS=[
{id:1,name:"Shadow IF",cat:"premium",price:49.99,desc:"Black · Signature embroidery",img:"assets/products/01.png",badge:"LIMITED"},
{id:2,name:"Lime Street",cat:"urban",price:34.99,desc:"Black · Lime details",img:"assets/products/02.png",badge:"NEW"},
{id:3,name:"White Essential",cat:"classic",price:29.99,desc:"White · Minimal mark",img:"assets/products/03.png",badge:"CLEAN"},
{id:4,name:"Royal Street",cat:"urban",price:36.99,desc:"Royal blue · White mark",img:"assets/products/04.png",badge:"DROP"},
{id:5,name:"Carbon Pro",cat:"sport",price:41.99,desc:"Graphite · Performance fit",img:"assets/products/05.png",badge:"SPORT"},
{id:6,name:"Forest Mark",cat:"classic",price:32.99,desc:"Forest · Lime embroidery",img:"assets/products/06.png",badge:"EVERYDAY"},
{id:7,name:"Sand Studio",cat:"premium",price:46.99,desc:"Sand · Elevated finish",img:"assets/products/07.png",badge:"PREMIUM"},
{id:8,name:"Signal Red",cat:"urban",price:38.99,desc:"Red · Statement mark",img:"assets/products/08.png",badge:"DROP"},
{id:9,name:"Ice Blue",cat:"classic",price:33.99,desc:"Ice blue · Clean logo",img:"assets/products/09.png",badge:"NEW"},
{id:10,name:"Midnight Sport",cat:"sport",price:44.99,desc:"Black · Active fit",img:"assets/products/10.png",badge:"SPORT"},
{id:11,name:"Olive Utility",cat:"sport",price:42.99,desc:"Olive · Utility details",img:"assets/products/11.png",badge:"UTILITY"},
{id:12,name:"Mono Signature",cat:"premium",price:52.99,desc:"Black · Premium signature",img:"assets/products/12.png",badge:"SIGNATURE"}
];
let cart=JSON.parse(localStorage.getItem("infocom_cart")||"[]"),wish=new Set(JSON.parse(localStorage.getItem("infocom_wish")||"[]")),filter="all",query="";
const grid=document.getElementById("productGrid"),best=document.getElementById("bestGrid"),drawer=document.getElementById("drawer"),overlay=document.getElementById("overlay"),toastEl=document.getElementById("toast");
function save(){localStorage.setItem("infocom_cart",JSON.stringify(cart));localStorage.setItem("infocom_wish",JSON.stringify([...wish]))}
function toast(t){toastEl.textContent=t;toastEl.classList.add("show");setTimeout(()=>toastEl.classList.remove("show"),1700)}
function render(){
 let list=PRODUCTS.filter(p=>(filter==="all"||p.cat===filter)&&(!query||(`${p.name} ${p.cat} ${p.desc}`).toLowerCase().includes(query)));
 const sort=document.getElementById("sort").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="az")list.sort((a,b)=>a.name.localeCompare(b.name));
 grid.innerHTML=list.map(p=>`<article class="card" data-id="${p.id}"><div class="card-img"><img src="${p.img}" alt="${p.name}"><span class="badge">${p.badge}</span><button class="wish ${wish.has(p.id)?"active":""}" data-wish="${p.id}">${wish.has(p.id)?"♥":"♡"}</button></div><div class="card-info"><small>${p.cat.toUpperCase()} / INFOCOM</small><h3>${p.name}</h3><p>${p.desc}</p><div class="card-bottom"><b>$${p.price.toFixed(2)}</b><button class="add" data-add="${p.id}">ADD TO BAG ↗</button></div></div></article>`).join("")||'<p style="color:#879197;font-size:12px;padding:30px 0">No encontramos productos con ese criterio.</p>';
 document.querySelectorAll("[data-add]").forEach(b=>b.onclick=e=>{e.stopPropagation();add(Number(b.dataset.add))});
 document.querySelectorAll("[data-wish]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleWish(Number(b.dataset.wish))});
 document.querySelectorAll(".card").forEach(c=>c.onclick=()=>openProduct(Number(c.dataset.id)));
document.querySelectorAll(".card-img img").forEach(img=>img.loading="lazy");
}
function renderBest(){best.innerHTML=PRODUCTS.slice(0,3).map(p=>`<article class="mini"><img src="${p.img}" alt="${p.name}"><div><small>BEST SELLER</small><h3>${p.name}</h3><p style="font-size:11px;color:#879197;margin:0 0 16px">${p.desc}</p><b>$${p.price.toFixed(2)}</b><br><button class="add" data-add="${p.id}" style="margin-top:12px">ADD TO BAG ↗</button></div></article>`).join("");document.querySelectorAll(".mini [data-add]").forEach(b=>b.onclick=()=>add(Number(b.dataset.add)))}
function add(id){const p=PRODUCTS.find(x=>x.id===id);cart.push(p.id);save();updateCart();openBag();toast(p.name+" added to bag")}
function toggleWish(id){wish.has(id)?wish.delete(id):wish.add(id);save();document.getElementById("wishCount").textContent=wish.size;render()}
function updateCart(){document.getElementById("bagCount").textContent=cart.length;document.getElementById("drawerCount").textContent=cart.length;const total=cart.reduce((s,id)=>s+PRODUCTS.find(p=>p.id===id).price,0);document.getElementById("total").textContent="$"+total.toFixed(2);document.getElementById("cartItems").innerHTML=cart.length?cart.map((id,i)=>{const p=PRODUCTS.find(x=>x.id===id);return `<div class="cart-line"><div><b>${p.name}</b><small>INFOCOM / COLLECTION 001</small></div><strong>$${p.price.toFixed(2)}</strong></div>`}).join(""):'<p style="padding:20px 0;color:#879197;font-size:11px">Your bag is empty.</p>';let pct=Math.min(total/75*100,100);document.getElementById("shippingBar").style.width=pct+"%";document.getElementById("shippingText").textContent=total>=75?"Free shipping unlocked ✓":`Add $${(75-total).toFixed(2)} for free shipping`}
function openBag(){drawer.classList.add("open");overlay.classList.add("show")}function closeBag(){drawer.classList.remove("open");overlay.classList.remove("show")}
function openProduct(id){const p=PRODUCTS.find(x=>x.id===id);document.getElementById("modalContent").innerHTML=`<div class="modal-product"><img src="${p.img}" alt="${p.name}"><div><div class="eyebrow">${p.cat.toUpperCase()} / INFOCOM</div><h2>${p.name}<br><em>COLLECTION 001.</em></h2><p>${p.desc}. Diseño original INFOCOM pensado para uso diario.</p><div class="modal-price">$${p.price.toFixed(2)}</div><button class="btn full" id="modalAdd">ADD TO BAG ↗</button></div></div>`;document.getElementById("modalAdd").onclick=()=>{add(p.id);document.getElementById("productModal").classList.remove("show")};document.getElementById("productModal").classList.add("show")}
document.getElementById("bagBtn").onclick=openBag;document.getElementById("closeBag").onclick=closeBag;overlay.onclick=closeBag;
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{filter=b.dataset.cat;document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()});
document.getElementById("sort").onchange=render;
document.querySelectorAll(".mega a[data-cat],.sil-grid button").forEach(el=>el.onclick=()=>{filter=el.dataset.cat;document.querySelectorAll(".filters button").forEach(x=>x.classList.toggle("active",x.dataset.cat===filter));render()});
document.getElementById("filterBtn").onclick=()=>toast("Usa las categorías para filtrar la colección");
document.getElementById("checkout").onclick=()=>toast("Checkout preparado para conectar con pagos");
document.getElementById("wishBtn").onclick=()=>toast(wish.size?`${wish.size} favorito(s) guardado(s)`:"Aún no tienes favoritos");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>b.closest(".modal,.search-modal").classList.remove("show"));
document.getElementById("accountBtn").onclick=()=>document.getElementById("accountModal").classList.add("show");
document.getElementById("rewardsBtn").onclick=()=>document.getElementById("accountModal").classList.add("show");
const searchModal=document.getElementById("searchModal");document.getElementById("searchBtn").onclick=()=>{searchModal.classList.add("show");document.getElementById("searchInput").focus()};
document.getElementById("searchInput").oninput=e=>{query=e.target.value.toLowerCase().trim();const res=PRODUCTS.filter(p=>(p.name+" "+p.cat+" "+p.desc).toLowerCase().includes(query));document.getElementById("searchResults").innerHTML=query?res.map(p=>`<div class="result">${p.name}<b>$${p.price.toFixed(2)}</b></div>`).join(""):"";};
document.getElementById("newsletter").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Welcome to INFOCOM Insider")};
document.getElementById("mobileMenu").onclick=()=>document.querySelector(".header").classList.toggle("nav-open");
document.getElementById("wishCount").textContent=wish.size;render();renderBest();updateCart();

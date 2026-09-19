const products = [{"id": "monstera-deliciosa", "name": "Monstera Deliciosa", "category": "Plants", "price": 34, "image": "assets/products/monstera.jpg", "fallback": "https://images.unsplash.com/photo-1736265488043-435d41bb6a5c?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "A statement plant with sculptural split leaves for bright, lived-in rooms."}, {"id": "snake-plant", "name": "Sage Snake Plant", "category": "Plants", "price": 32, "image": "assets/products/snake-plant.jpg", "fallback": "https://images.unsplash.com/photo-1615781749798-c01b1b64cfcf?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "An architectural favorite with upright form and an easygoing nature."}, {"id": "sage-planter", "name": "Ribbed Sage Planter", "category": "Planters", "price": 29, "image": "assets/products/sage-planter.jpg", "fallback": "https://images.unsplash.com/photo-1736265488043-435d41bb6a5c?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "A softly ribbed ceramic vessel designed for quiet, modern interiors."}, {"id": "calathea", "name": "Calathea Accent Plant", "category": "Plants", "price": 38, "image": "https://images.unsplash.com/photo-1736265488043-435d41bb6a5c?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "Patterned foliage that brings movement and color to calm spaces."}, {"id": "watering-can", "name": "Forest Watering Can", "category": "Tools & Care", "price": 24, "image": "https://images.unsplash.com/photo-1569135393135-c151f480100b?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "A practical everyday tool for slow, intentional plant care."}, {"id": "pruning-shears", "name": "Garden Pruning Shears", "category": "Tools & Care", "price": 18, "image": "https://images.unsplash.com/photo-1523301551780-cd17359a95d0?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "A compact care essential for shaping and maintaining healthy growth."}, {"id": "white-pot", "name": "Stone White Planter", "category": "Planters", "price": 31, "image": "https://images.unsplash.com/photo-1615781749798-c01b1b64cfcf?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "A simple neutral vessel that lets foliage take the lead."}, {"id": "plant-stand", "name": "Oak Plant Stand", "category": "Home Decor", "price": 42, "image": "https://images.unsplash.com/photo-1736265488043-435d41bb6a5c?auto=format&fit=crop&fm=jpg&q=88&w=1600", "desc": "A warm wooden lift that gives smaller plants a stronger presence."}];
let bag = [];
const grid = document.getElementById('productGrid');
const count = document.getElementById('bagCount');
const bag = document.getElementById('bag');
const bagItems = document.getElementById('bagItems');
const bagTotal = document.getElementById('bagTotal');

function renderProducts(filter='All'){
  grid.innerHTML = products.filter(p=>filter==='All'||p.category===filter).map(p=>`
    <article class="product">
      <div class="product-image"><img src="${p.image}" data-fallback="${p.fallback}" alt="${p.name}"></div>
      <h3>${p.name}</h3>
      <div class="product-meta"><span>${p.category}</span><strong>$${p.price.toFixed(2)}</strong></div>
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="add" data-id="${p.id}">Add to bag →</button></div>
    </article>`).join('');
  grid.querySelectorAll('img[data-fallback]').forEach(img=>img.addEventListener('error',()=>{if(img.src!==img.dataset.fallback)img.src=img.dataset.fallback},{once:true}));
}
function renderBag(){
  count.textContent=bag.length;
  bagItems.innerHTML=bag.length?bag.map(p=>`<div class="bag-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><div>$${p.price.toFixed(2)}</div></div></div>`).join(''):'<p>Your bag is ready for a little more green.</p>';
  bagTotal.textContent='$'+bag.reduce((s,p)=>s+p.price,0).toFixed(2);
}
document.addEventListener('click',e=>{
  if(e.target.matches('.add')){const p=products.find(x=>x.id===e.target.dataset.id);bag.push(p);renderBag();bag.classList.add('open')}
});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)}));
document.getElementById('bagBtn').onclick=()=>bag.classList.add('open');
document.getElementById('closeBag').onclick=()=>bag.classList.remove('open');
bag.addEventListener('click',e=>{if(e.target===bag)bag.classList.remove('open')});
document.getElementById('newsletter').addEventListener('submit',e=>{e.preventDefault();alert('Thanks for joining VERDENA.')});
renderProducts();
renderBag();

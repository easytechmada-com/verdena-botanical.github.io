const products = [{"id":"monstera-deliciosa","name":"Monstera Deliciosa","category":"Plants","price":34,"image":"assets/products/monstera.jpg","fallback":"https://images.unsplash.com/photo-1736265488043-435d41bb6a5c?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Bestseller","size":"6 in pot","desc":"A sculptural statement plant with split leaves and an easy, bright-room routine."},{"id":"sage-snake-plant","name":"Sage Snake Plant","category":"Plants","price":32,"image":"assets/products/snake-plant.jpg","fallback":"https://images.unsplash.com/photo-1615781749798-c01b1b64cfcf?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Easy Care","size":"5 in pot","desc":"An architectural favorite with upright form and a forgiving watering rhythm."},{"id":"olive-tree","name":"Mediterranean Olive Tree","category":"Plants","price":79,"image":"https://images.unsplash.com/photo-1574529130193-3b03681ab1c5?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"New","size":"10 in pot","desc":"A sun-loving silhouette that adds warmth, height, and a relaxed Mediterranean note."},{"id":"calathea","name":"Calathea Accent Plant","category":"Plants","price":38,"image":"https://images.unsplash.com/photo-1773995419788-451aec4bfdef?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Curated","size":"6 in pot","desc":"Patterned foliage for spaces that call for movement, texture, and a little drama."},{"id":"sage-planter","name":"Ribbed Sage Planter","category":"Planters","price":29,"image":"assets/products/sage-planter.jpg","fallback":"https://images.unsplash.com/photo-1736265488043-435d41bb6a5c?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"VERDENA Studio","size":"8 in diameter","desc":"A softly ribbed ceramic vessel designed to frame foliage without competing with it."},{"id":"stone-planter","name":"Stone White Planter","category":"Planters","price":31,"image":"https://images.unsplash.com/photo-1615781749798-c01b1b64cfcf?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Best Seller","size":"7 in diameter","desc":"A neutral stone-toned vessel with a calm profile for shelves, tables, and consoles."},{"id":"terracotta-vessel","name":"Hand-Finished Terracotta Vessel","category":"Planters","price":44,"image":"https://images.unsplash.com/photo-1761083042225-ed8fae388971?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Hand-finished","size":"9 in diameter","desc":"Warm terracotta texture with an artisanal surface made for relaxed botanical styling."},{"id":"watering-can","name":"Forest Watering Can","category":"Tools & Care","price":24,"image":"https://images.unsplash.com/photo-1569135393135-c151f480100b?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Everyday Tool","size":"1.4 L","desc":"A balanced, practical watering can for slow and precise plant care."},{"id":"pruning-shears","name":"Garden Pruning Shears","category":"Tools & Care","price":18,"image":"https://images.unsplash.com/photo-1523301551780-cd17359a95d0?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Care Essential","size":"8 in","desc":"Compact shears for shaping, removing spent growth, and keeping plants tidy."},{"id":"plant-mister","name":"Glass Plant Mister","category":"Tools & Care","price":18,"image":"https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"New","size":"300 ml","desc":"A fine-mist bottle for humidity-loving plants and a more intentional care ritual."},{"id":"oak-stand","name":"Oak Plant Stand","category":"Home Decor","price":42,"image":"https://images.unsplash.com/photo-1736265488043-435d41bb6a5c?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Warm Oak","size":"18 in high","desc":"A simple wooden lift that gives smaller plants a stronger presence in the room."},{"id":"grow-light","name":"Arc Indoor Grow Light","category":"Home Decor","price":49,"image":"https://images.unsplash.com/photo-1761083042225-ed8fae388971?auto=format&fit=crop&fm=jpg&q=88&w=1400","badge":"Low-Light Edit","size":"Adjustable","desc":"A discreet lighting accent for darker corners where your greenery needs support."}];
const state={filter:'All',query:'',sort:'featured',bag:[]};
try{state.bag=JSON.parse(localStorage.getItem('verdenaBag')||'[]')}catch(e){state.bag=[]}
function persistBag(){try{localStorage.setItem('verdenaBag',JSON.stringify(state.bag))}catch(e){}}
function orderLink(){const lines=state.bag.map(x=>`${x.qty} × ${x.product.name} — $${(x.qty*x.product.price).toFixed(2)}`).join('\n');const total=state.bag.reduce((s,x)=>s+x.product.price*x.qty,0).toFixed(2);return `mailto:support@verdena-botanical.com?subject=VERDENA%20Order%20Request&body=${encodeURIComponent(`Hello VERDENA,\n\nI would like to request the following order:\n\n${lines}\n\nSubtotal: $${total}\n\nPlease reply with availability, shipping, and payment instructions.`)}`}

const grid=document.getElementById('productGrid');
const bagCount=document.getElementById('bagCount');
const bagOverlay=document.getElementById('bagOverlay');
const bagItems=document.getElementById('bagItems');
const bagTotal=document.getElementById('bagTotal');
const resultCount=document.getElementById('resultCount');
const modal=document.getElementById('productModal');
const modalContent=document.getElementById('modalContent');

function filtered(){
 let list=products.filter(p=>(state.filter==='All'||p.category===state.filter)&&(`${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(state.query.toLowerCase())));
 if(state.sort==='low') list.sort((a,b)=>a.price-b.price);
 if(state.sort==='high') list.sort((a,b)=>b.price-a.price);
 if(state.sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
 return list;
}
function renderProducts(){
 const list=filtered();
 resultCount.textContent=`${list.length} ${list.length===1?'piece':'pieces'}`;
 if(!list.length){grid.innerHTML='<div class="empty">No pieces matched your search.<br><small>Try another plant, planter, or care term.</small></div>';return;}
 grid.innerHTML=list.map(p=>`<article class="product" data-id="${p.id}"><div class="product-image" data-photo-quick="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}"><img src="${p.image}" data-fallback="${p.fallback||''}" alt="${p.name}" loading="lazy">${p.badge?`<span class="product-badge">${p.badge}</span>`:''}</div><div class="product-info"><h3>${p.name}</h3><div class="product-meta"><span>${p.category} · ${p.size}</span><span class="product-price">$${p.price.toFixed(2)}</span></div><div class="product-actions"><button class="add" data-id="${p.id}">Add to bag →</button><button class="quick" data-quick="${p.id}" aria-label="Quick view ${p.name}">+</button></div></div></article>`).join('');
 grid.querySelectorAll('img[data-fallback]').forEach(img=>img.addEventListener('error',()=>{const fb=img.dataset.fallback;if(fb&&img.src!==fb)img.src=fb},{once:true}));
}
function renderBag(){
 persistBag();
 bagCount.textContent=state.bag.reduce((n,x)=>n+x.qty,0);
 if(!state.bag.length){bagItems.innerHTML='<p class="bag-note">Your bag is ready for a little more green.</p>';bagTotal.textContent='$0.00';return;}
 bagItems.innerHTML=state.bag.map(x=>`<div class="bag-item"><img src="${x.product.image}" alt="${x.product.name}"><div><strong>${x.product.name}</strong><small>${x.qty} × $${x.product.price.toFixed(2)}</small><div class="qty"><button data-minus="${x.product.id}" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-plus="${x.product.id}" aria-label="Increase quantity">+</button></div></div><button class="remove" data-remove="${x.product.id}">Remove</button></div>`).join('');
 bagTotal.textContent='$'+state.bag.reduce((sum,x)=>sum+x.product.price*x.qty,0).toFixed(2);
 const orderBtn=document.getElementById('orderRequest');if(orderBtn)orderBtn.href=orderLink();
}
function addToBag(id){const p=products.find(x=>x.id===id);if(!p)return;const item=state.bag.find(x=>x.product.id===id);item?item.qty++:state.bag.push({product:p,qty:1});renderBag();bagOverlay.classList.add('open');document.body.classList.add('no-scroll');}
function changeQty(id,delta){const item=state.bag.find(x=>x.product.id===id);if(!item)return;item.qty+=delta;if(item.qty<1)state.bag=state.bag.filter(x=>x.product.id!==id);renderBag();}
function openQuick(id){const p=products.find(x=>x.id===id);if(!p)return;modalContent.innerHTML=`<div class="modal-content"><div><img src="${p.image}" data-fallback="${p.fallback||''}" alt="${p.name}"></div><div class="modal-copy"><p class="eyebrow">${p.category} / ${p.size}</p><h2>${p.name}</h2><p>${p.desc}</p><div class="modal-price">$${p.price.toFixed(2)}</div><button class="button" data-modal-add="${p.id}">Add to bag →</button></div></div>`;const img=modalContent.querySelector('img');img?.addEventListener('error',()=>{if(img.dataset.fallback)img.src=img.dataset.fallback},{once:true});modal.classList.add('open');document.body.classList.add('no-scroll');}
function closeOverlays(){bagOverlay.classList.remove('open');modal.classList.remove('open');document.body.classList.remove('no-scroll');}

document.addEventListener('click',e=>{
 const add=e.target.closest('[data-id].add'); if(add){addToBag(add.dataset.id);return;}
 const quick=e.target.closest('[data-quick]'); if(quick){openQuick(quick.dataset.quick);return;}
 const remove=e.target.closest('[data-remove]'); if(remove){state.bag=state.bag.filter(x=>x.product.id!==remove.dataset.remove);renderBag();return;}
 const plus=e.target.closest('[data-plus]'); if(plus){changeQty(plus.dataset.plus,1);return;}
 const minus=e.target.closest('[data-minus]'); if(minus){changeQty(minus.dataset.minus,-1);return;}
 const photo=e.target.closest('[data-photo-quick]'); if(photo){openQuick(photo.dataset.photoQuick);return;}
 const modalAdd=e.target.closest('[data-modal-add]'); if(modalAdd){addToBag(modalAdd.dataset.modalAdd);return;}
 const jump=e.target.closest('[data-jump]'); if(jump){state.filter=jump.dataset.jump;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===state.filter));renderProducts();}
});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{state.filter=btn.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn));renderProducts();}));
document.getElementById('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;renderProducts();});
document.getElementById('searchBtn').addEventListener('click',()=>{document.getElementById('searchbar').classList.toggle('open');document.getElementById('searchInput').focus();});
document.getElementById('searchInput').addEventListener('input',e=>{state.query=e.target.value;renderProducts();});
document.getElementById('clearSearch').addEventListener('click',()=>{document.getElementById('searchInput').value='';state.query='';renderProducts();});
document.getElementById('bagBtn').addEventListener('click',()=>{bagOverlay.classList.add('open');document.body.classList.add('no-scroll');});
document.getElementById('closeBag').addEventListener('click',closeOverlays);
document.getElementById('closeModal').addEventListener('click',closeOverlays);
bagOverlay.addEventListener('click',e=>{if(e.target===bagOverlay)closeOverlays();});
modal.addEventListener('click',e=>{if(e.target===modal)closeOverlays();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOverlays();if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-photo-quick]')){e.preventDefault();openQuick(e.target.dataset.photoQuick);}});
document.getElementById('newsletter').addEventListener('submit',e=>{e.preventDefault();const btn=e.currentTarget.querySelector('button');btn.textContent='You’re on the list ✓';btn.disabled=true;});
renderProducts();renderBag();

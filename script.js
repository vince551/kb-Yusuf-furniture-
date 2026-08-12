const products=[{id:1,name:'Vince Cloud Sofa',price:89999,category:'Living Room'},{id:2,name:'Vince Accent Chair',price:24999,category:'Living Room'},{id:3,name:'Vince King Bed',price:59999,category:'Bedroom'},{id:4,name:'Oak Dining Set',price:74999,category:'Dining'},{id:5,name:'Atelier Side Table',price:18999,category:'Living Room'},{id:6,name:'Noir Executive Desk',price:45999,category:'Office'}];
const money=n=>'KSh '+n.toLocaleString('en-KE');
let cart=JSON.parse(localStorage.getItem('vince_cart')||'[]');
function updateCart(){const el=document.getElementById('cartCount');if(el)el.textContent=cart.reduce((s,p)=>s+(p.qty||0),0);localStorage.setItem('vince_cart',JSON.stringify(cart));}
function add(id){const p=products.find(x=>x.id===id),old=cart.find(x=>x.id===id);if(!p)return;if(old)old.qty++;else cart.push({...p,qty:1});updateCart();alert(p.name+' added to your bag.');}
function card(p){return `<article class="product-card"><div class="product-art"><span>VINCE</span><small>${p.category}</small></div><div class="info"><h3>${p.name}</h3><div class="price">${money(p.price)}</div></div><button onclick="add(${p.id})" aria-label="Add ${p.name} to bag">+</button></article>`}
const featured=document.getElementById('featuredProducts');if(featured)featured.innerHTML=products.slice(0,4).map(card).join('');
function subscribeNewsletter(e){e.preventDefault();alert('Welcome to The VINCE Letter.');e.target.reset();return false;}
window.add=add;window.subscribeNewsletter=subscribeNewsletter;updateCart();
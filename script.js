const products=[
{id:1,name:'Cloud Sofa',price:89999,category:'Living Room'},
{id:2,name:'Sculpt Accent Chair',price:24999,category:'Living Room'},
{id:3,name:'No. 01 King Bed',price:59999,category:'Bedroom'},
{id:4,name:'Oak Atelier Dining Set',price:74999,category:'Dining'},
{id:5,name:'Linea Executive Desk',price:45999,category:'Office'},
{id:6,name:'Luna Floor Lamp',price:12999,category:'Lighting'},
{id:7,name:'No. 04 Wardrobe',price:69999,category:'Storage'},
{id:8,name:'Terra Outdoor Lounge',price:64999,category:'Outdoor'}
];
const money=n=>'KSh '+n.toLocaleString('en-KE');
let cart=JSON.parse(localStorage.getItem('vince_cart')||'[]');
function updateCart(){const el=document.getElementById('cartCount');if(el)el.textContent=cart.reduce((s,p)=>s+p.qty,0);localStorage.setItem('vince_cart',JSON.stringify(cart));}
function add(id){const p=products.find(x=>x.id===id),old=cart.find(x=>x.id===id);if(old)old.qty++;else cart.push({...p,qty:1});updateCart();showToast(p.name+' added to your bag');}
function showToast(msg){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function card(p){return `<article class="product"><div class="product-art"><span>${String(p.id).padStart(2,'0')}</span><i></i></div><div class="product-info"><small>${p.category}</small><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button onclick="add(${p.id})">Add to bag</button></div></article>`}
const featured=document.getElementById('featuredProducts')||document.getElementById('featured');if(featured)featured.innerHTML=products.slice(0,4).map(card).join('');
const search=document.getElementById('search');if(search)search.addEventListener('keydown',e=>{if(e.key==='Enter')location.href='shop.html?q='+encodeURIComponent(e.target.value)});
const shop=document.getElementById('shopProducts');if(shop){const params=new URLSearchParams(location.search),q=(params.get('q')||'').toLowerCase(),cat=params.get('category');shop.innerHTML=products.filter(p=>(!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q))&&(!cat||p.category===cat)).map(card).join('')||'<p>No pieces found. Try another search.</p>';}
function subscribeNewsletter(e){e.preventDefault();showToast('Welcome to the VINCE letter.');e.target.reset();return false}
updateCart();
const products=[
{id:1,name:'Vince Cloud Sofa',price:89999,category:'Living Room'},
{id:2,name:'Vince Accent Chair',price:24999,category:'Living Room'},
{id:3,name:'Vince King Bed',price:59999,category:'Bedroom'},
{id:4,name:'Oak Dining Set',price:74999,category:'Dining'}
];
const money=n=>'KSh '+n.toLocaleString('en-KE');
let cart=JSON.parse(localStorage.getItem('vince_cart')||'[]');
function updateCart(){const el=document.getElementById('cartCount');if(el)el.textContent=cart.reduce((s,p)=>s+p.qty,0);localStorage.setItem('vince_cart',JSON.stringify(cart));}
function add(id){const p=products.find(x=>x.id===id),old=cart.find(x=>x.id===id);if(old)old.qty++;else cart.push({...p,qty:1});updateCart();alert(p.name+' added to cart');}
function card(p,i){return `<article class="product"><div class="product-art"><span>VINCE</span></div><div class="product-info"><h3>${p.name}</h3><div class="price">${money(p.price)}</div><small>${p.category}</small><button onclick="add(${p.id})" style="margin-top:12px;background:#c8a060;border:0;padding:9px 14px;border-radius:3px">Add to cart</button></div></article>`}
const featured=document.getElementById('featured');if(featured)featured.innerHTML=products.map(card).join('');
const search=document.getElementById('search');if(search)search.addEventListener('keydown',e=>{if(e.key==='Enter'){location.href='shop.html?q='+encodeURIComponent(e.target.value)}});
updateCart();
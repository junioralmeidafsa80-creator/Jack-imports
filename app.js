/* CONFIGURE ANTES DE PUBLICAR: coloque o número de WhatsApp no formato internacional, sem +, espaços ou traços. */
const CONFIG = {
  whatsappNumber: "5500000000000", // TROQUE pelo número real da loja. Ex.: 5575999999999
  currency: "BRL",
  ageGateEnabled: true
};

// Catálogo de demonstração. Troque nomes, preços e informações pelos produtos reais da Jack Imports.
const products = [
  {id:1,name:"Whisky Reserva",category:"Whisky",description:"Perfil marcante • 1 L",price:189.90,tag:"DESTAQUE",art:"",label:"RESERVA"},
  {id:2,name:"Gin Botânico",category:"Gin",description:"Notas aromáticas • 750 ml",price:99.90,tag:"SELEÇÃO",art:"clear",label:"BOTANIC"},
  {id:3,name:"Vodka Premium",category:"Vodka",description:"Clássica e versátil • 1 L",price:79.90,tag:"",art:"clear",label:"VODKA"},
  {id:4,name:"Cerveja Especial",category:"Cervejas",description:"Consulte opções e volumes",price:12.90,tag:"",art:"can",label:"SPECIAL"},
  {id:5,name:"Vinho Tinto",category:"Vinhos",description:"Para acompanhar bons momentos",price:69.90,tag:"",art:"red",label:"TINTO"},
  {id:6,name:"Energético",category:"Energéticos",description:"Consulte sabores e tamanhos",price:9.90,tag:"",art:"can",label:"ENERGY"},
  {id:7,name:"Licor Selecionado",category:"Destilados",description:"Uma opção para ocasiões especiais",price:89.90,tag:"",art:"red",label:"LICOR"},
  {id:8,name:"Combo Especial",category:"Combos",description:"Consulte a composição disponível",price:219.90,tag:"COMBO",art:"green",label:"COMBO"}
];

let cart = [];
let activeCategory = "Todas";
let searchTerm = "";

const money = value => new Intl.NumberFormat("pt-BR",{style:"currency",currency:CONFIG.currency}).format(value);
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("drawerBackdrop");
const toast = document.getElementById("toast");

function showToast(message){
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove("show"),2400);
}
function renderProducts(){
  const filtered = products.filter(p => (activeCategory==="Todas" || p.category===activeCategory) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(searchTerm.toLowerCase()));
  productGrid.innerHTML = "";
  if(!filtered.length){productGrid.innerHTML='<div class="no-results">Nenhum produto encontrado. Tente outra busca ou categoria.</div>';return;}
  filtered.forEach(p=>{
    const card=document.createElement("article");card.className="product-card";
    const image=document.createElement("div");image.className="product-image";
    if(p.tag){const tag=document.createElement("span");tag.className="product-tag";tag.textContent=p.tag;image.append(tag);}
    const art=document.createElement("div");art.className=`product-art ${p.art}`;art.dataset.label=p.label;image.append(art);
    const info=document.createElement("div");info.className="product-info";
    const cat=document.createElement("div");cat.className="product-category";cat.textContent=p.category;
    const name=document.createElement("h3");name.textContent=p.name;
    const desc=document.createElement("p");desc.textContent=p.description;
    const buy=document.createElement("div");buy.className="product-buy";
    const price=document.createElement("span");price.className="product-price";price.textContent=money(p.price);
    const add=document.createElement("button");add.className="add-button";add.textContent="+";add.setAttribute("aria-label",`Adicionar ${p.name} à sacola`);add.addEventListener("click",()=>addToCart(p.id));
    buy.append(price,add);info.append(cat,name,desc,buy);card.append(image,info);productGrid.append(card);
  });
}
function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item)item.qty++;else cart.push({id,qty:1});
  renderCart();showToast("Produto adicionado à sua sacola.");
}
function renderCart(){
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  document.getElementById("cartCount").textContent=count;
  const itemsEl=document.getElementById("cartItems");itemsEl.innerHTML="";
  if(!cart.length){itemsEl.innerHTML='<div class="empty-cart">Sua sacola ainda está vazia.<br>Explore os produtos e adicione seus favoritos.</div>';}
  cart.forEach(item=>{
    const p=products.find(x=>x.id===item.id);if(!p)return;
    const row=document.createElement("div");row.className="cart-row";
    const details=document.createElement("div");const title=document.createElement("h4");title.textContent=p.name;
    const category=document.createElement("small");category.textContent=p.category;
    const price=document.createElement("strong");price.textContent=money(p.price*item.qty);
    details.append(title,category,price);
    const quantity=document.createElement("div");quantity.className="quantity";
    const minus=document.createElement("button");minus.textContent="−";minus.setAttribute("aria-label","Diminuir quantidade");minus.onclick=()=>changeQty(p.id,-1);
    const qty=document.createElement("span");qty.textContent=item.qty;
    const plus=document.createElement("button");plus.textContent="+";plus.setAttribute("aria-label","Aumentar quantidade");plus.onclick=()=>changeQty(p.id,1);
    quantity.append(minus,qty,plus);row.append(details,quantity);itemsEl.append(row);
  });
  document.getElementById("cartSubtotal").textContent=money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0));
}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart();}
function openCart(){cartDrawer.classList.add("open");backdrop.classList.add("show");cartDrawer.setAttribute("aria-hidden","false");}
function closeCart(){cartDrawer.classList.remove("open");backdrop.classList.remove("show");cartDrawer.setAttribute("aria-hidden","true");}
function whatsappUrl(message){return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;}
function isWhatsappConfigured(){return /^\d{12,15}$/.test(CONFIG.whatsappNumber)&&!CONFIG.whatsappNumber.includes("000000");}
function checkout(){
  if(!cart.length){showToast("Adicione pelo menos um produto à sacola.");return;}
  if(!isWhatsappConfigured()){showToast("Configure o número de WhatsApp no arquivo app.js.");return;}
  const lines=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `• ${p.name} (${p.category}) — ${item.qty} x ${money(p.price)} = ${money(p.price*item.qty)}`;});
  const total=cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0);
  const message=`Olá, Jack Imports! Gostaria de consultar disponibilidade e finalizar este pedido:\n\n${lines.join("\n")}\n\nSubtotal estimado: ${money(total)}\n\nPor favor, confirme disponibilidade, entrega/frete e formas de pagamento.`;
  window.open(whatsappUrl(message),"_blank","noopener");
}
document.getElementById("categoryGrid").addEventListener("click",e=>{
  const button=e.target.closest("[data-category]");if(!button)return;
  activeCategory=button.dataset.category;
  document.querySelectorAll(".category-card").forEach(c=>c.classList.toggle("active",c===button));
  renderProducts();document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
});
document.getElementById("productSearch").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts();});
document.getElementById("searchToggle").addEventListener("click",()=>{document.getElementById("productSearch").focus();document.getElementById("produtos").scrollIntoView({behavior:"smooth"});});
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
backdrop.addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",checkout);
document.getElementById("clearCart").addEventListener("click",()=>{cart=[];renderCart();showToast("Sacola limpa.");});
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("open"));
document.querySelectorAll(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".desktop-nav").classList.remove("open")));
document.getElementById("footerWhatsapp").addEventListener("click",e=>{
  if(!isWhatsappConfigured()){e.preventDefault();showToast("Configure o número de WhatsApp no arquivo app.js.");}
  else e.currentTarget.href=whatsappUrl("Olá, Jack Imports! Gostaria de informações sobre os produtos.");
});
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("confirmAge").addEventListener("click",()=>{document.getElementById("ageOverlay").classList.add("hidden");});
document.getElementById("denyAge").addEventListener("click",()=>{document.getElementById("ageTitle").textContent="Acesso não permitido";document.querySelector(".age-card>p:not(.eyebrow)").textContent="A venda e o acesso a conteúdos de bebidas alcoólicas são destinados a maiores de 18 anos.";document.querySelector(".age-actions").innerHTML='<button class="button button-outline" onclick="window.location.href=\'about:blank\'">Sair do site</button>';});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
if(!CONFIG.ageGateEnabled)document.getElementById("ageOverlay").classList.add("hidden");
renderProducts();renderCart();

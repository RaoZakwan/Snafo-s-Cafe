const menuItems = [
    { id: 1, name: "Espresso", price: 3.00, category: "hot", img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200" },
    { id: 2, name: "Cappuccino", price: 4.50, category: "hot", img: "https://images.unsplash.com/photo-1572442388799-11670a0d60f2?w=200" },
    { id: 3, name: "Iced Latte", price: 4.50, category: "cold", img: "https://images.unsplash.com/photo-1517701550926-30cf5dd65f48?w=200" },
    { id: 4, name: "Cold Brew", price: 4.00, category: "cold", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200" },
    { id: 5, name: "Croissant", price: 3.75, category: "pastry", img: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=200" },
    { id: 6, name: "Muffin", price: 3.50, category: "pastry", img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=200" },
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderOrderMenu();
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

function renderMenu(filter = 'all') {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = '';
    menuItems.forEach(item => {
        if (filter === 'all' || item.category === filter) {
            grid.innerHTML += `
                <div class="card">
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <button class="btn" onclick="addToCart(${item.id})">Add</button>
                </div>`;
        }
    });
}

function filterMenu(category) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderMenu(category);
}

function renderOrderMenu() {
    const grid = document.getElementById('orderMenu');
    grid.innerHTML = '';
    menuItems.forEach(item => {
        grid.innerHTML += `
            <div class="card" style="flex-direction:row;align-items:center;gap:1rem;">
                <img src="${item.img}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;">
                <div style="flex:1">
                    <h4>${item.name}</h4>
                    <p style="color:var(--accent)">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="addToCart(${item.id})">+</button>
            </div>`;
    });
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartDiv = document.getElementById('cartItems');
    if (cart.length === 0) { cartDiv.innerHTML = '<p>Empty</p>'; }
    else {
        cartDiv.innerHTML = cart.map(item => `
            <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>`).join('');
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total').innerText = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) { alert('Cart is empty!'); }
    else { alert('Order placed! Thank you.'); cart = []; updateCart(); }
}
import products from './products.js';

// Get Elements
const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Cart Panel style 
const cartPanel = document.getElementById("cart-panel");
const closeCartBtn = document.getElementById("close-cart");
const cartOverlay = document.getElementById("cart-overlay");


// Display Products on Home Page
if (productList) {
    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Function to Get Cart from Local Storage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to Add to Cart
window.addToCart = function (id) {
    let cart = getCart();
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        let product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    openCart(); // Open the cart when adding an item
};

// Function to Update Cart UI
function updateCartUI() {
    let cart = getCart();
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Cart is empty</p>";
    } else {
        cart.forEach(item => {
            console.log(item)
            total += item.price * item.quantity;
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img width="100" src="${item.image}" />
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartTotal.innerText = total.toFixed(2);
    document.getElementById("cart-count").innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to Remove Item from Cart
window.removeFromCart = function (id) {
    let cart = getCart();
    cart = cart.filter(product => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
};

// Function to Open Cart
function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
}

// Function to Close Cart
function closeCart() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}

// Event Listeners
cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Load Cart on Page Load
updateCartUI();

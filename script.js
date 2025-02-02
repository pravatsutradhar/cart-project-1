import products from './products.js';

// Display Products on Home Page
const productList = document.getElementById("product-list");

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
    updateCartCount();
};

// Function to Update Cart Count
function updateCartCount() {
    let cart = getCart();
    document.getElementById("cart-count").innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to Display Cart Items
const cartItemsContainer = document.getElementById("cart-items");

if (cartItemsContainer) {
    let cart = getCart();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Cart is empty</p>";
    } else {
        cart.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <p>Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)"></p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    updateCartTotal();
}

// Function to Update Quantity
window.updateQuantity = function (id, quantity) {
    let cart = getCart();
    let item = cart.find(product => product.id === id);
    if (item) {
        item.quantity = parseInt(quantity);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTotal();
};

// Function to Remove Item from Cart
window.removeFromCart = function (id) {
    let cart = getCart();
    cart = cart.filter(product => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
};

// Function to Calculate Total Price
function updateCartTotal() {
    let cart = getCart();
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cart-total").innerText = total.toFixed(2);
}

// Checkout Button
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
        alert("Checkout successful!");
        localStorage.removeItem("cart");
        location.reload();
    });
}

// Update cart count on page load
updateCartCount();

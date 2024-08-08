let cart = [];

function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = productElement.querySelector('p:nth-child(2)').innerText.split(': ')[1];
    const productPrice = parseFloat(productElement.querySelector('p:nth-child(3)').innerText.split(': $')[1]);

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCartCount();
    productElement.querySelector('button').disabled = true;
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="plant${item.id}.jpg" alt="${item.name}">
            <p>Name: ${item.name}</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="increaseQuantity(${item.id})">Increase</button>
            <button onclick="decreaseQuantity(${item.id})">Decrease</button>
            <button onclick="removeFromCart(${item.id})">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

function updateCartSummary() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    document.getElementById('total-items').innerText = totalItems;
    document.getElementById('total-cost').innerText = totalCost;
}

function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    product.quantity += 1;
    renderCart();
}

function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});

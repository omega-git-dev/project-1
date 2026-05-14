const links = ["index.html", "menu.html", "about.html", "contact.html", "cart.html"]
const navBar = `<nav>
            <div class="logo">Foodie Haven</div>
            <ul>
                <li><a ${window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'class="active"' : ''} href="${links[0]}">Home</a></li>
                <li><a ${window.location.pathname.endsWith('menu.html') ? 'class="active"' : ''} href="${links[1]}">Menu</a></li>
                <li><a ${window.location.pathname.endsWith('about.html') ? 'class="active"' : ''} href="${links[2]}">About</a></li>
                <li><a ${window.location.pathname.endsWith('contact.html') ? 'class="active"' : ''} href="${links[3]}">Contact</a></li>
                <li><a ${window.location.pathname.endsWith('cart.html') ? 'class="active"' : ''} href="${links[4]}">Cart (<span id="cart-count">0</span>)</a></li>
            </ul>
        </nav>`

const header = document.querySelector('header')
header.innerHTML = navBar

// Cart functionality
let cart = JSON.parse(localStorage.getItem('foodieCart')) || []

function updateCartCount() {
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)
    }
}

function saveCart() {
    localStorage.setItem('foodieCart', JSON.stringify(cart))
    updateCartCount()
}

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName)
    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({ name: itemName, price: parseFloat(price), quantity: 1 })
    }
    saveCart()
    alert(`${itemName} added to cart!`)
}

function removeFromCart(index) {
    cart.splice(index, 1)
    saveCart()
    displayCart()
}

function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index)
    } else {
        cart[index].quantity = newQuantity
        saveCart()
        displayCart()
    }
}

function displayCart() {
    const cartItems = document.getElementById('cart-items')
    const totalPrice = document.getElementById('total-price')
    const checkoutBtn = document.getElementById('checkout-btn')

    if (!cartItems) return

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>'
        if (totalPrice) totalPrice.textContent = '0.00'
        if (checkoutBtn) checkoutBtn.disabled = true
        return
    }

    let html = '<div class="cart-items-list">'
    let total = 0

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity
        total += itemTotal
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} each</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
                </div>
                <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            </div>
        `
    })

    html += '</div>'
    cartItems.innerHTML = html

    if (totalPrice) totalPrice.textContent = total.toFixed(2)
    if (checkoutBtn) checkoutBtn.disabled = false
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount()
    displayCart()

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart')
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item')
            const price = this.getAttribute('data-price')
            addToCart(itemName, price)
        })
    })

    // Contact form
    const contactForm = document.getElementById('contact-form')
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault()
            alert('Thank you for your message! We\'ll get back to you soon.')
            this.reset()
        })
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn')
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Thank you for your order! Your food will be delivered soon.')
            cart = []
            saveCart()
            displayCart()
        })
    }
})
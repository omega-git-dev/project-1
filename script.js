const links = ["index.html", "menu.html", "about.html", "contact.html", "cart.html"]
const currentPage = window.location.pathname.split('/').pop() || 'index.html'
const navBar = `<nav>
            <a class="logo" href="${links[0]}">BlinkBite</a>
            <ul>
                <li><a ${currentPage === 'index.html' || currentPage === '' ? 'class="active"' : ''} href="${links[0]}">Home</a></li>
                <li><a ${currentPage === 'menu.html' ? 'class="active"' : ''} href="${links[1]}">Menu</a></li>
                <li><a ${currentPage === 'about.html' ? 'class="active"' : ''} href="${links[2]}">About</a></li>
                <li><a ${currentPage === 'contact.html' ? 'class="active"' : ''} href="${links[3]}">Contact</a></li>
                <li><a ${currentPage === 'cart.html' ? 'class="active"' : ''} href="${links[4]}">Cart (<span id="cart-count">0</span>)</a></li>
            </ul>
        </nav>`

const header = document.querySelector('header')
if (header) {
    header.innerHTML = navBar
}

let cart = JSON.parse(localStorage.getItem('blinkCart')) || []
const featuredItems = [
    { name: 'Stone Baked Pizza', description: 'Cheesy pizza with fresh basil and roasted toppings.', price: 9.99, image: 'https://images.unsplash.com/photo-1548365328-2c17c8e7b095?auto=format&fit=crop&w=900&q=80', category: 'Pizza' },
    { name: 'Classic Beef Burger', description: 'Juicy beef burger with crispy fries on the side.', price: 12.49, image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80', category: 'Burgers' },
    { name: 'Sushi Deluxe Platter', description: 'Fresh sushi rolls made with premium seafood.', price: 18.99, image: 'https://images.unsplash.com/photo-1498654205806-3d3d5b1f0c2d?auto=format&fit=crop&w=900&q=80', category: 'Sushi' },
    { name: 'Vibrant Salad Bowl', description: 'Healthy greens with avocado, seeds, and citrus vinaigrette.', price: 11.99, image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80', category: 'Salads' },
    { name: 'Crispy Chicken Wrap', description: 'Spiced chicken, lettuce and tangy sauce in a soft wrap.', price: 8.99, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb40?auto=format&fit=crop&w=900&q=80', category: 'Wraps' },
    { name: 'Berry Smoothie', description: 'Fresh berry blend with yogurt and honey.', price: 5.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', category: 'Drinks' },
]

const menuCategories = [
    { name: 'Pizza', image: 'https://images.unsplash.com/photo-1548365328-2c17c8e7b095?auto=format&fit=crop&w=800&q=80' },
    { name: 'Burgers', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80' },
    { name: 'Indian', image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80' },
    { name: 'Desserts', image: 'https://images.unsplash.com/photo-1505253215591-4736d7fb4b6c?auto=format&fit=crop&w=800&q=80' },
    { name: 'Asian', image: 'https://images.unsplash.com/photo-1512058564366-c9e9c2f73dfc?auto=format&fit=crop&w=800&q=80' },
    { name: 'Beverages', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
]

const flashDealItems = [
    { id: 'deal-1', name: 'Double Cheese Pizza', price: 7.99, image: 'https://images.unsplash.com/photo-1601924582975-dd1b60b139ad?auto=format&fit=crop&w=800&q=80', description: 'Limited time offer: 10% off and free delivery.' },
    { id: 'deal-2', name: 'Chicken Wrap Combo', price: 8.49, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb40?auto=format&fit=crop&w=800&q=80', description: 'Combo deal with fries and drink.' },
    { id: 'deal-3', name: 'Berry Smoothie', price: 4.49, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', description: 'Refreshing pick for quick cravings.' },
]

const quickOrderItems = [
    { id: 'quick-1', name: 'Burger & Fries', subtext: 'Ready in 20 min', price: 12.99 },
    { id: 'quick-2', name: 'Mango Lassi', subtext: 'Best seller', price: 4.99 },
    { id: 'quick-3', name: 'Chicken Tikka', subtext: 'Popular pick', price: 13.49 },
    { id: 'quick-4', name: 'Avocado Toast', subtext: 'Healthy choice', price: 8.49 },
]

const baseMenuItems = [
    { id: 1, name: 'Classic Margherita Pizza', category: 'Pizza', price: 8.99, image: 'https://images.unsplash.com/photo-1548365328-2c17c8e7b095?auto=format&fit=crop&w=900&q=80', description: 'Fresh mozzarella, basil and rich tomato sauce.' },
    { id: 2, name: 'Pepperoni Passion Pizza', category: 'Pizza', price: 10.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80', description: 'Loaded with pepperoni and melted cheese.' },
    { id: 3, name: 'Vegetable Supreme Pizza', category: 'Pizza', price: 9.49, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80', description: 'A colorful mix of peppers, onions, and mushrooms.' },
    { id: 4, name: 'Signature Beef Burger', category: 'Burgers', price: 12.49, image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80', description: 'Juicy beef patty with cheese, lettuce and pickles.' },
    { id: 5, name: 'Chicken Crunch Burger', category: 'Burgers', price: 11.99, image: 'https://images.unsplash.com/photo-1545987790-4b6f5e3b1e0b?auto=format&fit=crop&w=900&q=80', description: 'Crispy chicken with spicy mayo and crunchy slaw.' },
    { id: 6, name: 'Thai Green Curry', category: 'Indian', price: 13.49, image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80', description: 'Creamy curry with coconut milk and fragrant basil.' },
    { id: 7, name: 'Butter Chicken', category: 'Indian', price: 14.49, image: 'https://images.unsplash.com/photo-1600787021607-1e6f1ce75fb9?auto=format&fit=crop&w=900&q=80', description: 'Rich tomato gravy with tender chicken pieces.' },
    { id: 8, name: 'Garlic Naan', category: 'Indian', price: 2.99, image: 'https://images.unsplash.com/photo-1612456462686-212aaed0546d?auto=format&fit=crop&w=900&q=80', description: 'Soft naan bread brushed with garlic butter.' },
    { id: 9, name: 'Sushi Roll Platter', category: 'Asian', price: 18.99, image: 'https://images.unsplash.com/photo-1498654205806-3d3d5b1f0c2d?auto=format&fit=crop&w=900&q=80', description: 'Assorted sushi rolls with fresh wasabi and soy.' },
    { id: 10, name: 'Pad Thai Noodles', category: 'Asian', price: 13.99, image: 'https://images.unsplash.com/photo-1512058564366-c9e9c2f73dfc?auto=format&fit=crop&w=900&q=80', description: 'Stir-fried rice noodles with tamarind sauce.' },
    { id: 11, name: 'Crispy Spring Rolls', category: 'Asian', price: 7.99, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80', description: 'Golden rolls served with sweet chili sauce.' },
    { id: 12, name: 'Chocolate Brownie', category: 'Desserts', price: 6.49, image: 'https://images.unsplash.com/photo-1505253215591-4736d7fb4b6c?auto=format&fit=crop&w=900&q=80', description: 'Warm chocolate brownie with ice cream.' },
    { id: 13, name: 'Strawberry Cheesecake', category: 'Desserts', price: 6.99, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80', description: 'Creamy cheesecake topped with fresh berries.' },
    { id: 14, name: 'Mango Lassi', category: 'Beverages', price: 4.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', description: 'Refreshing mango yogurt drink.' },
    { id: 15, name: 'Iced Americano', category: 'Beverages', price: 3.99, image: 'https://images.unsplash.com/photo-1495474472289-4d9dc4175739?auto=format&fit=crop&w=900&q=80', description: 'Strong espresso served over ice.' },
    { id: 16, name: 'Vegan Buddha Bowl', category: 'Salads', price: 12.99, image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80', description: 'Quinoa, greens, roasted veggies and tahini.' },
    { id: 17, name: 'Caesar Salad', category: 'Salads', price: 10.49, image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f99a?auto=format&fit=crop&w=900&q=80', description: 'Crisp romaine with parmesan and croutons.' },
    { id: 18, name: 'Avocado Toast', category: 'Breakfast', price: 8.49, image: 'https://images.unsplash.com/photo-1499638518314-9a8abbceedf6?auto=format&fit=crop&w=900&q=80', description: 'Sourdough toast topped with avocado smash.' },
    { id: 19, name: 'Pancake Stack', category: 'Breakfast', price: 9.49, image: 'https://images.unsplash.com/photo-1505253215591-4736d7fb4b6c?auto=format&fit=crop&w=900&q=80', description: 'Fluffy pancakes with maple syrup.' },
    { id: 20, name: 'Chicken Caesar Wrap', category: 'Wraps', price: 9.99, image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb40?auto=format&fit=crop&w=900&q=80', description: 'Grilled chicken, lettuce and parmesan in a wrap.' },
    { id: 21, name: 'Berry Yogurt Parfait', category: 'Desserts', price: 5.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', description: 'Layered yogurt, granola and fresh berries.' },
    { id: 22, name: 'BBQ Chicken Pizza', category: 'Pizza', price: 11.49, image: 'https://images.unsplash.com/photo-1601924582975-dd1b60b139ad?auto=format&fit=crop&w=900&q=80', description: 'Smoky BBQ chicken with red onions and cilantro.' },
    { id: 23, name: 'Fresh Fruit Salad', category: 'Salads', price: 7.49, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', description: 'Seasonal fruit with a honey citrus glaze.' },
    { id: 24, name: 'Espresso Shot', category: 'Beverages', price: 2.99, image: 'https://images.unsplash.com/photo-1495474472289-4d9dc4175739?auto=format&fit=crop&w=900&q=80', description: 'Intense and aromatic espresso shot.' },
]

const catalog = createLargeCatalog(baseMenuItems, 100000)
let filteredItems = catalog.slice()
let currentCategory = ''
let currentQuery = ''
let currentIndex = 0
const itemsPerPage = 24

function updateCartCount() {
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)
    }
}

function saveCart() {
    localStorage.setItem('blinkCart', JSON.stringify(cart))
    updateCartCount()
}

function addToCart(itemId, itemName, price) {
    const existingItem = cart.find(item => item.id === itemId)
    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({ id: itemId, name: itemName, price: parseFloat(price), quantity: 1 })
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
                    <button onclick="removeFromCart(${index})">Remove</button>
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

function createLargeCatalog(baseItems, totalCount) {
    const catalog = []
    for (let i = 0; i < totalCount; i += 1) {
        const template = baseItems[i % baseItems.length]
        const variant = Math.floor(i / baseItems.length) + 1
        catalog.push({
            id: `${template.id}-${variant}`,
            name: `${template.name} ${variant}`,
            category: template.category,
            price: template.price,
            image: template.image,
            description: template.description,
        })
    }
    return catalog
}

function renderFeatured() {
    const featuredGrid = document.getElementById('featured-grid')
    if (!featuredGrid) return
    featuredGrid.innerHTML = featuredItems.map(item => `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+'">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">$${item.price.toFixed(2)}</span>
            </div>
        </div>
    `).join('')
}

function renderCategories() {
    const categoryGrid = document.getElementById('category-grid')
    const categoryList = document.getElementById('menu-category-list')
    const categoryMarkup = menuCategories.map(category => `
        <button class="category-card" data-category="${category.name}">
            <img src="${category.image}" alt="${category.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHJ4PSIyMiIgZmlsbD0iI2RkZCIvPjwvc3ZnPg=='">
            <h3>${category.name}</h3>
        </button>
    `).join('')

    if (categoryGrid) categoryGrid.innerHTML = categoryMarkup
    if (categoryList) categoryList.innerHTML = menuCategories.map(category => `
        <button class="category-chip" data-category="${category.name}">${category.name}</button>
    `).join('')

    document.querySelectorAll('.category-card, .category-chip').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category
            if (currentCategory === category) {
                currentCategory = ''
            } else {
                currentCategory = category
            }
            updateCategorySelection()
            applyFilters()
        })
    })
}

function renderFlashDeals() {
    const flashDealsContainer = document.getElementById('flash-deals-list')
    if (!flashDealsContainer) return
    flashDealsContainer.innerHTML = flashDealItems.map(item => `
        <div class="flash-deal-card">
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHJ4PSIxOCIgZmlsbD0iI2RkZCIvPjwvc3ZnPg=='">
            <div class="flash-deal-meta">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="flash-deal-bottom">
                    <span class="deal-badge">Flash</span>
                    <button class="add-to-cart" data-id="${item.id}" data-item="${item.name}" data-price="${item.price}">$${item.price.toFixed(2)}</button>
                </div>
            </div>
        </div>
    `).join('')
}

function renderQuickOrder() {
    const quickOrderContainer = document.getElementById('quick-order-list')
    if (!quickOrderContainer) return
    quickOrderContainer.innerHTML = quickOrderItems.map(item => `
        <button class="quick-order-chip add-to-cart" data-id="${item.id}" data-item="${item.name}" data-price="${item.price}">
            <div>
                <strong>${item.name}</strong>
                <small>${item.subtext}</small>
            </div>
            <span>$${item.price.toFixed(2)}</span>
        </button>
    `).join('')
}

function updateCategorySelection() {
    document.querySelectorAll('.category-chip').forEach(chip => {
        if (chip.dataset.category === currentCategory) {
            chip.classList.add('active')
        } else {
            chip.classList.remove('active')
        }
    })
}

function buildFilter() {
    const query = currentQuery.trim().toLowerCase()
    filteredItems = catalog.filter(item => {
        const matchesSearch = query === '' || item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
        const matchesCategory = currentCategory === '' || item.category === currentCategory
        return matchesSearch && matchesCategory
    })
    currentIndex = 0
}

function updateResultsCount() {
    const resultsCount = document.getElementById('results-count')
    if (!resultsCount) return
    resultsCount.textContent = `Showing ${Math.min(currentIndex, filteredItems.length)} of ${filteredItems.length.toLocaleString()} items`
}

function createMenuCard(item) {
    return `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+'">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-meta">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${item.id}" data-item="${item.name}" data-price="${item.price}">Add to Cart</button>
                </div>
            </div>
        </div>
    `
}

function displayMenuItems() {
    const menuGrid = document.getElementById('menu-grid')
    const loadMoreBtn = document.getElementById('load-more-btn')
    if (!menuGrid || !loadMoreBtn) return

    const nextItems = filteredItems.slice(currentIndex, currentIndex + itemsPerPage)
    if (currentIndex === 0) {
        menuGrid.innerHTML = ''
    }
    menuGrid.insertAdjacentHTML('beforeend', nextItems.map(createMenuCard).join(''))
    const newItems = menuGrid.querySelectorAll('.menu-item:not(.section-reveal)')
    newItems.forEach(el => {
        el.classList.add('section-reveal')
        el.classList.add('visible')
        if (scrollObserver) {
            scrollObserver.observe(el)
        }
    })
    currentIndex += nextItems.length
    loadMoreBtn.style.display = currentIndex < filteredItems.length ? 'inline-flex' : 'none'
    updateResultsCount()
    attachAddToCartListeners()
}

function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.removeEventListener('click', addCartButtonHandler)
        button.addEventListener('click', addCartButtonHandler)
    })
}

function addCartButtonHandler() {
    const itemId = this.dataset.id
    const itemName = this.dataset.item
    const price = this.dataset.price
    addToCart(itemId, itemName, price)
}

function applyFilters() {
    buildFilter()
    displayMenuItems()
}

let scrollObserver = null

function initScrollAnimations() {
    const revealTargets = document.querySelectorAll('section, .category-card, .product-card, .menu-item, .flash-deal-card, .quick-order-chip, .highlight-card')
    if (revealTargets.length === 0) return

    revealTargets.forEach(el => el.classList.add('section-reveal'))

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach(el => el.classList.add('visible'))
        return
    }

    scrollObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
        })
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
    })

    revealTargets.forEach(el => scrollObserver.observe(el))
}

function observeNewRevealItems() {
    if (!scrollObserver) return
    document.querySelectorAll('.menu-item.section-reveal').forEach(el => {
        if (!el.classList.contains('visible')) {
            scrollObserver.observe(el)
        }
    })
}

function initMenuPage() {
    const searchInput = document.getElementById('menu-search')
    const searchButton = document.getElementById('menu-search-btn')
    const loadMoreBtn = document.getElementById('load-more-btn')

    if (!searchInput || !searchButton || !loadMoreBtn) return

    const params = new URLSearchParams(window.location.search)
    const initialQuery = params.get('search') || ''
    const initialCategory = params.get('category') || ''

    currentQuery = initialQuery
    currentCategory = initialCategory
    searchInput.value = currentQuery

    updateCategorySelection()
    buildFilter()
    displayMenuItems()

    searchButton.addEventListener('click', () => {
        currentQuery = searchInput.value
        applyFilters()
    })

    searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            currentQuery = searchInput.value
            applyFilters()
        }
    })

    loadMoreBtn.addEventListener('click', () => {
        displayMenuItems()
    })
}

function initHeroSearch() {
    const heroSearch = document.getElementById('hero-search')
    const heroSearchBtn = document.getElementById('hero-search-btn')
    if (!heroSearch || !heroSearchBtn) return

    const searchRedirect = () => {
        const query = heroSearch.value.trim()
        if (query) {
            window.location.href = `menu.html?search=${encodeURIComponent(query)}`
        } else {
            window.location.href = 'menu.html'
        }
    }

    heroSearchBtn.addEventListener('click', searchRedirect)
    heroSearch.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            searchRedirect()
        }
    })
}

function initPage() {
    updateCartCount()
    displayCart()
    renderFeatured()
    renderCategories()
    renderFlashDeals()
    renderQuickOrder()
    initHeroSearch()
    initMenuPage()
    initScrollAnimations()

    const contactForm = document.getElementById('contact-form')
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault()
            alert('Thank you for your message! We\'ll get back to you soon.')
            this.reset()
        })
    }

    const checkoutBtn = document.getElementById('checkout-btn')
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            alert('Thank you for your order! Your food will be delivered soon.')
            cart = []
            saveCart()
            displayCart()
        })
    }
}

document.addEventListener('DOMContentLoaded', initPage)

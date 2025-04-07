const products = [
    { 
        id: 1, 
        name: '精品咖啡杯', 
        price: 99,
        description: '优质陶瓷，保温效果好',
        link: 'https://24h.pchome.com.tw/search/?q=%E5%92%96%E5%95%A1%E6%9D%AF'
    },
    { 
        id: 2, 
        name: '时尚双肩包', 
        price: 199,
        description: '大容量，防水面料',
        link: 'https://www.bing.com/shop/productpage?q=%e6%97%b6%e5%b0%9a%e5%8f%8c%e8%82%a9%e5%8c%85&filters=scenario%3a%2217%22+gType%3a%2212%22+gId%3a%2260078323678%22+gIdHash%3a%220%22+gGlobalOfferIds%3a%2260078323678%22+AucContextGuid%3a%220%22+GroupEntityId%3a%2260078323678%22+NonSponsoredOffer%3a%22True%22&productpage=true&FORM=SHPPDP&browse=true'
    },
    { 
        id: 3, 
        name: '无线耳机', 
        price: 299,
        description: '高音质，续航持久',
        link: 'https://versus.com/cn/wireless-earbud/top'
    }
];

let cart = [];

function renderProducts(productsToRender = products) {
    const productContainer = document.querySelector('.products');
    productContainer.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <a href="${product.link}" target="_blank">
                <h3>${product.name}</h3>
            </a>
            <p class="description">${product.description}</p>
            <p class="price">¥${product.price}</p>
            <button onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> 加入购物车
            </button>
        `;
        
        productContainer.appendChild(productCard);
    });
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        return;
    }

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showNotification('商品已添加到购物车！');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>数量: ${item.quantity} × ¥${item.price}</p>
            </div>
            <div>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    const totalPrice = document.getElementById('total-price');
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPrice.textContent = `¥${total}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

function checkout() {
    if (cart.length === 0) {
        alert('购物车是空的！');
        return;
    }
    alert('感谢您的购买！');
    cart = [];
    updateCart();
    toggleCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
});

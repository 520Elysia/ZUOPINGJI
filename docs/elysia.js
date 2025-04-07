const products = [
    {
        id: 1,
        name: '阿帕奇武装直升机',
        price: 680000000,
        description: '先进的武装直升机，配备30毫米机炮和各类导弹',
        link: 'https://www.boeing.com/defense/ah-64-apache/'
    },
    {
        id: 2,
        name: 'ViaSat-3美洲星',
        price: 2400000000,
        description: '高通量通信卫星，单星容量超1Tbps',
        link: 'https://www.viasat.com/space-innovation/satellite-fleet/viasat-3/'
    },
    {
        id: 3,
        name: 'Frontier超级计算机',
        price: 6000000000,
        description: '世界首台E级超算，计算能力突破百亿亿次',
        link: 'https://www.ornl.gov/frontier'
    },
    {
        id: 4,
        name: 'RS-28"萨尔马特"',
        price: 12000000000,
        description: '洲际弹道导弹，射程超过18000公里',
        link: 'https://missilethreat.csis.org/missile/rs-28-sarmat/'
    },
    {
        id: 5,
        name: '尼米兹级航母群',
        price: 35000000000,
        description: '核动力航空母舰，搭载80+架各型舰载机',
        link: 'https://www.navy.mil/Resources/Fact-Files/Display-FactFiles/Article/2169795/aircraft-carriers-cvn/'
    },
    {
        id: 6,
        name: 'High NA EUV光刻机',
        price: 52000000000,
        description: '先进半导体制造设备，可制造2nm以下芯片',
        link: 'https://www.asml.com/en/products/euv-lithography-systems'
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
                <p class="description">${product.description}</p>
                <div class="price">¥${product.price}</div>
            </a>
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

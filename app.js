// Product Data
const products = [
    {
        id: 1,
        name: "White Casual Sneaker",
        price: 70,
        icon: "👟"
    },
    {
        id: 2,
        name: "MACTREE Men's Mild Top Ankle Boots",
        price: 90,
        icon: "👢"
    },
    {
        id: 3,
        name: "Campus Men's OG-03 Sneakers",
        price: 75,
        icon: "👞"
    },
    {
        id: 4,
        name: "ASIAN Men's Sports Shoes",
        price: 68,
        icon: "🏃"
    }
];

// Product Card Component
function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <span style={{ fontSize: '70px' }}>{product.icon}</span>
            </div>
            <h3>{product.name}</h3>
            <div className="product-price">${product.price}</div>
            <button 
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product)}
            >
                <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    );
}

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">${item.price}</span>
            </div>
            <div className="cart-item-controls">
                <button 
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                    -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                    +
                </button>
                <button 
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                >
                    <i className="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    );
}

// Main App Component
function App() {
    // useState hook for cart management
    const [cart, setCart] = React.useState([]);

    // Add to cart function
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Update quantity function
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    // Remove from cart function
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Calculate total amount
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="nav-brand">
                    <i className="fas fa-shoe-prints"></i> ShoeStore
                </div>
                <div className="nav-links">
                    <a href="#"><i className="fas fa-home"></i> Home</a>
                    <a href="#"><i className="fas fa-tags"></i> Categories</a>
                    <a href="#"><i className="fas fa-info-circle"></i> About Us</a>
                </div>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                {/* Left Column - Products */}
                <div className="products-section">
                    <h2><i className="fas fa-shoe-prints"></i> Product Listings</h2>
                    <div className="products-grid">
                        {products.map(product => (
                            <ProductCard 
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column - Shopping Cart */}
                <div className="cart-section">
                    <div className="cart-container">
                        <h2><i className="fas fa-shopping-cart"></i> Shopping Cart</h2>
                        
                        {cart.length === 0 ? (
                            <div className="empty-cart">
                                <i className="fas fa-shopping-basket"></i>
                                <p>Your cart is empty</p>
                                <p style={{ fontSize: '14px', marginTop: '10px' }}>
                                    Add some shoes to get started!
                                </p>
                            </div>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <CartItem 
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeFromCart}
                                    />
                                ))}
                                
                                <div className="cart-total">
                                    <h3>Total Amount:</h3>
                                    <div className="total-amount">${calculateTotal().toFixed(2)}</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
                <p>&copy; 2026 ShoeStore. All rights reserved.</p>
            </footer>
        </div>
    );
}

// Render the App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
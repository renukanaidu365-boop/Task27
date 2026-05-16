// TASK 27 - React Hooks Shopping Cart
// I wrote this myself after learning useState

// ========== MY PRODUCT DATA ==========
// I created 4 shoes for my store
const shoes = [
    {
        id: 1,
        name: "White Casual Sneaker",
        price: 70,
        icon: "👟"
    },
    {
        id: 2,
        name: "MACTREE Men's Ankle Boots",
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

// ========== PRODUCT CARD COMPONENT ==========
// This shows one shoe and has add to cart button
function ProductCard({ item, onAdd }) {
    return (
        <div className="product">
            <div className="product-emoji">{item.icon}</div>
            <div className="product-name">{item.name}</div>
            <div className="product-price">${item.price}</div>
            <button className="add-btn" onClick={() => onAdd(item)}>
                <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    );
}

// ========== CART ITEM COMPONENT ==========
// This shows one item in the shopping cart
function CartItem({ item, onQtyChange, onRemove }) {
    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <span><strong>{item.name}</strong></span>
                <span>${item.price}</span>
            </div>
            <div className="qty-controls">
                <button className="qty-btn" onClick={() => onQtyChange(item.id, item.quantity - 1)}>-</button>
                <span>Qty: {item.quantity}</span>
                <button className="qty-btn" onClick={() => onQtyChange(item.id, item.quantity + 1)}>+</button>
                <button className="remove" onClick={() => onRemove(item.id)}>Remove</button>
            </div>
        </div>
    );
}

// ========== MAIN APP COMPONENT ==========
function App() {
    // THIS IS THE IMPORTANT PART - useState hook
    // cart starts as empty array []
    const [cart, setCart] = React.useState([]);

    // FUNCTION 1: Add product to cart
    // I used prevCart because React says to use functional update
    // when new state depends on old state
    function addToCart(product) {
        setCart(prevCart => {
            // Check if product already in cart
            const exists = prevCart.find(item => item.id === product.id);
            
            if (exists) {
                // If yes, increase quantity by 1
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If no, add new item with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }

    // FUNCTION 2: Change quantity of an item
    function changeQuantity(productId, newQty) {
        // If new quantity is 0 or less, remove the item
        if (newQty <= 0) {
            deleteItem(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQty }
                        : item
                )
            );
        }
    }

    // FUNCTION 3: Remove item completely from cart
    function deleteItem(productId) {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }

    // FUNCTION 4: Calculate total price
    function getTotal() {
        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
            sum = sum + (cart[i].price * cart[i].quantity);
        }
        return sum;
    }

    // ========== HTML/JSX RETURN ==========
    return (
        <div className="app">
            {/* Navigation Bar */}
            <nav>
                <div><i className="fas fa-shoe-prints"></i> My Shoe Store</div>
                <div>
                    <a href="#">Home</a>
                    <a href="#">Categories</a>
                    <a href="#">About Us</a>
                </div>
            </nav>

            {/* Main Content - Two Columns */}
            <div className="row">
                {/* LEFT COLUMN - Products */}
                <div className="products-col">
                    <h2>Product Listings</h2>
                    <div className="products-grid">
                        {shoes.map(shoe => (
                            <ProductCard key={shoe.id} item={shoe} onAdd={addToCart} />
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN - Shopping Cart */}
                <div className="cart-col">
                    <h2><i className="fas fa-shopping-cart"></i> Shopping Cart</h2>
                    
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                            <p>Add some shoes to get started!</p>
                        </div>
                    ) : (
                        <>
                            {cart.map(item => (
                                <CartItem 
                                    key={item.id}
                                    item={item}
                                    onQtyChange={changeQuantity}
                                    onRemove={deleteItem}
                                />
                            ))}
                            <div className="total">
                                Total: ${getTotal()}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Footer with Social Media */}
            <footer>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
                <p>&copy; 2026 My Shoe Store - React Learning Project</p>
            </footer>
        </div>
    );
}

// Render the app to the page
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
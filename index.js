<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Custom Shopify Store</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>My Store</h1>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
            <div class="cart-icon">
                <span id="cart-count">0</span>
                <a href="#" id="view-cart">Cart</a>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <h2>Welcome to My Store</h2>
            <p>Browse our collection of high-quality products.</p>
            
            <div class="featured-products">
                <h3>Featured Products</h3>
                <div id="products-container" class="products-grid">
                    <!-- Products will be loaded here via JavaScript -->
                    <div class="loading">Loading products...</div>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 My Store. All rights reserved.</p>
        </div>
    </footer>

    <!-- Cart modal -->
    <div id="cart-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Your Cart</h2>
            <div id="cart-items"></div>
            <div class="cart-total">
                <p>Total: <span id="cart-total-price">$0.00</span></p>
                <button id="checkout-button">Checkout</button>
            </div>
        </div>
    </div>

    <script src="shopify.js"></script>
    <script src="app.js"></script>
</body>
</html>

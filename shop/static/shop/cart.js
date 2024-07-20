// Initialize cart from localStorage
if (localStorage.getItem('cart') == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

// Function to update cart count
function updateCartCount() {
    let count = 0;
    for (let item in cart) {
        count += cart[item][1]; // Sum up the quantities
    }
    document.getElementById("cart").innerHTML = "Cart(" + count + ")";
}

// Function to display cart items in the popover
function displayCart() {
    var cartStr = "<h5>This is your cart</h5>";
    var cartIdx = 1;

    for (let item in cart) {
        cartStr += cartIdx + ". ";
        cartStr += `Name - ${cart[item][0]}, Quantity - ${cart[item][1]}, Price - ${cart[item][2]}, MRP - ${cart[item][3]}<br/>`;
        cartIdx += 1;
    }

    cartStr += "<a href='/checkout'><button class='btn btn-warning' id='checkout'>Checkout</button></a>";
    document.getElementById("cart").setAttribute('data-content', cartStr);
    $('[data-toggle="popover"]').popover(); // Initialize popover
}

// Add to cart functionality
$(document).on('click', '.atc', function() {
    var item_id = this.id.toString();

    let price = parseFloat(document.getElementById("price" + item_id).innerHTML);
    let mrp = parseFloat(document.getElementById("mrp" + item_id).innerHTML);
    let name = document.getElementById("nm" + item_id).innerHTML;

    // Ensure price and mrp are valid numbers
    if (isNaN(price)) price = 0;
    if (isNaN(mrp)) mrp = 0;

    if (cart[item_id] != undefined) {
        // Update existing item
        cart[item_id][1] += 1; // Increase quantity
    } else {
        // Add new item
        cart[item_id] = [name, 1, price, mrp];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart updated:", cart); // Debugging: Check the cart content
    updateCartCount();
    displayCart();
});

// Initialize cart count and display cart
$(document).ready(function() {
    updateCartCount();
    displayCart();
});

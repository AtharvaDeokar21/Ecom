if (localStorage.getItem('cart') == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

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
    DisplayCart(cart);
});

function updateCartCount() {
    document.getElementById("cart").innerHTML = "Cart(" + Object.keys(cart).length + ")";
}

function DisplayCart(cart) {
    var cartstr = "<h5>This is your cart</h5>";
    var cartidx = 1;

    for (let item in cart) {
        cartstr += cartidx + ". ";
        cartstr += `Name - ${cart[item][0]}, Quantity - ${cart[item][1]}, Price - ${cart[item][2]}, MRP - ${cart[item][3]}<br/>`;
        cartidx += 1;
    }

    cartstr += "<a href='/checkout'><button class='btn btn-warning' id='checkout'>Checkout</button></a>";
    document.getElementById("cart").setAttribute('data-content', cartstr);
    $('[data-toggle="popover"]').popover();
}

$(document).ready(function() {
    updateCartCount();
    DisplayCart(cart);
});

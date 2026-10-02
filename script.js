// ================= CART =================

let cart = [];


// Add food to cart
function addToCart(name, price) {

    let existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart!");
}


// Update cart
function updateCart() {

    let cartItems = document.getElementById("cart-items");

    let cartCount = document.getElementById("cart-count");

    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;


        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>
                <strong>${item.name}</strong>
                <br>
                ₹${item.price} × ${item.quantity}
            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span> ${item.quantity} </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

        `;

        cartItems.appendChild(div);

    });


    cartCount.innerText = count;

    cartTotal.innerText = total;
}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// Decrease quantity
function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();
}


// Open cart
function openCart() {

    document.getElementById("cart-modal").style.display = "flex";

}


// Close cart
function closeCart() {

    document.getElementById("cart-modal").style.display = "none";

}


// Go to booking
function goToBooking() {

    if (cart.length === 0) {

        alert("Please add some food to your cart first.");

        return;
    }

    closeCart();

    document.getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ================= SEARCH =================

function searchFood() {

    let searchValue =
        document.getElementById("search")
        .value
        .toLowerCase();


    let cards =
        document.querySelectorAll(".food-card");


    cards.forEach(card => {

        let foodName =
            card.querySelector("h3")
            .innerText
            .toLowerCase();


        if (foodName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// ================= FILTER =================

function filterFood(category) {

    let cards =
        document.querySelectorAll(".food-card");


    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// ================= BOOKING =================

document
    .getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Please add at least one food item before booking."
            );

            return;
        }


        let name =
            document.getElementById("name").value;

        let date =
            document.getElementById("date").value;

        let payment =
            document.getElementById("payment").value;


        let total =
            cart.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );


        document.getElementById("confirmation-text")
            .innerHTML = `

                Thank you, <strong>${name}</strong>!<br><br>

                Your food booking has been confirmed.<br>

                📅 Date: ${date}<br>

                💳 Payment: ${payment}<br>

                💰 Total: ₹${total}

            `;


        document.getElementById("success-modal")
            .style.display = "flex";


        // Clear cart

        cart = [];

        updateCart();

        this.reset();

    });


// Close confirmation
function closeSuccess() {

    document.getElementById("success-modal")
        .style.display = "none";

}


// Close modal when clicking outside
window.onclick = function(event) {

    let cartModal =
        document.getElementById("cart-modal");

    let successModal =
        document.getElementById("success-modal");


    if (event.target === cartModal) {

        cartModal.style.display = "none";

    }


    if (event.target === successModal) {

        successModal.style.display = "none";

    }

};

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC687FUZzqgE4Ly-ml_Xcjh8dYkwB658Q8",
    authDomain: "finalproject-4cde9.firebaseapp.com",
    projectId: "finalproject-4cde9",
    storageBucket: "finalproject-4cde9.appspot.com",
    messagingSenderId: "495142280308",
    appId: "1:495142280308:web:292099208ed4ba07f08521"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 


// detect auth state
onAuthStateChanged(auth, (user) => {

    if (user != null) {
    console.log("logged in");

    $("#signIn").val("SignOut").attr("id", "signOut");
    $("nav ul .login").html(`<a href="#" id="signOut">Logout</a>`);
    $(".hamburger-icon ul .login").html(`<a href="#" id="signOut">Logout</a>`);

    $('nav').on('click', '#signOut', function (e) {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                // Signed out
                console.log("Signed Out");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Message: " + errorCode)
            });
    });

    }
     
    else {
    console.log("No user");
    
    
    $('.modal-body').on('click', '#createAcctBtn', function (e) {
        e.preventDefault();
        let fName = $("#fNameC").val();
        let lName = $("#lNameC").val();
        let email = $("#emailC").val();
        let pw = $("#pwC").val();
    
        createUserWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
    
                // Update user profile with first and last name
                return updateProfile(user, {
                    displayName: `${fName} ${lName}`,
                });
            })
            .then(() => {
                // Profile updated successfully
                alert(`Signed up successfully.`);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Message: " + errorMessage);
            });
    });

    $('.modal-body').on('click', '#signIn', function (e) {
        e.preventDefault();
        let email = $("#emailL").val();
        let pw = $("#pwL").val();
        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                // Signed in 
                currentUser = userCredential.user;
                let displayName = currentUser.displayName;
                alert('User signed in:', displayName);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Message: " + errorMessage)
            });
    });


    }
    
});

var clicker = 0;
$(".hamburger-icon").on("click", () => {
    $(".hamburger-icon").toggleClass("open");
    
    if (clicker == 0){
        $(".footer").hide();
        $("#app").hide();
        clicker = 1;
    } else {
        $(".footer").show();
        $("#app").show();
        clicker = 0;
    }
    
});




function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace('#', '');

    if (pageID != '') {
        $.get(`pages/${pageID}.html`, function (data) {
            $('#app').html(data);

            if (pageID == 'coffeeMakers') {
                initListeners();
            }

            else if (pageID == 'cart') {
                displayCart();
            }


        });
    } else {
        $.get(`pages/coffeeMakers.html`, function (data) {
            $('#app').html(data);
        });
    }


}



function initURLListener() {
    $(window).on('hashchange', changeRoute);
    changeRoute();
}
let currentUser;

function initListeners() {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('Error loading products:', error));
}



  
    
const cart = [];

// Function to display products
function displayProducts(products) {
    const container = document.getElementById('objectsHolder');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
        <div class="coffee_makers">
            <div class="imageHolder">
                <img src="${product.imageUrl}" alt="" />
            </div>
            <div class="titleDesc">
                <h4>${product.name}</h4>
                <div class="price">${product.price.toFixed(2)}</div>
                <div class="shipping">Free shipping</div>
                <button class="addToCartBtn" onclick="addToCart('${product.id}', '${product.imageUrl}', '${product.name}', ${product.price.toFixed(2)})">Add to Cart</button>
            </div>
        </div>
        `;

        container.appendChild(productDiv);
    });

    window.addToCart = function (productID, productImage, productName, productPrice) {
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const item = { id: productID, image: productImage, name: productName, price: productPrice, quantity: 1 };
            cart.push(item);
        }

        displayCart();
    };
}

// Function to display the cart
function displayCart() {
    // Wait for the document to be fully loaded
    document.addEventListener('DOMContentLoaded', function () {
        // Get the cartContainer element
        const cartContainer = document.getElementById('cartPage');

        // Check if the element exists
        if (cartContainer) {
            // Clear the container first
            cartContainer.innerHTML = '';

            if (cart.length === 0) {
                cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                // Iterate through the cart items and display them
                cart.forEach(item => {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.className = 'addedObjects';
                    cartItemDiv.innerHTML = `
                        <div class="cartImageHolder">
                            <img src="${item.image}" alt="" />
                        </div>
                        <h5>${item.name}</h5>
                        <p>Quantity: 1</p>
                        <p>Total Price: ${item.price.toFixed(2)}</p>
                        <p>delete</p>
                    `;
                    cartContainer.appendChild(cartItemDiv);
                });
            }
        } else {
            console.error("Element with id='cartPage' not found.");
        }
    });
}


window.deleteFromCart = function (productName) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            const index = cart.indexOf(existingItem);
            cart.splice(index, 1);
        }

        displayCart();
    }
};
 
 


document.addEventListener('DOMContentLoaded', function () {
    initURLListener();
    initListeners();
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('Error loading products:', error));
});

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// import {getAuth,signOut,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDjErHaJcgMRk91F0GUSQ16jMRLI1a7aSc",
  authDomain: "homework7-f4b59.firebaseapp.com",
  projectId: "homework7-f4b59",
  storageBucket: "homework7-f4b59.appspot.com",
  messagingSenderId: "216642528783",
  appId: "1:216642528783:web:6ac253bc643bba552ea57a",
  measurementId: "G-V31GXJ7CXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 




$(".hamburger-icon").on("click", () => {
    $(".hamburger-icon").toggleClass("open");

});



function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace('#', '');

    if (pageID != '') {
        $.get(`pages/${pageID}.html`, function (data) {
            $('#app').html(data);

            
            if (pageID == 'createRecipe') {
                if (loginStatus == false){
                    alert("You are not logged in.")
                    $.get(`pages/home.html`, function (data) {
                        $('#app').html(data);
                        });
                }
                else{
                setTimeout(function () {
                    $('#app .formPage .formHolder .user').html(`<h4>Hey ${currentUser.displayName}, create your recipe!</h4>`);
                }, 0);
                }
            }

            else if (pageID == 'userRecipe') {

                if (recipes.length == 0) {
                    console.log('Recipe here: ');
                    setTimeout(function () {
                        $('#app .recipePage .viewRecipe .user').html(`<h2>Hey ${currentUser.displayName}, you have no recipe!</h2>`);
                    }, 0);
                }
                else{
                setTimeout(function () {
                    $('#app .formPage .formHolder .user').html(`<h2>Hey ${currentUser.displayName}, here are your recipes!</h2>`);
                    $.each(recipes, (idx, recipe) => {
                        $('.userRecipe').append(`<div class="recipeHolder">
                        <div class="recipe">
                          <div class="imageHolder">
                            <img src="${recipe.imagePath}" alt="" />
                          </div>
                          <div class="titleDesc">
                            <h3><u>${recipe.itemName}</u></h3>
                            <p>
                              ${recipe.itemDesc}
                            </p>
                            <div class="recipeTimeDesc">${recipe.itemTime}</div>
                            <div class="servingTimeDesc">${recipe.itemSize}</div>
                          </div>
                        </div>
                      </div>`)
                    })
                }, 0);
                }
            }


        });
    } else {
        $.get(`pages/home.html`, function (data) {
            $('#app').html(data);
        });
    }
}

function initURLListener() {
    $(window).on('hashchange', changeRoute);
    changeRoute();
}


var initialIngredCount = 3;
var initialInstrCount = 3;
var recipes = []
var loginStatus = false;
let currentUser;

function initListeners() {
    
    $('#app').on('click', '#createAcctBtn', function (e) {
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

    $('#app').on('click', '#signIn', function (e) {
        e.preventDefault();
        let email = $("#emailL").val();
        let pw = $("#pwL").val();
        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                // Signed in 
                currentUser = userCredential.user;
                let displayName = currentUser.displayName;
                $("#signIn").val("SignOut").attr("id", "signOut");
                $("nav ul").html(`<li><a href="#home">Home</a></li>
                <li><a href="#viewRecipe">Browse</a></li>
                <li><a href="#createRecipe">Create Recipe</a></li>
                <li><a href="#userRecipe">Your Recipes</a></li>
                <li class="login"><a href="#login">Logout</a></li>`);
                $(".hamburger-icon ul").html(`<li><a href="#home">Home</a></li>
                <li><a href="#viewRecipe">Browse</a></li>
                <li><a href="#createRecipe">Create Recipe</a></li>
                <li><a href="#userRecipe">Your Recipes</a></li>
                <li class="login"><a href="#login">Logout</a></li>`);
                loginStatus = true;
                console.log('User signed in:', displayName);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Message: " + errorMessage)
            });
    });

    $('#app').on('click', '#signOut', function (e) {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                // Signed out
                console.log("Signed Out");
                $("#signOut").val("SignIn").attr("id", "signIn");
                loginStatus = false;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Message: " + errorCode)
            });
    });

    $('#app').on('click', '.ingredAddBtn', function (e) {
        initialIngredCount++
        $(".formIngred").append(
            `<input type="text" placeholder="Ingredient # ${initialIngredCount}" id="ingred${initialIngredCount-1}"/>`
        )
    });

    $('#app').on('click', '.instrAddBtn', function (e) {
        initialInstrCount++
        $(".formInstr").append(
            `<input type="text" placeholder="Instruction # ${initialInstrCount}" id="instr${initialInstrCount-1}"/>`
        )
    });

    $('#app').on('click', '.recipeBtn', function (e) {

        let newItemObj = {};

        let imagePath = $("#imagePath").val();
        let itemName = $("#itemName").val();
        let itemDesc = $("#itemDesc").val();
        let itemTime = $("#itemTime").val();
        let itemSize = $("#itemSize").val();
        
        newItemObj.imagePath = imagePath;
        newItemObj.itemName = itemName;
        newItemObj.itemDesc = itemDesc;
        newItemObj.itemTime = itemTime;
        newItemObj.itemSize = itemSize;

        newItemObj.ingredients = [];
        $(".formIngred input").each(function(index, data) {
            var value = $(this).val();
            if (value != "") {
                let keyName = 'ingredient' + index;
                let ingredObj = {};
                ingredObj[keyName] = value;
                newItemObj.ingredients.push(ingredObj);
            }
            
        });

        newItemObj.instrcutions = [];
        $(".formInstr input").each(function(index, data) {
            var value = $(this).val();
            if (value != "") {
                let keyName = 'instrcution' + index;
                let instrObj = {};
                instrObj[keyName] = value;
                newItemObj.instrcutions.push(instrObj);
            }
        });
        recipes.push(newItemObj);
        alert("Success!");
        console.log(recipes);
    });

    }
    


    $(document).ready(function () {
        initURLListener();
        initListeners();
    });
    

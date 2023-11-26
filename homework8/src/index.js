import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';


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
                            <h3><u><a class="dynamic-link" href="#userRecipeDesc" data-id="${recipe.itemName}">${recipe.itemName}</a></u></h3>
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

            else if (pageID == 'userRecipeDesc') {
                
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
                newItemObj.ingredients.push(value);
            }
        });
        

        newItemObj.instrcutions = [];
        $(".formInstr input").each(function(index, data) {
            var value = $(this).val();
            if (value != "") {
                newItemObj.instrcutions.push(value);
            }
        });
        
        recipes.push(newItemObj);
        alert("Success!");
        console.log(recipes);
    });

    $('#app').on('click', '.dynamic-link', function (e) {
        e.preventDefault();
        var dataId = $(this).attr('data-id');
        console.log('Clicked link with data-id:', dataId);
    
        
        $.get(`pages/userRecipeDesc.html`, function (data) {
          $('#app').html(data);
    
          
          var clickedRecipe = recipes.find(recipe => recipe.itemName === dataId);
            console.log('THIS', clickedRecipe);
          if (clickedRecipe) {
            
            $('#app .recipe-description').html(`<div class="recipe-heading">
            <h4>${clickedRecipe.itemName}</h4>
            <div class="recipe-imageHolder">
              <img src="${clickedRecipe.imagePath}" alt="" />
            </div>
            <div class="recipe-titleDesc">
              <p>
                Description: <br /><br />
                ${clickedRecipe.itemDesc}
              </p>
        
              <p>
                Total Time: <br /><br />
                ${clickedRecipe.itemTime} 
              </p>
              <p>
                Servings: <br /><br />
                ${clickedRecipe.itemSize} Serving
              </p>
            </div>
          </div>
          <div class="recipe-bottom">
            <h4>Ingredients:</h4>
            <ul>
            ${(() => {
                let htmlString = "";
                $.each(clickedRecipe.ingredients, (idx, ingredient) => {
                    htmlString += `<li>${ingredient}</li>`;
                });
                return htmlString;
            })()}
            
              
            </ul>
        
            <h4>Instructions:</h4>
            <ol>
            ${(() => {
                let htmlString = "";
                $.each(clickedRecipe.instrcutions, (idx, instruction) => {
                    htmlString += `<li>${instruction}</li>`;
                });
                return htmlString;
            })()}
            </ol></div>
            <a class="editBtn" data-id="${clickedRecipe.itemName}">Edit Recipe</a>`);
          } 

        });
      });

    $('#app').on('click', '.editBtn', function (e) {
    e.preventDefault();
    var dataId = $(this).attr('data-id');
    console.log('Clicked editbtn with data-id:', dataId);

    
    $.get(`pages/editRecipe.html`, function (data) {
        $('#app').html(data);

        
        var editRecipe = recipes.find(recipe => recipe.itemName === dataId);
        console.log('THIS edit', editRecipe);
        if (editRecipe) {
        
        $('#app .formPage .formHolder .formTop').html(`<div class="imageBtn">Attach file</div>
        <input
          type="text"
          id="imagePath"
          placeholder="Edit Recipe Image"
          required
        />
        <input type="text" id="itemName" placeholder="${editRecipe.itemName}" required />
        <input type="text" id="itemDesc" placeholder="${editRecipe.itemDesc}" required />
        <input type="text" id="itemTime" placeholder="${editRecipe.itemTime}" required />
        <input type="text" id="itemSize" placeholder="${editRecipe.itemSize}" required />`);

        $('#app .formPage .formHolder #button').html(`<div class="editRecipeBtn" data-id="${editRecipe.itemName}" >Edit Recipe</div>`);
        } 


        
    });
    });

    $('#app').on('click', '.editRecipeBtn', function (e) {
        e.preventDefault();
        var dataId = $(this).attr('data-id');
        console.log('Clicked edit THIS with data-id:', dataId);
    
        var editRecipe = recipes.find(recipe => recipe.itemName === dataId);
        console.log('THIS edit edit', editRecipe);
    
        if (editRecipe) {
            // Create an object to store the updated values
            let updatedRecipe = {};
    
            // Update properties with values from form inputs only if they are not empty
            updatedRecipe.imagePath = $("#imagePath").val();
            updatedRecipe.itemName = $("#itemName").val();
            updatedRecipe.itemDesc = $("#itemDesc").val();
            updatedRecipe.itemTime = $("#itemTime").val();
            updatedRecipe.itemSize = $("#itemSize").val();
    
            updatedRecipe.ingredients = [];
            $(".formIngred input").each(function (index, data) {
                var value = $(this).val();
                if (value !== "") {
                    updatedRecipe.ingredients.push(value);
                }
            });
    
            updatedRecipe.instrcutions = [];
            $(".formInstr input").each(function (index, data) {
                var value = $(this).val();
                if (value !== "") {
                    updatedRecipe.instrcutions.push(value);
                }
            });
    
            // Find the index of the existing recipe in the recipes array
            var index = recipes.findIndex(recipe => recipe.itemName === dataId);
    
            if (index !== -1) {
                // Loop through properties of updatedRecipe and update recipes only for non-empty values
                for (let prop in updatedRecipe) {
                    if (updatedRecipe.hasOwnProperty(prop) && updatedRecipe[prop] !== "") {
                        recipes[index][prop] = updatedRecipe[prop];
                    }
                }
    
                alert('Updated');
            }
        }
    });
    
    
    
    };

  
    

    $(document).ready(function () {
        initURLListener();
        initListeners();
    });
    

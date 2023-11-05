import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
            console.log('data ' + data);
            $('#app').html(data);
            });
        }
    else {
        $.get(`pages/home.html`, function (data) {
            $('#app').html(data);
            });
        }
    }

function initURLListener() {
    $(window).on('hashchange', changeRoute);
    changeRoute();
    }


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
        console.log(user);
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Message: " + errorCode)
        });
    });

    $('#app').on('click', '#signIn', function (e) {
        e.preventDefault();
        let email = $("#emailL").val();
        let pw = $("#pwL").val();
        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Message: " + errorCode)
            });
    });

    $('#app').on('click', '#signOut', function (e) {
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
    


    $(document).ready(function () {
        initURLListener();
        initListeners();
    });
    

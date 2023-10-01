var loggedIn = false;


export function changePage(pathArray){
    if(pathArray=="") {
        $.get(`pages/home.html`, (data) => {
            $("#app").html(data);
        })
    }
    else{
    $.get(`pages/${pathArray}.html`, (data) => {
        $("#app").html(data);
    });
}

}

export function setLoggedIn(){
    if (loggedIn == true){
        loggedIn =false;
        $("nav .log").html("<span>Log In</span>");
        $("#modal .modal-content-holder .modal-text").html("<h1>You have successfully Logged out.</h1>");
    }
    else{
        loggedIn = true;
        $("nav .log").html('<span style="background-color: red;">Log Out</span>');
        $("#modal .modal-content-holder .modal-text").html("<h1>You have successfully Logged in.</h1>");
    }

}
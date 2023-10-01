import { changePage, setLoggedIn } from "../model/model.js";

function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#","");
    let path = pageID.split("/");
    changePage(path)

}


function initListeners() {
    $("#modal").hide();


    $(".close").on("click", (e) => {
        $("#modal").toggle();
    });

    $("nav .log").on("click", (e)=>{
        $("#modal").toggle();
        e.preventDefault();
        setLoggedIn();
    });
};
 
$(document).ready(function () {
    initListeners();
    $(window).on("hashchange", route);
    route();
});
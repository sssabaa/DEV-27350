import { changePage } from "./model.js";

function route(){
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#","");
    let path = pageID.split("/");
    console.log(hashTag, path);
    changePage(path)

}


function initListeners(){
    console.log('hello');
}

$(document).ready(function() {
    initListeners();
    $(window).on("hashchange", route);
    route();
});
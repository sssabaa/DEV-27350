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

$(document).ready(function () {
initURLListener();
});

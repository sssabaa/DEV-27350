export function changePage(pathArray){
    $("#bread-crumb").html(``);

    if(pathArray=="") {
        $.get(`pages/home.html`, (data) => {
            $("#app").html(data);
        })
    }
    else {
        if (pathArray.length == 1) {
            $.get(`pages/${pathArray}.html`, (data) => {
                $("#app").html(data);
            })
        }
        else {
            $("#bread-crumb").html(`<a href="#${pathArray[0]}"> ${pathArray[0]}/${pathArray[1]}/ </a>`);
            $.get(`pages/${pathArray[1]}.html`, (data) => {
                $("#app").html(data);
            })
        }
        
    }
}
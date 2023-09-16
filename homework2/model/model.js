var loggedInOut = false;
var homeContent = `<h1>NakshiBazaar</h1>
<p>Products that keep the culture alive</p>
</div>
<br />
<span class="image"> <img src="images/logo.jpg" alt="" /> </span>`;
var aboutContent = `<div class="centered-box">
<p1>Nakshi Kantha, or “decorated quilt” in Bengali, is a form of art that resembles simplicity. It doesn’t have any barrier to entry, other than dedication and love for the art itself. You start by selecting the fabrics, often reused from old saris or lungis. Then comes the magical part – sketching intricate designs onto the fabric and stitching vibrant threads. These designs frequently represent everyday events, elements of nature, or timeless symbols, with unique stories. Nakshi Kantha has served as a medium for women to convey their experiences, dreams, and aspirations.</p1>
</div>`;
var missionContent = `<div style="text-align: center; margin-top: 50px;">
<h1>Our Mission</h1>
<p1>At NakshiBazaar, our mission is to share the artistry and heritage of Nakshi Kantha, the 'decorated quilt' in Bengali, with the world. Nakshi Kantha is a timeless form of art that embodies simplicity and creativity. We honor the dedicated artisans who craft each piece, starting with the selection of recycled fabrics and culminating in intricate designs and vibrant stitches, telling stories of everyday life, nature's elements, and timeless symbols</p1>
</div>`;
var contactContent = `<form action="action_page.php">
      
<label for="fname">First Name</label>
<input type="text" id="fname" name="First Name" placeholder="Your first/nick name">

<label for="lname">Last Name</label>
<input type="text" id="lname" name="Last Name" placeholder="Your last/family name">


<label for="subject">Subject</label>
<textarea id="subject" name="subject" placeholder="Your message" style="height:200px"></textarea>

<input type="submit" value="Submit">

</form>`;

export function addPageContent(pageName) {
    let pageContentName = pageName + "Content";
    $("#app").html(eval(pageContentName));
}

export function setLoggedInOut(){
    if (loggedInOut == true){
        loggedInOut =false;
        $("nav .log span").html("Log In");
    }
    else{
        loggedInOut = true;
        $("nav .log span").html("Log Out");
    }

}

export function getLoggedIn(){
    return loggedInOut;
}
// define title and text
var title = " ";
var text = " ";

// create template for card that holds note
var cardTemplate = 
"<div class='card'>\n" +
"   <div class='card-body'>\n" +
"       <h5 class='card-title'>Test</h5>\n" +
"       <p class='card-text'>TEST TEXT</p>\n" +
"   </div>\n" +
"</div>\n";

function newNote () {
    document.getElementsByClassName('newNote')[0].style.visibility = "visible";
}

function save () {
    title = document.getElementById('title').value;
    text = document.getElementById('textFill').value;
    $(cardTemplate).appendTo("body");
}



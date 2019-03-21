// define title and text
var title = " ";
var text = " ";

function newNote () {
    document.getElementsByClassName('newNote')[0].style.display = "block";
}

function save () {
    title = document.getElementById('title').value;
    text = document.getElementById('textFill').value;
    $("<div>" + title +" ------- " + text + "</div>").appendTo("body");
}
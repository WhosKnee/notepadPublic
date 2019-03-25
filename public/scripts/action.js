// have function to create card template
function createCardTemplate(title, text){
    return (
    "<div class='card col-lg-3 col-md-6 col-12'>\n" +
    "   <div class='card-body'>\n" +
    "       <h5 class='card-title'>" + title + "</h5>\n" +
    "       <p class='card-text'>" + text + "</p>\n" +
    "   <div class='row'>" +
    "       <button id='editExistingNote'class='btn btn-dark btn-sm col-6 existingButton'>Edit</button>"+
    "       <button id='deleteExistingNote'class='btn btn-dark btn-sm col-6 existingButton'>Delete</button>"+
    "   </div>" +
    "   </div>\n" +
    "</div>\n");
    
}
// function to make note visible to user
function newNote () {
    if(document.getElementsByClassName('newNote')[0].style.visibility != "visible"){
        document.getElementsByClassName('newNote')[0].style.visibility = "visible";
    }
    else {
        document.getElementById('title').value = "";
        document.getElementById('textFill').value = "";
    }
    
}

// function to save the note that the user made
function saveNote () {
    // fetch title and text to create card
    title = document.getElementById('title').value;
    text = document.getElementById('textFill').value;
    card = createCardTemplate(title, text);
    // append card to the page;
    $(card).appendTo("#holdNotes");
    // hide the note creation page
    deleteNote();
}

// function to delete the note before the user creates it
function deleteNote() {
    // make card hidden and reset input values to blank
    document.getElementsByClassName('newNote')[0].style.visibility = "hidden";
    document.getElementById('title').value = "";
    document.getElementById('textFill').value = "";
}



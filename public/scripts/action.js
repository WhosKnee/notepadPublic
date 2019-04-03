// have function to create card template
function createCardTemplate(title, text, id){
    return (
    "<div class='card col-lg-3 col-md-6 col-12'>\n" +
    "   <div class='card-body'>\n" +
    "       <h5 class='card-title'>" + title + "</h5>\n" +
    "       <p class='card-text'>" + text + "</p>\n" +
    "       <div class='row'>" +
    "           <form class='col-6' action='/note/" + id + "/edit?_method=PUT' method='POST'>" +
    "               <button type='submit' id='editExistingNote'class='btn btn-dark btn-sm col-6 existingButton'>Edit</button>"+
    "           </form>" +
    "           <form action='/note/" + id + "/?_method=DELETE' method='POST' onclick='hideCard('" + id + ')>' +
    "               <button type='submit' id='deleteExistingNote'class='btn btn-dark btn-sm col-6 existingButton'>Delete</button>"+
    "           </form>" +
    "       </div>" +
    "   </div>\n" +
    "</div>\n"
    );
    
}
// function to make note visible to user
function newNote (note) {
    document.getElementById('title').value = "";
    document.getElementById('textFill').value = "";
    if(document.getElementById('newNote').style.visibility != "visible"){;
        document.getElementById('newNote').style.visibility = "visible";
    }
}

function editNote(note) {
    document.getElementById('title').value = "";
    document.getElementById('textFill').value = "";
    if(document.getElementById('newNote').style.visibility != "visible"){
        document.getElementById('newNote').style.visibility = "visible";
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
    document.getElementById('newNote').style.visibility = "hidden";
}

// function to hide the note when user wants to delete it
function hideNote(note_id) {
    // the card is hid and the note itself is deleted at this point
    // so next time the page loads it will not load the card
    document.getElementById(note_id).style.display = "none";
}




var searchNote = document.querySelector(".search");
var btnSearch = document.querySelector(".btn-search");
var btnAddNote = document.querySelector(".btn-addnote");
var saveNoteTitle = document.querySelector(".save-note-title");
var saveNoteDesc = document.querySelector(".save-note-desc");
var btnDelNote = document.querySelector(".btn-delnote");

// DISPLAY ALL THE NOTES AT LOADING
dipslayStoredNotes();
//LISTENER TO ADD THE NOTE TO THE LIST
btnAddNote.addEventListener("click", function(e) {
    var noteTitle = document.querySelector(".note-title");
    var noteDesc = document.querySelector(".note-desc");
    //CHECK IF NOTES ALREADY EXISTS
    let noteTitles = localStorage.getItem("titles");
    let existsNotes = localStorage.getItem("notes");
    if(existsNotes == null && noteTitles == null) {
        //CREATEING ARRAY OF LIST NOTES
        notesTitleList = [];
        notesDescList = [];
    } else {
        //PARSE THE GIVEN DATA ALREADY IN LOCAL STOREAGE
        notesTitleList = JSON.parse(noteTitles);
        notesDescList = JSON.parse(existsNotes);
    }
    //PUSH ITEMS INTO ARRAY
    notesTitleList.push(noteTitle.value);
    notesDescList.push(noteDesc.value);
    //STRINGIFY THE JSON FILES FOR STORAGE
    localStorage.setItem("titles", JSON.stringify(notesTitleList));
    localStorage.setItem("notes", JSON.stringify(notesDescList));
    noteTitle.value = "";
    noteDesc.value = "";
    dipslayStoredNotes();
});

function dipslayStoredNotes(){
    let noteTitl = localStorage.getItem("titles");
    let noteDesc = localStorage.getItem("notes");
    if(noteTitl == null && noteDesc == null){
        noteTitle = [];
        noteDesc = [];
    } else {
        noteTitle = JSON.parse(noteTitl);
        noteDesc = JSON.parse(noteDesc);
    }
    let cardList = "";
    // let noteList = noteTitle.concat(noteDesc);
    for(i = 0; i < noteTitle.length; i++) {
        cardList += '<div class="card-note mx-2 my-2 float-start" style="width: 18rem;"><div class="card-body"><h5 class="card-title save-note-title">'+ noteTitle[i] + '</h5><p class="card-text save-note-desc">'+ noteDesc[i] +'</p><button class="btn btn-primary btn-delnote" id=' + i + ' onclick="delNote(this.id);">Delete Note</button></div></div>';
    }
    let container = document.querySelector('.container');
    if(noteTitle.length != 0) {
        container.innerHTML = cardList;
    } else {
        container.innerHTML = "Nothing here! click on add button to add the notes...";
    }
}

function delNote(index) {
    let notesTitleRemain = localStorage.getItem("titles");
    let notesRemain = localStorage.getItem("notes");
    if(notesTitleRemain == null && notesRemain == null){
        notesTitle = [];
        notesAvailable = [];
    } else {
        notesTitle = JSON.parse(notesTitleRemain);
        notesAvailable = JSON.parse(notesRemain);
    }
    //REMOVE ITEM FROM THE ARRAY
    notesTitle.splice(index, 1);
    notesAvailable.splice(index, 1);
    localStorage.setItem("titles", JSON.stringify(notesTitle));
    localStorage.setItem("notes", JSON.stringify(notesAvailable));
    dipslayStoredNotes();
}

searchNote.addEventListener("input", function(){
    let searchVal = searchNote.value.toLowerCase();
    let noteCard = document.getElementsByClassName("card-note");
    Array.from(noteCard).forEach(function(element){
        let cardText = element.querySelector(".card-text").innerText;
        //SEARCH FOR VALUES INTO THE CARDS
        if(cardText.includes(searchVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});
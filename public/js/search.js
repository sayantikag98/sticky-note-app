const input = document.querySelector("#notes-input");
const content = document.querySelector("#notes-main-content");
const main = document.querySelector("#notes-main");
const notes = JSON.parse(document.querySelector("script").dataset.notes);
const searchDiv = document.createElement("div");
const noteFoundMsg = document.createElement("h3");
const searchedNote = document.createElement("h1");
const searchNoteLink = document.createElement("a");
searchedNote.className = "notes-h1";
searchDiv.className = "notes-search-content";
searchNoteLink.className = "notes-a";

main.appendChild(searchDiv);


input.onkeyup = (event) => {
    if(event.target.value !== ""){
        content.style.display = "none";
        searchDiv.style.display = "block";
        const filteredNotes = notes.filter(note => note.title.startsWith(event.target.value));
        if(filteredNotes.length === 0){
            noteFoundMsg.textContent = "No such note exists";
            searchDiv.appendChild(noteFoundMsg);
            searchedNote.style.display = "none";
            noteFoundMsg.style.display = "block";
        }
        else{
            noteFoundMsg.style.display = "none";
            searchedNote.style.display = "block";
            filteredNotes.forEach(note => {
                searchNoteLink.href = `/notes/${note._id}`;
                searchNoteLink.title = "Go to this note";
                searchNoteLink.textContent = note.title;
                searchedNote.appendChild(searchNoteLink);
                searchDiv.appendChild(searchedNote);
            });

        }
    }
    else{
        content.style.display = "block";
        searchDiv.style.display = "none";
    }
};
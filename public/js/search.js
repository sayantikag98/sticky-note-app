const input = document.querySelector("#notes-input");
const outerDivId = document.querySelector("script").getAttribute("outerDivId");
const content = document.querySelector(`#${outerDivId}`);
const main = document.querySelector("#notes-main");
const notes = JSON.parse(document.querySelector("script").getAttribute("notes"));
const noteFoundMsg = document.createElement("h3");
const searchDiv = document.createElement("div");
const searchedNote = document.createElement("h1");
const searchNoteLink = document.createElement("a");
const innerNoteDiv = document.createElement("div");
const noteTitle = document.createElement("h2");
const noteSubject = document.createElement("h4");
const noteBody = document.createElement("p");


innerNoteDiv.className = document.querySelector("script").getAttribute("innerDivClass");
searchedNote.className = "notes-h1";
searchDiv.className 
if(outerDivId === "notes-main-content"){
    searchNoteLink.className = "notes-a";
    searchDiv.id = outerDivId;
}   
else{
    searchNoteLink.className = "notes-grid-view-notes-link";
    searchDiv.id = "notes-grid-view-notes-outer-div";
    noteTitle.className = "notes-grid-view-note-title";
    noteSubject.className = "notes-grid-view-note-subject";
    noteBody.className = "notes-grid-view-note-body";
}

const displayStyle = outerDivId === "notes-main-content" ? "block" : "grid";

input.onkeyup = (event) => {
    if(event.target.value !== ""){
        content.style.display = "none";
        searchDiv.style.display = displayStyle;
        const filteredNotes = notes.filter(note => note.title.startsWith(event.target.value));
        if(filteredNotes.length === 0){
            noteFoundMsg.textContent = "No such note exists";
            searchDiv.appendChild(noteFoundMsg);
            if(outerDivId === "notes-main-content")
                searchedNote.style.display = "none";
            else{
                searchNoteLink.style.display = "none";
            }
            noteFoundMsg.style.display = "block";
        }
        else{
            noteFoundMsg.style.display = "none";
            if(outerDivId === "notes-main-content")
                searchedNote.style.display = "block";
            else{
                searchNoteLink.style.display = "grid";
            }
            filteredNotes.forEach(note => {
                searchNoteLink.href = `/notes/${note._id}`;
                searchNoteLink.title = "Go to this note";
                if(outerDivId === "notes-main-content"){
                    searchNoteLink.textContent = note.title;
                    searchedNote.appendChild(searchNoteLink);
                    searchDiv.appendChild(searchedNote);
                }
                else{
                    noteTitle.textContent = note.title;
                    noteSubject.textContent = note.subject;
                    noteBody.textContent = note.body;
                    innerNoteDiv.appendChild(noteTitle);
                    innerNoteDiv.appendChild(noteSubject);
                    innerNoteDiv.appendChild(noteBody);
                    searchNoteLink.appendChild(innerNoteDiv);
                    searchDiv.appendChild(searchNoteLink);
                }   
            });
        }
    }
    else{
        content.style.display = displayStyle;
        searchDiv.style.display = "none";
    }
};


main.appendChild(searchDiv);
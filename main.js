const notesContianer = document.getElementById("main-notes")
const noteButton = document.querySelector(".addButton")

getNoteData().forEach((note) => {
    const noteElement =  createNote(note.id, note.content);
    notesContianer.insertBefore(noteElement, null)
})

noteButton.addEventListener("click",() => addNote())

function getNoteData(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]")
}

function storeNote(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes))
}

function createNote(id, content){
    const divNote = document.createElement("div");
    const note = document.createElement("textarea")
    const date = document.createElement("h1")

    
    divNote.classList.add("div-note")
    note.classList.add("note");
    date.classList.add("date");
    note.value = content;
    note.placeholder = "Enter text here"

    note.addEventListener("change", () => {
        updateInfo(id, note.value)
    })

    note.addEventListener("dblclick", () => {
        const confirmDelte = confirm("Are you sure you want to delte this note?");

        if (confirmDelte){
            deleteNote(id, divNote)
        }
    })
    const currentDate = new Date();
    const options = { month: "long", day: "numeric"};
    date.textContent = currentDate.toLocaleString(undefined, options)
    

    divNote.appendChild(date);
    divNote.appendChild(note);

    return divNote
}

function addNote(){
    const notes = getNoteData();
    const noteObject = {
        id: Math.floor(Math.random() * 1000000),
        content: ""
    }

    const noteElement = createNote(noteObject.id, noteObject.content)
    notesContianer.insertBefore(noteElement, null);

    notes.push(noteObject);
    storeNote(notes)
}

function updateInfo(id, newContent){
    const notes = getNoteData();
    const targeNote = notes.filter((note) => note.id == id)[0];

    targeNote.content = newContent;
    storeNote(notes)
}

function deleteNote(id, element){
    const note = getNoteData().filter((note) => note.id != id);

    storeNote(note)
    notesContianer.removeChild(element)
}
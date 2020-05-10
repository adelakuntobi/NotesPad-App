//Getting the Save button and assigning to a variable 
var btnSave = document.getElementById('btnSave'),
  notes = "";

//The calling function that calls other functions and starts the App
startApp();

function startApp(){
    let show = "";
    let inputArray = JSON.parse(localStorage.getItem('noteData'));//where all the notes will be stored "noteData"

    if(inputArray != null && inputArray != ""){
        inputArray = JSON.parse(localStorage.getItem('noteData'));

        for(let i = 0; i < inputArray.length; i++){
            //Appending the title to the list of array of titles
            show += "<option value=" +i + ">";
            show += inputArray[i].title;
            show += "</option>";


            //sending the inputArray to the id noteMaster 
            document.getElementById('noteMaster').innerHTML = show;
        }

        document.getElementById('btnWrite').addEventListener('click', function(event){
            writeNote();
        });
    
        document.getElementById('noteMaster').addEventListener('click', function(event){
            displayNote(event.target.value);
        });
        
        readNotes();
    }

    else{
        writeNote();
    }
}


//Function to display the portion for the user to add new notes
function writeNote(){
    document.getElementById('read').style.display = "none";
    document.getElementById('write').style.display = "block";
    document.getElementById('noteTitle').value = "";
    document.getElementById('noteBody').value = "";
}

//Displays the added tasks
function readNotes(){
    document.getElementById('read').style.display = "block";
    document.getElementById('write').style.display = "none";
}

//Accessing the local storage and getting the values of the added notes
function displayNote(note){
    var inputArray= JSON.parse(localStorage.getItem('noteData'));
    var show = "<h2>" + inputArray[note].title + "</h2><br>";
    show += "<h4>Date: " + new Date(inputArray[note].date).toDateString() + "</h4><br>";
    show += "<h6>" + inputArray[note].body + "</h6><br>";
    show += "<button id='deletebtn'>Delete</button>";
    document.getElementById('noteDisplay').innerHTML = show;
    document.getElementById('deletebtn').onclick = function(){
        inputArray.splice(note,1);
        localStorage.setItem('noteData', JSON.stringify(inputArray));
        init();
    }
}

//Save Button
btnSave.onclick = function(){
    const noteDate = new Date();
    const noteTitle = document.getElementById('noteTitle').value;
    const noteBody = document.getElementById('noteBody').value;
    const theNote = new Note(noteDate, noteTitle, noteBody);
    if(noteTitle == "" || noteBody == "" ){
        window.alert("type something in!");
        startApp();
    }
    
    saveNotes(theNote);
}

function saveNotes(note){
    let inputArray = JSON.parse(localStorage.getItem('noteData'));
    if(inputArray == null){
        inputArray = new Array();
        inputArray.push(note);
    }
    else{
        inputArray.push(note);
    }
    localStorage.setItem('noteData', JSON.stringify(inputArray));
    readNotes();
    startApp();
}
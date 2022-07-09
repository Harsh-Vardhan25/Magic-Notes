showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {

    let addTxt = document.getElementById('addTxt');
    let addTle = document.getElementById('addTle');
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        tilte: addTxt.value,
        text: addTle.value
    }

    notesObj.push([addTle.value, addTxt.value]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTle.value ="";
    showNotes();
});

function showNotes() {
    notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
         <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <div class="form-floating">
                <h5 class="card-title">${element[0]}</h5>
                    <p class="card-text">${element[1]}</p>
                </div>
                <button style="margin-top: 2%;" class="btn btn-primary" id="delBtn" onclick="deleteNote(${index})">Delete</button>
            </div>
        </div>
                `;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = "Nothing to show here";
    }
}
function deleteNote(index) {
    notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let inputVal = search.value ;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
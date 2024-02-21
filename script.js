let titleInput = document.querySelector('#titleInput');
let notesInput = document.querySelector('#notesInput');
let addButton = document.querySelector('#addButton');

let notesSection = document.querySelector('#notes-section .notes-container');
let pinnedSection = document.querySelector('#pinned-section .notes-container');

let myNotes = {
    0:{
        id:0,
        title:'Example',
        note:'This is example note',
    },
}

let pinNotes = {};

addButton.addEventListener('click',()=>{
    let title = titleInput.value.trim();
    let note = notesInput.value.trim();

    if(title.length==0 || note.length==0) return;
    
    titleInput.value = notesInput.value = '';

    let cid = Date.now();
    let cnote = {id:cid,title:title,note:note,isPinned:false,isArchived:false };

    myNotes[cid] = cnote;
    renderNotes();
})

function renderNotes(){
    notesSection.innerHTML = '';

    for(let key in myNotes){
        let note = myNotes[key];

        let div = document.createElement('div');
        div.id = note.id;
        div.classList.add('notes');
        div.classList.add('flex');
        div.innerHTML = `<h4>${note.title}</h4><p>${note.note}</p><div class="tools flex center"><i class="ri-delete-bin-fill"></i><i class="ri-pushpin-fill"></i><i class="ri-inbox-archive-fill"></i></div>`;

        let deleteI = div.children[2].children[0];
        let pinI = div.children[2].children[1];
        let archiveI = div.children[2].children[2];
        
        deleteI.addEventListener('click',()=>{
            notesSection.removeChild(div);
            delete myNotes[note.id];
        })
        pinI.addEventListener('click',()=>{
            delete myNotes[note.id];
            pinNotes[note.id] = note;
            renderPinNotes();
            notesSection.removeChild(div);
        })
        
        notesSection.appendChild(div);
    }
}


function renderPinNotes(){
    pinnedSection.innerHTML = '';

    for(let key in pinNotes){
        let note = pinNotes[key];

        let div = document.createElement('div');
        div.id = note.id;
        div.classList.add('notes');
        div.classList.add('flex');
        div.innerHTML = `<h4>${note.title}</h4><p>${note.note}</p><div class="tools flex center"><i class="ri-delete-bin-fill"></i><i class="ri-unpin-fill"></i><i class="ri-inbox-archive-fill"></i></div>`;

        let deleteI = div.children[2].children[0];
        let pinI = div.children[2].children[1];
        let archiveI = div.children[2].children[2];
        
        deleteI.addEventListener('click',()=>{
            pinnedSection.removeChild(div);
            delete pinNotes[note.id];
        })
        pinI.addEventListener('click',()=>{
            delete pinNotes[note.id];
            myNotes[note.id] = note;
            renderNotes();
            pinnedSection.removeChild(div);
        })
        
        pinnedSection.appendChild(div);
    }
}


renderNotes();
renderPinNotes();
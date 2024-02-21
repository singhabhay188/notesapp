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
        isPinned:false,
        isArchived:false
    },
}

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
    pinnedSection.innerHTML = '';
    notesSection.innerHTML = '';

    for(let key in myNotes){
        let note = myNotes[key];

        let div = document.createElement('div');
        div.id = note.id;
        div.classList.add('notes');
        div.classList.add('flex');
        div.innerHTML = `<h4>${note.title}</h4><p>${note.note}</p><div class="tools flex center"><i class="ri-delete-bin-fill"></i><i class="ri-${note.isPinned ? "unpin" : "pushpin"}-fill"></i><i class="ri-inbox-archive-fill"></i></div>`;

        let deleteI = div.children[2].children[0];
        let pinI = div.children[2].children[1];
        let archiveI = div.children[2].children[2];
        
        deleteI.addEventListener('click',()=>{
            if (note.isPinned) {
                pinnedSection.removeChild(div);
            } else {
                notesSection.removeChild(div);
            }
            delete myNotes[note.id];
        })
        pinI.addEventListener('click',()=>{
            myNotes[note.id].isPinned = !myNotes[note.id].isPinned;
            renderNotes();
        })
        
        if (note.isPinned) {
            pinnedSection.appendChild(div);
        } else {
            notesSection.appendChild(div);
        }
    }
}

renderNotes();
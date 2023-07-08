const title = document.getElementById('title')
const desc = document.getElementById('desc')
const addBtn = document.getElementById('add-btn')
const newTitle = document.getElementById('new-title')
const newDesc = document.getElementById('new-desc')
const saveBtn = document.getElementById('save-btn')
const noteId = document.getElementById('note-id')
const alertMsg = document.getElementById('alert-msg')

const notesContainer = document.getElementById('notes-container')


const notes = JSON.parse(localStorage.getItem('notes')) || []

const updateLs = ()  =>{
    localStorage.setItem('notes',JSON.stringify(notes))
}




addBtn.addEventListener('click', () => {
    if (title.value == "") {
        alert("Title is empty")
    } else if (desc.value == "") {
        alert("Description is empty")
    } else {
        let note = {
            id:notes.length+1,
            title: title.value,
            desc: desc.value
        }

        addNote(note)
        pushNote(note)
        title.value=""
        desc.value=""
    }
})


const addNote = (note) => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
    
    <div class="card-body">
        <h5>${note.title}</h5>
        <p>${note.desc}</p>
        <div class="d-flex gap-2">
        <button class="btn btn-danger">X</button>
        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        </div>
    </div>
    
    
    `

    notesContainer.appendChild(card)

    card.querySelector('.btn-danger').addEventListener('click',()=>{
        card.remove()
        removeNote(note.id)
    })

    card.querySelector('.btn-info').addEventListener('click',()=>{
        newTitle.value=note.title
        newDesc.value=note.desc
        noteId.textContent=note.id
    })

    
}

const pushNote = (note) =>{
    notes.push(note)
   updateLs()
}

const removeNote = (id) =>{
    notes.forEach((note,index)=>{
        if(note.id==id){
            notes.splice(index,1)
        }
    })
    updateLs()
}


saveBtn.addEventListener('click',()=>{
  if(newTitle.value==""){
    alert("Title is empty")
  }else if(newDesc.value==""){
    alert("Description is empty")
  }else{
    editNote(noteId.textContent)
    newTitle.value=""
    newDesc.value=""
    alertMsg.style.display="block"
    hideAlert()
  }
})


const editNote = (id) =>{
    notes.forEach((note)=>{
        if(note.id==id){
            note.title=newTitle.value
            note.desc=newDesc.value
        }
    })
    updateLs()
    loadNotes()
}


const loadNotes = () =>{
    notesContainer.innerHTML = ""
    notes.forEach((note)=>{
        addNote(note)
    })
}

const hideAlert = () =>{
    setTimeout(()=>{
        alertMsg.style.display="none"
    },1500)
}

loadNotes()
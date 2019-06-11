const url = 'https://jsonplaceholder.typicode.com/todos';

const notesDiv = document.getElementById('notes');

const addNote = (note) => {
  const elem = document.createElement('div');
  elem.classList.add('post-it');
  elem.innerHTML = note;

  notesDiv.appendChild(elem);
};

const addNoteButton = document.getElementById('add-note-button');

addNoteButton.addEventListener('click', event => {
  const numNotes = document.querySelectorAll('.post-it').length;
  let newNote = document.getElementById('add-note-textarea').value;
  localStorage.setItem(`new-note-${numNotes + 1}`, newNote);

  document.getElementById('add-note-textarea').value = '';

  addNote(newNote);
});

const updateUI = (notes) => {
  notes.splice(5);
  console.log(notes);
  notes.forEach(note => addNote(note.title));
};

const getNotes = () => {
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      updateUI(responseJson);
      return responseJson;
    })
    .catch(() => console.log('Could not get data from cache...'));
};

getNotes();

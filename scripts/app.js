const url = 'https://jsonplaceholder.typicode.com/todos';

const notesDiv = document.getElementById('notes');

const updateUI = (notes) => {
  notes.splice(5);
  console.log(notes);
  notes.forEach(note => {
    const elem = document.createElement('div');
    elem.classList.add('post-it');
    elem.innerHTML = note.title;

    notesDiv.appendChild(elem);
  });
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

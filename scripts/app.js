const url = 'https://jsonplaceholder.typicode.com/todos';

const updateUI = (data) => {

};

const getNotes = () => {
    fetch(url)
        .then(response => response.json())
        .then(updateUI)
        .catch(() => console.log('Could not get data from cache...'));
};

getNotes();

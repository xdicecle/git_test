function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // true or false
    this.id = this.generateId();
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

Book.prototype.generateId = function() {
    return crypto.randomUUID();
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayLibrary(){
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear previous display


    myLibrary.forEach(book => {
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.dataset.id = book.id;
        bookDiv.textContent = book.info();

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        toggleReadButton.addEventListener('click', () => {
            book.read = !book.read;
            displayLibrary();
        });
        bookDiv.appendChild(toggleReadButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Book';
        deleteButton.addEventListener('click', () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayLibrary();
            }
        });
        bookDiv.appendChild(deleteButton);
        libraryDiv.appendChild(bookDiv);
    });
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#show-library');

showButton.addEventListener('click', () => {
    dialog.showModal();
});

const form = dialog.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;

    addBookToLibrary(title, author, pages, read);
    dialog.close();
    form.reset();
    displayLibrary();
});
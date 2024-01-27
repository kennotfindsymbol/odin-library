const myLibrary = [];
const books = document.querySelector('.books');

function addBookToLibrary(book) {
    myLibrary.push(book);
};

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    toggleRead() {
        this.isRead = !this.isRead;
    }
    getUnorderedList() {
        const ul = document.createElement('ul');
        for (const [key, value] of Object.entries(this)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            ul.append(li);
        }
        return ul;
    }
};



function defaultBooks(){
    const defaultBook1 = new Book(
        'Harry Potter and the Philosopher\'s Stone',
        'J. K. Rowling',
        223,
        false
    );
    
    const defaultBook2 = new Book(
        'Harry Potter and the Chamber of Secrets',
        'J. K. Rowling',
        251,
        true
    );
    
    addBookToLibrary(defaultBook1);
    addBookToLibrary(defaultBook2);
}


function unshowAllBooks() {
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }

}

function showAllBooks() {
    myLibrary.forEach(book => {
        books.append(getBookDiv(book));
    });
}

function render(){
    unshowAllBooks();
    showAllBooks();
}

function getBookDiv(book) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.style.height = '200px';
    bookDiv.style.width = '200px';
    bookDiv.style.backgroundColor = 'white';
    bookDiv.append(book.getUnorderedList());
    const toggleButton = document.createElement('button');
    toggleButton.textContent = book.isRead ? 'unread' : 'read';
    toggleButton.addEventListener('click', () => {
        book.toggleRead();
        toggleButton.textContent = book.isRead ? 'unread' : 'read';
        render();
    })
    bookDiv.append(toggleButton);
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', () => {
        const index = myLibrary.indexOf(book);
        if (index > -1) {
            myLibrary.splice(index, 1);
        }
        render();
    })
    bookDiv.append(removeButton);
    removeButton.textContent = 'remove this book'
    removeButton.addEventListener('click', () => {
        const index = myLibrary.indexOf(book);
        if (index > -1) {
            myLibrary.splice(index, 1);
        }
        render();
    })
    bookDiv.append(removeButton);
    return bookDiv;
}

const openButton = document.querySelector('#open-dialog');
const closeButton = document.querySelector('#close-dialog');
const dialog = document.querySelector('.new-book')

openButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});


const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const button = document.getElementById('button');

button.addEventListener('click', () => {
    let isRead = document.querySelector('input[name=\'is_read\']:checked');
    const newBook = new Book(title.value, author.value, pages.value, isRead.value);
    addBookToLibrary(newBook);
    title.value = '';
    author.value = '';
    pages.value = '';
    for (btn of document.querySelectorAll('input[name=\'is_read\']')) {
        btn.checked = false;
    }
    render();
});


defaultBooks();
render();






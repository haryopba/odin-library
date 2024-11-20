const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    const booksContainer = document.querySelector('.books-container');
    
    const card = renderCard(book)
    booksContainer.appendChild(card);
}

function deleteBook(title) {
    const delIndex = myLibrary.findIndex(book => book.title === title);
    myLibrary.splice(delIndex, 1);
    const booksContainer = document.querySelector('.books-container');
    let cards = booksContainer.children
    for(let i = 0; i < cards.length; i++) {
        if(cards[i].querySelector('p.title').textContent === title){
            booksContainer.removeChild(cards[i])
        }
    }

}

function renderCard(book) {
    let card = document.createElement('div');
    card.classList.add('card');
    let title = document.createElement('p');
    title.classList.add('title')
    title.textContent = book.title;
    let author = document.createElement('p');
    author.classList.add('author')
    author.textContent = book.author;
    let pages = document.createElement('p');
    pages.classList.add('pages')
    pages.textContent = book.pages;
    let info = document.createElement('p');
    info.classList.add('info')
    info.textContent = book.info();
    let delButton = document.createElement('button');
    delButton.textContent = 'Delete';
    delButton.addEventListener('click', () => {
        deleteBook(book.title)
    })
    let checkRead = document.createElement('input');
    checkRead.setAttribute('type', 'checkbox');
    checkRead.setAttribute('name', `${book.title}-read`);
    checkRead.addEventListener('click', () => {
        book.read = checkRead.checked;
        info.textContent = book.info();
    })
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(info);
    card.appendChild(delButton);
    card.appendChild(checkRead)
    return card;
}

function renderCards() {
    const booksContainer = document.querySelector('.books-container');
    
    myLibrary.forEach(book => {
        const card = renderCard(book)
        booksContainer.appendChild(card);
    })
}

function addDummyBooks(dummySize) {
    for(let i = 0; i < dummySize; i++){
        let book = new Book(`Dummy Title-${i}`, 'Dummy Author', 123, false);
        addBookToLibrary(book)
    }
}

const addDialog = document.querySelector('.form-dialog');
const showButton = document.querySelector('#add-button');
const closeButton = document.querySelector('.form-dialog > .close-btn');
const addForm = document.querySelector('.form-dialog > form');

showButton.addEventListener('click', () => {
    addDialog.showModal();
})

closeButton.addEventListener('click', () => {
    addDialog.close();
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let book = new Book(data.title, data.author, data.pages, false);
    addBookToLibrary(book)
    addDialog.close();
})


addDummyBooks(4);


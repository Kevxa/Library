const addBookBtn = document.getElementById("addBtn")
const popupForm = document.getElementById("popupForm")
const addBookForm = document.getElementById("addBookForm")
const overlay = document.getElementById("overlay")
const booksGrid = document.getElementById("booksGrid")
const removeBtn = document.getElementById("removeBtn")
const readBtn = document.getElementById("readBtn")


class Book{
    constructor(
        title = "unknown",
        author = "unknown",
        pages = "0",
        isRead = false
    ){
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}

const library = new Library()

function resetBooksGrid() {
    booksGrid.innerHTML = ''
}



function createBookCard (book) {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    bookCard.classList.add("book-card")
    buttonGroup.classList.add("button-group")
    readBtn.classList.add("readBtn")
    removeBtn.classList.add("removeBtn")
    
    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = "Remove"
    removeBtn.onclick = removeBook
    readBtn.onclick = toggleBook

    if (book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.classList.add('btn-light-green')
    } else {
        readBtn.textContent = 'Not read'
        readBtn.classList.add('btn-light-red')
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    buttonGroup.appendChild(readBtn)
    buttonGroup.appendChild(removeBtn)
    bookCard.appendChild(buttonGroup)
    booksGrid.appendChild(bookCard)
}

function updateBooksGrid(){
    resetBooksGrid()
    for (let book of library.books){
        createBookCard(book)
    }
}

function getBookFromInput(){
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const isRead = document.getElementById("isRead").checked
    return new Book(title, author, pages, isRead)
}

function addBook (e){
    e.preventDefault()
    const newBook = getBookFromInput()
        library.addBook(newBook)
        updateBooksGrid()
        closePopupForm()
}

function removeBook(e){
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
    )
    library.removeBook(title)
    updateBooksGrid()
}

function toggleBook(e){
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
    )
    const book = library.getBook(title)
    book.isRead = !book.isRead
    updateBooksGrid()
}





function openPopupForm (){
    addBookForm.reset()
    popupForm.classList.add("active")
    overlay.classList.add("active")
}

function closePopupForm (){
    popupForm.classList.remove('active')
    overlay.classList.remove('active')
}




addBookBtn.onclick = openPopupForm
overlay.onclick = closePopupForm
addBookForm.onsubmit = addBook


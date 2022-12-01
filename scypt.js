let myLibrary = [];
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    Book.prototype.info = function () {
        return `${title}+ by ${author}, ${pages} pages, ${this.read}`;
    }
}
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
}
myLibrary.push(new Book("a", "b", 10, true));
myLibrary.push(new Book("c", "d", 20, false));

// Creates a new card in document for a book obj
function createCard(book) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.setAttribute("data-index", myLibrary.indexOf(book));

    const title = document.createElement("p")
    title.textContent = book.title;

    const author = document.createElement("p")
    author.textContent = `by ${book.author}`;

    const pages = document.createElement("p")
    pages.textContent = book.pages;

    const read = document.createElement("button")
    read.textContent = Boolean(book.read) ? "read" : "not read yet";
    read.addEventListener("click", (e) => { toggleReadStatus(e) })

    const remove = document.createElement("button")
    remove.textContent = "Remove"
    remove.addEventListener("click", (e) => { removeBook(e) })

    bookCard.append(title, author, pages, read, remove)
    document.body.appendChild(bookCard);
}

function displayBooks() {
    for (const book of myLibrary) {
        createCard(book);
    }
}
displayBooks()

function toggleForm() {
    formElement = document.getElementById("form")
    formElement.toggleAttribute("hidden")
}
//handles new books
const submit = document.getElementById("submit")
submit.addEventListener("click", addNewBook)
function addNewBook() {
    const form = new FormData(formElement);
    addBookToLibrary(form.get("title"), form.get("author"), form.get("pages"), form.get("read"));
    createCard(myLibrary[myLibrary.length - 1]);
    toggleForm();
}
function removeBook(e) {
    const index = e.target.parentElement.dataset.index;
    myLibrary.splice(index, 1);
    Card = document.querySelector(`div[data-index="${index}"]`)
    Card.remove();
}

//change read status
function toggleReadStatus(e) {
    const index = e.target.parentElement.dataset.index;
    const readButton = e.target;
    myLibrary[index].read = !myLibrary[index].read
    readButton.textContent = Boolean(myLibrary[index].read) ? "read" : "not read yet";
}
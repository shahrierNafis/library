let myLibrary = [];
class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    info() {
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
    formElement = document.querySelector("form")
    formElement.toggleAttribute("hidden")
}
// handles new books
const submit = document.querySelector("#submit")
submit.addEventListener("click", (event) => {

    // check if a value is missing;
    const formInputs = document.querySelectorAll("input[required]")
    const allFilled = Array.from(formInputs).every((input) => {
        // remove invalid class from every inputs
        input.classList.remove("invalid")
        // hide error
        document.querySelector("#error").toggleAttribute("hidden")
        return !input.validity.valueMissing
    })
    if (allFilled) {
        addNewBook()
        toggleForm();
    }
    else {
        formInputs.forEach((input) => {
            // prevent resetting
            event.preventDefault()
            //show error
            document.querySelector("#error").toggleAttribute("hidden")
            if (input.validity.valueMissing) {
                //add invalid class to empty inputs
                input.classList.add("invalid")
            }
        })
    }
})
function addNewBook() {
    const form = new FormData(formElement);
    addBookToLibrary(form.get("title"), form.get("author"), form.get("pages"), form.get("read"));
    createCard(myLibrary[myLibrary.length - 1]);
}
function removeBook(e) {
    const index = e.target.parentElement.dataset.index;
    myLibrary.splice(index, 1);
    Card = document.querySelector(`div[data-index="${index}"]`)
    Card.remove();
}

// change read status
function toggleReadStatus(e) {
    const index = e.target.parentElement.dataset.index;
    const readButton = e.target;
    myLibrary[index].read = !myLibrary[index].read
    readButton.textContent = Boolean(myLibrary[index].read) ? "read" : "not read yet";
}
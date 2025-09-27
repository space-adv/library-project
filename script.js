const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = crypto.randomUUID;

    this.toggleRead = function() {
        this.hasRead = !this.hasRead;

    }
}

function addBook(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead);

    myLibrary.push(book)
    console.log(book)
}

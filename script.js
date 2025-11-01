let myLibrary = [];

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        this.id = crypto.randomUUID();
    }    

    toggleRead() {
        this.hasRead = !this.hasRead;

    }
}    

class Library{
    constructor(){
        this.books = [];
    }

    addBook(title, author, pages, hasRead) {
        const book = new Book(title, author, pages, hasRead);
        this.books.push(book);
        this.displayInfo();
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.displayInfo();
    }

    toggleReadStatus(id) {
        const book = this.books.filter(book => book.id === id);
        if(book) {
            book.toggleRead();
            this.displayInfo();
        }
    }


   displayInfo() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";

    this.books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.setAttribute("data-d", book.id);

        bookDiv.innerHTML = `
          <p>${book.title} by ${book.author}</p>
          <p>${book.pages} pages</p>
          <p>Status: ${book.hasRead ? "Read" : "Plan to read"}</p>
          <button class="toggle-btn">Read</button>
          <button class="remove-btn">Remove</button>
        `;

        libraryDiv.appendChild(bookDiv);

        bookDiv.querySelector(".remove-btn").addEventListener("click", () => {
          this.removeBook(book.id);
        });

        bookDiv.querySelector(".toggle-btn").addEventListener("click", ()=> {
          this.toggleReadStatus(book.id)
        });
    })
   }
  

}

const library = new Library();




document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let hasRead = document.getElementById("hasRead").checked;

    library.addBook(title, author, pages, hasRead);

    e.target.reset();
})
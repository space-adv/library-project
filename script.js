let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = crypto.randomUUID();

    this.toggleRead = function() {
        this.hasRead = !this.hasRead;

    }
}

function addBook(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead);

    myLibrary.push(book);
    console.log(book);
    displayInfo();
}

function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    displayInfo()
}

function toggleReadStatus(id) {
    let book = myLibrary.find(book => book.id === id);
    if(book) {
       book.toggleRead();
       displayInfo()
    }
}


function displayInfo() {
    let libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";

    myLibrary.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.setAttribute("data-id", book.id);

        bookDiv.innerHTML = `
          <p>${book.title} by ${book.author}</p>
          <p>${book.pages} pages</p>
          <p>Status: ${book.hasRead ? "Read" : "Plan to read"}</p>
          <button class="toggle-btn">Read</button>
          <button class="remove-btn">Remove</button>
          `;
        
        libraryDiv.appendChild(bookDiv);

        bookDiv.querySelector(".remove-btn").addEventListener("click", () => {
            removeBook(book.id);
        });

        bookDiv.querySelector(".toggle-btn").addEventListener("click", ()=> {
            toggleReadStatus(book.id)
        });
    })
    
}



document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let hasRead = document.getElementById("hasRead").checked;

    addBook(title, author, pages, hasRead);

    e.target.reset();
})
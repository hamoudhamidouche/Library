const myLibrary = [];

class Book {
  constructor(name, auth, pages, read) {
    this.name = name;
    this.auth = auth;
    this.pages = pages;
    this.read = read;
  }
}

class Card {
  constructor(book) {
    this.book = book;
  }

  createCard() {
    myLibrary.push(this.book);

    const container = document.querySelector("#card-container");
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("p");
    title.textContent = "Name: " + this.book.name;

    const author = document.createElement("p");
    author.textContent = "Author: " + this.book.auth;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = "Pages: " + this.book.pages;

    const status = document.createElement("p");
    status.textContent = "Status: " + this.book.read;

    const btn1 = document.createElement("button");
    btn1.classList.add("switch");
    btn1.textContent = "Switch status";

    const btn2 = document.createElement("button");
    btn2.classList.add("delete");
    btn2.textContent = "Delete";

    // Event Listeners
    btn1.addEventListener("click", () => {
      this.book.read = this.book.read === "read" ? "not read" : "read";
      status.textContent = "Status: " + this.book.read;
    });

    btn2.addEventListener("click", () => {
      container.removeChild(card);
      myLibrary.splice(myLibrary.indexOf(this.book), 1);
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pagesElement);
    card.appendChild(status);
    card.appendChild(btn1);
    card.appendChild(btn2);
    container.appendChild(card);
  }
}

class workFlow {
  constructor() {
    this.dialog = document.querySelector("dialog");
    this.showButton = document.querySelector("dialog + button");
    this.closeButton = document.querySelector("dialog button");
    this.addbtn = document.querySelector(".sub");
    this.inpname = document.querySelector("#name");
    this.inpauth = document.querySelector("#author");
    this.inpnpages = document.querySelector("#pages");
    this.inpsta = document.querySelector("#status");

    this.showButton.addEventListener("click", () => {
      this.dialog.showModal();
    });

    this.closeButton.addEventListener("click", () => {
      this.dialog.close();
    });

    this.addbtn.addEventListener("click", () => this.addToLibrary());
  }

  addToLibrary() {
    let bookname = this.inpname.value.trim();
    let bookauth = this.inpauth.value.trim();
    let pages = parseInt(this.inpnpages.value.trim());
    let bookstatus = this.inpsta.value.trim() || "not read";

    if (bookname === "" || bookauth === "" || isNaN(pages) || pages <= 0) {
      alert("Please enter valid book details.");
      return;
    }

    let newBook = new Book(bookname, bookauth, pages, bookstatus);
    new Card(newBook).createCard();

    // Reset input fields
    this.inpname.value = "";
    this.inpauth.value = "";
    this.inpnpages.value = "";
    this.inpsta.value = "";

    this.dialog.close();
  }
}

// Instantiate workFlow
new workFlow();

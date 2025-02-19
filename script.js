const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const addbtn = document.querySelector(".sub");
let inpname = document.querySelector("#name");
let inpauth = document.querySelector("#author");
let inpnpages = document.querySelector("#pages");
let inpsta = document.querySelector("#status");

const myLibrary = []; // Declare this before usage

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Add book to library
addbtn.addEventListener("click", () => {
  let bookname = inpname.value.trim();
  let bookauth = inpauth.value.trim();
  let pages = parseInt(inpnpages.value.trim());
  let bookstatus = inpsta.value.trim() || "not read";

  // Validate input before adding
  if (bookname === "" || inpauth === "" || isNaN(pages) || pages <= 0) {
    alert("Please enter valid book details.");
    return;
  }

  addBookToLibrary(bookname, bookauth, pages, bookstatus);
  
  // Reset input fields
  inpname.value = "";
  inpauth.value = "";
  inpnpages.value = "";
  inpsta.value = "";

  dialog.close();
});

function Book(name, auth, pages, read) {
  this.name = name;
  this.auth = auth,
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(name, auth, pages, read) {
  let book = new Book(name, auth, pages, read);
  myLibrary.push(book);

  const container = document.querySelector("#card-container");
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("p");
  title.textContent = "Name : " + book.name;

  const author = document.createElement("p");
  author.textContent = "Author : " + book.auth;

  const pagesElement = document.createElement("p"); // Avoid variable conflict
  pagesElement.textContent = "Pages : " + book.pages;

  const status = document.createElement("p");
  status.textContent = "Status : " + book.read;

  const btn1 = document.createElement("button");
  btn1.classList.add("switch");
  btn1.textContent = "Switch status";

  const btn2 = document.createElement("button");
  btn2.classList.add("delete");
  btn2.textContent = "Delete";

  // Add event listeners to buttons
  btn1.addEventListener("click", () => {
    book.read = book.read === "read" ? "not read" : "read";
    status.textContent = "Status : " + book.read;
  });

  btn2.addEventListener("click", () => {
    container.removeChild(card);
    myLibrary.splice(myLibrary.indexOf(book), 1);
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pagesElement);
  card.appendChild(status);
  card.appendChild(btn1);
  card.appendChild(btn2);
  container.appendChild(card);
}

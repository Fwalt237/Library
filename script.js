// Array to hold book objects
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // boolean
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// Function to remove a book by id
function removeBookById(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Function to toggle read status by id
function toggleReadById(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

// Function to display all books on the page
function displayBooks() {
  const container = document.getElementById('libraryContainer');
  container.innerHTML = ''; // Clear previous content

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      <button class="toggle-read-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;

    // Add event listeners for buttons
    const toggleBtn = card.querySelector('.toggle-read-btn');
    toggleBtn.addEventListener('click', () => toggleReadById(book.id));

    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => removeBookById(book.id));

    container.appendChild(card);
  });
}

// Setup form modal and event handlers
const newBookBtn = document.getElementById('newBookBtn');
const bookFormDialog = document.getElementById('bookFormDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
  bookForm.reset();
  bookFormDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  bookFormDialog.close();
});

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(bookForm);
  const title = formData.get('title').trim();
  const author = formData.get('author').trim();
  const pages = parseInt(formData.get('pages'), 10);
  const read = formData.get('read') === 'on';

  if (title && author && pages > 0) {
    addBookToLibrary(title, author, pages, read);
    bookFormDialog.close();
  } else {
    alert('Please fill in all fields correctly.');
  }
});

// Add some initial books to demonstrate
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);

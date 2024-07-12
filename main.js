const myLibrary = [];
const booksContainer = document.querySelector('main');

const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal-btn');
const modal = document.querySelector('dialog');
const booksForm = document.querySelector('form');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
});

booksForm.addEventListener('submit', submitModalForm);
setUpFormValidation();

class Book {
  static #idCounter = 0;

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Book.#idCounter;
    Book.#idCounter++;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  const bookCard = document.createElement('div');
  bookCard.bookId = book.id;
  bookCard.classList.add('book');

  const bookTitle = document.createElement('h2');
  bookTitle.textContent = `"${title}"`;

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `By ${author}`;

  const bookPages = document.createElement('p');
  bookPages.textContent = `${pages} pages`;

  const bookReadButton = document.createElement('button');
  bookReadButton.textContent = read ? 'Unread' : 'Read';
  bookReadButton.classList.add('toggle-read-button');

  const bookDeleteButton = document.createElement('button');
  bookDeleteButton.textContent = `Delete`;
  bookDeleteButton.classList.add('delete-button');

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);

  buttonsContainer.appendChild(bookDeleteButton);
  buttonsContainer.appendChild(bookReadButton);

  bookCard.appendChild(buttonsContainer);

  booksContainer.appendChild(bookCard);

  if (read) {
    bookCard.classList.add('read');
  }

  bookDeleteButton.addEventListener('click', deleteBook);
  bookReadButton.addEventListener('click', toggleRead);

  myLibrary.push(book);
}

function submitModalForm(e) {
  e.preventDefault();

  title = titleInput.value;
  author = authorInput.value;
  pages = pagesInput.value;
  read = readInput.checked;

  booksForm.reset();

  addBookToLibrary(title, author, pages, read);
  modal.close();
}

function setUpFormValidation() {
  const requiredInputs = [titleInput, authorInput];

  requiredInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.validity.valueMissing) {
        input.setCustomValidity('You must fill this!');
        return;
      }

      input.setCustomValidity('');
    });
  });

  pagesInput.addEventListener('input', (e) => {
    if (pagesInput.validity.rangeUnderflow) {
      pagesInput.setCustomValidity('At least one page man cmon!');
      pagesInput.reportValidity();
      return;
    }

    if (pagesInput.validity.valueMissing) {
      pagesInput.setCustomValidity('gotta have pages');
      pagesInput.reportValidity();
      return;
    }

    pagesInput.setCustomValidity('');
  });
}

function toggleRead(e) {
  const bookCard = e.target.parentElement.parentElement;
  const readButton = e.target;

  if (bookCard.classList.contains('read')) {
    readButton.textContent = 'Read';
  } else {
    readButton.textContent = 'Unread';
  }

  bookCard.classList.toggle('read');
  const bookArrayElement = myLibrary.find(
    (book) => book.id === bookCard.bookId
  );
  bookArrayElement.read = !bookArrayElement.read;
}

function deleteBook(e) {
  const bookCard = e.target.parentElement.parentElement;
  // remove does not affect the variable
  bookCard.remove();

  bookArrayElement = myLibrary.find((book) => book.id === bookCard.bookId);
  index = myLibrary.indexOf(bookArrayElement);
  if (index > -1) {
    myLibrary.splice(index, 1);
  }
}

const myLibrary = [];

const Book = (title, author, pagesNum, read) => {
  const obj = {
    title,
    author,
    pagesNum,
    read,
    changeBookStatus() {
      if (obj.read) {
        obj.read = false;
      } else {
        obj.read = true;
      }
    },
  };

  return obj;
};

function deleteBook(index) {
  myLibrary.splice(index, 1);
}

function displayBooks() {
  const allBookNodes = document.querySelectorAll('.book-row');

  allBookNodes.forEach((node) => {
    node.remove();
  });

  const bookCard = document.querySelector('#books-table');

  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookKeys = Object.keys(myLibrary[i]);
    const tableRow = document.createElement('tr');
    tableRow.classList = 'book-row';
    for (let j = 0; j < bookKeys.length - 2; j += 1) {
      const bookProperty = document.createElement('td');
      const bookPropertyContent = document.createTextNode(myLibrary[i][bookKeys[j]]);
      bookProperty.appendChild(bookPropertyContent);
      tableRow.appendChild(bookProperty);
    }
    const bookStatus = document.createElement('td');
    const statusBtn = document.createElement('button');
    const statusBtnContent = document.createTextNode(myLibrary[i].read);
    statusBtn.appendChild(statusBtnContent);
    bookStatus.appendChild(statusBtn);
    tableRow.appendChild(bookStatus);
    statusBtn.id = `status-${i}`;
    statusBtn.onclick = () => {
      myLibrary[i].changeBookStatus();
      displayBooks();
    };

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'delete book';
    deleteBtn.onclick = () => {
      deleteBook(i);
      displayBooks();
    };
    deleteTd.appendChild(deleteBtn);
    tableRow.appendChild(deleteTd);
    tableRow.id = i;
    bookCard.appendChild(tableRow);
  }
}

function addBookToLibrary() {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const bookPages = document.getElementById('pageNum').value;
  let bookStatus = false;

  if (document.getElementById('haveRead').checked) {
    bookStatus = true;
  }

  const newBook = Book(bookTitle, bookAuthor, bookPages, bookStatus);

  myLibrary.push(newBook);
  displayBooks();
}

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.onclick = () => { addBookToLibrary(); };
const newBookForm = document.getElementById('new-book-form');
const displayFormBtn = document.getElementById('display-form-btn');

displayFormBtn.onclick = () => {
  if (newBookForm.style.display === 'block') {
    newBookForm.style.display = 'none';
  } else {
    newBookForm.style.display = 'block';
  }
};
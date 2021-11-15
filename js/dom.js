const UNCOMPLETED_BOOK_LIST = 'uncompletedBookshelfList';
const COMPLETED_BOOK_LIST = 'completedBookshelfList';

function renderByData(data) {
    for (book of data) {
        const bookElement = createBookElement(book);

        if (book.isComplete) {
            document.getElementById(COMPLETED_BOOK_LIST).append(bookElement);
        } else {
            document.getElementById(UNCOMPLETED_BOOK_LIST).append(bookElement);
        }
    }
}

function addBook() {
    const id = +new Date();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    const objectOfBook = createBookObject(id, title, author, year, isComplete);

    const book = createBookElement(objectOfBook);

    books.push(objectOfBook);
    updateData();

    if (isComplete) {
        document.getElementById(COMPLETED_BOOK_LIST).append(book);
    } else {
        document.getElementById(UNCOMPLETED_BOOK_LIST).append(book);
    }

    document.getElementById('inputBookTitle').value = null;
    document.getElementById('inputBookAuthor').value = null;
    document.getElementById('inputBookYear').value = null;
    document.getElementById('inputBookIsComplete').checked = null;
    document.getElementById('inputBookTitle').focus();
}

function createBookElement(data) {
    const container = document.createElement('article');
    container.setAttribute('id',  data.id);
    container.classList.add('book_item');

    const title = document.createElement('h3');
    title.innerText = data.title;

    const author = document.createElement('p');
    author.innerText = 'Penulis: ' + data.author;

    const year = document.createElement('p');
    year.innerText = 'Tahun: ' + data.year;

    const deleteButton = createDeleteButton(data);
    const markReadButton = createMarkReadButton(data);
    const markUnreadButton = createMarkUnreadButton(data);

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('action');

    if (data.isComplete) {
        buttonsWrapper.append(markUnreadButton);
    } else {
        buttonsWrapper.append(markReadButton);
    }

    buttonsWrapper.append(deleteButton);

    container.append(title, author, year, buttonsWrapper);

    return container;
}

function createDeleteButton(data) {
    const button = document.createElement("button");
    button.innerText = 'Hapus buku';
    button.classList.add('red');

    button.addEventListener('click', function() {
        const confirmation = confirm('Apakah kamu yakin menghapus buku ' + data.title + '?');
        if (confirmation) {
            const parentElement = document.getElementById(data.id);
            parentElement.remove();

            deleteSingleBook(data.id);
            updateData();
        }
    })

    return button;
}

function createMarkReadButton(data) {
    const button = document.createElement("button");
    button.innerText = 'Selesai dibaca';
    button.classList.add('green');

    button.addEventListener('click', function() {
        const parentElement = document.getElementById(data.id);
        parentElement.remove();

        deleteSingleBook(data.id);

        const newData = Object.assign({}, data, {isComplete: true});
        const book = createBookElement(newData);
        document.getElementById(COMPLETED_BOOK_LIST).append(book);

        books.push(newData);
        updateData();
    })

    return button;
}

function createMarkUnreadButton(data) {
    const button = document.createElement("button");
    button.innerText = 'Belum selesai dibaca';
    button.classList.add('green');

    button.addEventListener('click', function() {
        const parentElement = document.getElementById(data.id);
        parentElement.remove();

        deleteSingleBook(data.id);

        const newData = Object.assign({}, data, {isComplete: false});
        const book = createBookElement(newData);
        document.getElementById(UNCOMPLETED_BOOK_LIST).append(book);

        books.push(newData);
        updateData();
    })

    return button;
}

function search(keyword) {
    const titles = document.getElementsByTagName("h3");

    for (let i = 0; i < titles.length; i++) {
        const titleText = titles[i].textContent || titles[i].innerText;

        if (titleText.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
            titles[i].closest(".book_item").style.display = "";
        } else {
            titles[i].closest(".book_item").style.display = "none";
        }
    }
}
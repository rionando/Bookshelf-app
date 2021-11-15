const KEY = 'bookshelf';

let books = [];

function updateData() {
    if (isStorageSupported()) {
        localStorage.setItem(KEY, JSON.stringify(books));
    }
}

function getAllData() {
    const data = JSON.parse(localStorage.getItem(KEY));

    if (data && data.length) {
        books = data;
        return data;
    }

    return [];
}

function deleteSingleBook(bookId) {
    for (let index = 0; index < books.length; index++) {
        if (books[index].id == bookId) {
            books.splice(index, 1);
            break;
        }
    }
}
function isStorageSupported() {
    if (typeof Storage === 'undefined') {
        alert('browser kamu tidak mendukung web storage!');
        return false;
    } 
    return true;
}

function createBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete,
    };
}
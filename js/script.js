document.addEventListener('DOMContentLoaded', function () {

    const submitBook = document.getElementById('inputBook');
    const searchBook = document.getElementById('searchBook')

    submitBook.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    searchBook.addEventListener('submit',  function(event) {
        event.preventDefault();
        const input = document.getElementById('searchBookTitle').value;
        search(input);
    })

    if (isStorageSupported()) {
        const allSavedBooks = getAllData();
        renderByData(allSavedBooks);
    }
});
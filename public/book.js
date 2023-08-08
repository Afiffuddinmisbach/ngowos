const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');


searchBtn.addEventListener('click', searchBooks);

function searchBooks() {
    const searchTerm = searchInput.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderResults(data);
        })
        .catch(error => {
            console.log('Terjadi kesalahan:', error);
        });
}
function renderResults(data) {
  let view = "";
  for (let index = 0; index < data.items.length; index++) {
      const book = data.items[index].volumeInfo;
      const title = book.title;
      const authors = book.authors ? book.authors.join(', ') : 'Penulis tidak diketahui';
      const image = book.imageLinks ? book.imageLinks.thumbnail : 'Gambar tidak tersedia';
      const readLink = book.infoLink;

      view += `
          <div class="card border-secondary" style="width: 18rem; text-align: center; margin: 10px">
              <img src="${image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title" style="font-family: 'DM Serif Display'; font-weight:600; white-space: normal;">${title}</h5>
                  <p class="card-text" style="white-space: normal;">Penulis: ${authors}</p>
                  <a href="${readLink}" class="btn btn-primary">Baca lebih lanjut</a>
              </div>
          </div>`;
  }
  resultsContainer.innerHTML = view;
}

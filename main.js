const booksList = document.querySelector('.book-list');
const searchInput = document.querySelector('.search-box');
const sortSelect = document.querySelector('.sort-box');
const loginButton = document.getElementById('loginButton');
const signUpButton = document.getElementById('signUpButton');
const loginModal = document.getElementById('loginModal');
const signUpModal = document.getElementById('signUpModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignUpModal = document.getElementById('closeSignUpModal');
const loginSubmit = document.getElementById('loginSubmit');
const signUpSubmit = document.getElementById('signUpSubmit');

let booksData = [];
let currentUser = null;

async function fetchBooks() {
    try {
        const response = await axios.get('http://localhost:5000/books');
        booksData = response.data;
        renderBooks(booksData);
    } catch (error) {
        console.error("Error fetching books data:", error);
    }
}

function renderBooks(books) {
    booksList.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <img class="book-cover" src="${book.coverImage}" alt="${book.title}">
            <div class="book-card-body">
                <h3 class="book-card-title">${book.title}</h3>
                <p>Genre: ${book.genre}</p>
                <p>Rating: ${book.rating}</p>
                <p>Year: ${book.publicationYear}</p>
            </div>
        `;
        booksList.appendChild(bookCard);
    });
}


searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(query)
    );
    renderBooks(filteredBooks);
});


sortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const sortedBooks = [...booksData].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'year') {
            return b.publicationYear - a.publicationYear;
        }
    });
    renderBooks(sortedBooks);
});


loginButton.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});


signUpButton.addEventListener('click', () => {
    signUpModal.style.display = 'flex';
});


closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

closeSignUpModal.addEventListener('click', () => {
    signUpModal.style.display = 'none';
});


loginSubmit.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;


    if (email === "test@example.com" && password === "password") {
        currentUser = { email };
        alert('Login successful!');
        loginModal.style.display = 'none';
    } else {
        alert('Invalid credentials');
    }
});

signUpSubmit.addEventListener('click', () => {
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;


    alert('Sign up successful!');
    signUpModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

fetchBooks();







document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("book-search");
  const resultsContainer = document.getElementById("search-results");

  // The target form fields to auto-fill
  const titleField = document.getElementById("title");
  const authorField = document.getElementById("author");
  const isbnField = document.getElementById("isbn");

  // 1. The Debounce Function (Performance Optimization)
  let timeoutId;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(timeoutId);
    const query = e.target.value.trim();

    if (query.length < 3) {
      resultsContainer.classList.add("hidden");
      resultsContainer.innerHTML = "";
      return;
    }

    // Wait 500ms after the user stops typing before fetching
    timeoutId = setTimeout(() => fetchBooks(query), 500);
  });

  // 2. Fetch Data from Open Library
  async function fetchBooks(query) {
    try {
      // Show a loading indicator
      resultsContainer.classList.remove("hidden");
      resultsContainer.innerHTML = "<li>Loading...</li>";

      // Using the Search API, limiting to 5 results for a clean UI
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`,
      );
      const data = await response.json();

      renderResults(data.docs);
    } catch (error) {
      console.error("Search failed:", error);
      resultsContainer.innerHTML = "<li>Error loading results.</li>";
    }
  }

  // 3. Render the Dropdown
  function renderResults(books) {
    resultsContainer.innerHTML = "";

    if (books.length === 0) {
      resultsContainer.innerHTML = "<li>No books found.</li>";
      return;
    }

    books.forEach((book) => {
      // OpenLibrary sometimes misses data, so we provide fallbacks
      const title = book.title || "Unknown Title";
      const author = book.author_name ? book.author_name[0] : "Unknown Author";
      // Grab the first ISBN available, or leave blank
      const isbn = book.isbn ? book.isbn[0] : "";

      const li = document.createElement("li");
      li.innerHTML = `
                <span class="search-title">${title}</span>
                <span class="search-author">by ${author}</span>
            `;

      // 4. The Auto-Fill Click Event
      li.addEventListener("click", () => {
        titleField.value = title;
        authorField.value = author;
        isbnField.value = isbn;

        // Hide the dropdown and clear the search bar
        resultsContainer.classList.add("hidden");
        searchInput.value = "";
      });

      resultsContainer.appendChild(li);
    });
  }

  // 5. UX Enhancement: Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !searchInput.contains(e.target) &&
      !resultsContainer.contains(e.target)
    ) {
      resultsContainer.classList.add("hidden");
    }
  });
});

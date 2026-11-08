const endpoint = "https://api.giphy.com/v1/gifs/search";
const apiKey = "rthyJRhaVpQhXzCcqpg4RSiGrTSDl6gH";

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif");
const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");

fetchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    searchStatus.textContent = "Enter a search term.";
    return;
  }

  gifContainer.innerHTML = "";
  searchStatus.textContent = "Searching...";

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      q: searchTerm,
      limit: "25",
      rating: "g",
      lang: "en",
    });
    const response = await fetch(`${endpoint}?${params}`);
    if (!response.ok) {
      throw new Error(`GIPHY request failed: ${response.status}`);
    }

    const result = await response.json();
    const images = result.data.map((gif) => gif.images.original.url);

    for (const imageUrl of images) {
      gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3">`;
    }

    searchStatus.textContent = images.length ? "" : "No GIFs found.";
  } catch (error) {
    console.error(error);
    searchStatus.textContent = "Could not load GIFs. Check your connection and API key.";
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchButton.click();
  }
});
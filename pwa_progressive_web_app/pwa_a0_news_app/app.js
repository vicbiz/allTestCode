const apiKey = "9c8e60bee636401f933ebf731951ada9";
const main = document.getElementById("root");
const sourceSelector = document.getElementById("sourceSelector");
const defaultSource = "cnn";

window.addEventListener("load", async (e) => {
  updateNews();
  await updateSources();

  sourceSelector.addEventListener("change", async (e) => {
    updateNews(e.target.value);
  });
});

async function updateSources() {
  const url = `http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/sources/?apiKey=${apiKey}`;
  const request = new Request(url);

  fetch(request)
    .then((response) => response.json())
    .then((sourcesJson) => {
      // console.log(sourcesJson);
      sourceSelector.innerHTML = sourcesJson.sources
        .map((src) => `<option value=${src.id}>${src.name}</option>`)
        .join("\n");
      sourceSelector.value = defaultSource;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function updateNews(source = defaultSource) {
  const url = `http://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
  const request = new Request(url);

  fetch(request)
    .then((response) => response.json())
    .then((news) => {
      // console.log(news);
      main.innerHTML = news.articles
        .map((article) => createArtilce(article))
        .join("\n");
    })
    .catch((error) => {
      console.log(error);
    });
}

function createArtilce(article) {
  const articleImg = article.urlToImage
    ? `<img src="${article.urlToImage}" alt="${article.title}">`
    : "";
  return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        ${articleImg}
        <p>${article.description}</p>
      </a>
    </div>
  `;
}

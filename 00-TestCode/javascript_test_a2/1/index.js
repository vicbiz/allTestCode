import "./newsArticle.js";

import newsData from "./newsTestData.js";

window.addEventListener("load", () => {
  fetchNews();
});

function fetchNews() {
  const main = document.querySelector("main");

  newsData.articles.forEach((article) => {
    console.log("article", article);
    const el = document.createElement("news-article");
    el.article = article;
    main.appendChild(el);
  });
}

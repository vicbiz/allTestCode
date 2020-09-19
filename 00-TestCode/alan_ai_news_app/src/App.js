import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./style.js";

import alanLogo from "./images/alan.jpg";
import alanLogo2 from "./images/alan.png";

import { fetchNews } from "./components/fetchNews/fetchNews";

// from https://studio.alan.app/embed/news_reader_app
const alanKey =
  "ae83513dec3b0220ff23aad5428de1f62e956eca572e1d8b807a3e2338fdd0dc/prod";

// const newsapiKey = "9c8e60bee636401f933ebf731951ada9";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const [dataFromButton, setDataFromButton] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        setDataFromButton(false);
        if (command === "newHeadlines") {
          // console.log("articles", articles);
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsToNumbers(number) : number;
          const article = articles[parsedNumber - 1];

          // console.log("**************************");
          // console.log("command:", command);
          // console.log("number:", number, "parsedNumber:", parsedNumber);
          // console.log("article.url:", article.url);
          // console.log("**************************");

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          }
        }
      },
    });
  }, []);

  const getLatestNews = async (e) => {
    const data = await fetchNews();
    setNewsArticles(data.articles);
    setActiveArticle(-1);
    setDataFromButton(true);
  };

  const goBack = (e) => {
    setNewsArticles([]);
    setActiveArticle(-1);
  };

  if (!newsArticles.length) {
    return (
      <div>
        <div className={classes.logoContainer}>
          <img
            src={alanLogo2}
            className={classes.alanLogo}
            alt="Alan AI"
            onClick={goBack}
          />
        </div>

        <div className={classes.menuOptionMsg}>
          <button onClick={getLatestNews}>Get the latest news</button>
        </div>

        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src={alanLogo2}
          className={classes.alanLogo}
          alt="Alan AI"
          onClick={goBack}
        />
      </div>

      <div className={classes.menuOptionMsg}>
        Avaiable Voice Command:
        {dataFromButton ? "" : '"Open article number [1~20]" / '}
        <span class="backLink" onClick={goBack}>
          "Go Back"
        </span>
      </div>

      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;

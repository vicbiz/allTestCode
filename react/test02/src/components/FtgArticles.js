import React, { useState, useEffect } from "react";

function FtgArticles() {
  const [articles, setArticles] = useState([]);
  const apiUrl = `https://www.forbestravelguide.com/api/destination-map.json`;

  const getArticles = async apiUrl => {
    try {
      const apiRest = await fetch(apiUrl);
      const restJSON = await apiRest.json();
      // console.log(restJSON);
      setArticles(restJSON);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getArticles(apiUrl);
  }, [apiUrl]);

  return (
    <div className="articlesBlock">
      <h1>Forbes Travel Guide</h1>
      <div className="total">{articles.length} destinations</div>

      <div className="articleList">
        {articles.map((data, i) => (
          <div key={i}>
            <div className="card">
              <a
                href={`https://www.forbestravelguide.com/destinations/${data.destinationId}`}
                target="_blank"
              >
                <img
                  className="destImg"
                  alt={data.destinationName}
                  src={data.imgURL.replace("/medium", "/")}
                />
              </a>
              <div className="destInfo">
                <a
                  href={`https://www.forbestravelguide.com/destinations/${data.destinationId}`}
                  target="_blank"
                >
                  {data.destinationName}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// https://www.forbestravelguide.com/news.json

export default FtgArticles;

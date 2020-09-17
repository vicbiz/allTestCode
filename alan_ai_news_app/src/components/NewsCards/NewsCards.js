import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@material-ui/core";

// makeStyles (export default) Named to 'useStyles' to use as Hook
import useStyles from "./styles.js";

const infoCards = [
  { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#1565c0",
    title: "News by Categories",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
  },
  {
    color: "#283593",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  // classes --> makeStyles
  const classes = useStyles();

  if (!articles.length) {
    return (
      <>
        <Grow in>
          <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
          >
            {infoCards.map((infoCard, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                className={classes.infoCard}
                key={idx}
              >
                <div
                  className={classes.card}
                  style={{ backgroundColor: infoCard.color }}
                >
                  <Typography variant="h5">{infoCard.title}</Typography>
                  {infoCard.info ? (
                    <Typography variant="h6">
                      <strong>
                        {infoCard.title.split(" ")[2]}:<br />
                      </strong>
                      {infoCard.info}
                    </Typography>
                  ) : null}
                  <Typography variant="h6">
                    Try saying: <br />
                    <i>"{infoCard.text}"</i>
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grow>
      </>
    );
  }

  return (
    <>
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {/* Instant Return... so not {} use () */}
          {articles.map((article, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ display: "flex" }}
              key={i}
            >
              <NewsCard article={article} activeArticle={activeArticle} i={i} />
            </Grid>
          ))}
        </Grid>
      </Grow>
    </>
  );
};

export default NewsCards;

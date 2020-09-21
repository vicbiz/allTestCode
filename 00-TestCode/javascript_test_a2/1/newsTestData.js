const newsData = {
  status: "ok",
  totalResults: 10,
  articles: [
    {
      source: { id: "cnn", name: "CNN" },
      author: "Kelly Mena and Lauren Mascarenhas, CNN",
      title:
        "How pancreatic cancer has been a deadly disease for American icons in 2020",
      description:
        "Supreme Court Justice Ruth Bader Ginsburg died on Friday from complications of metastatic pancreatic cancer.",
      url:
        "http://us.cnn.com/2020/09/19/politics/pancreatic-cancer-explained-ruth-bader-ginsburg-john-lewis/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/200919105957-07-ruth-bader-ginsburg-lead-image-super-tease.jpg",
      publishedAt: "2020-09-19T19:55:18Z",
      content: null,
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Sandra Gonzalez, CNN",
      title: "Felicity Jones honors late Ruth Bader Ginsburg",
      description:
        'Felicity Jones, who played late Supreme Court Justice Ruth Bader Ginsburg in the film "On the Basis of Sex," is honoring the woman whose story she brought to the big screen.',
      url:
        "http://us.cnn.com/2020/09/19/entertainment/on-the-basis-of-sex-ruth-bader-ginsburg-felicity-jones/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/181206152504-on-the-basis-of-sex-felicity-jones-super-tease.jpg",
      publishedAt: "2020-09-19T18:33:10Z",
      content:
        '(CNN)Felicity Jones, who played late Supreme Court Justice Ruth Bader Ginsburg in the film "On the Basis of Sex," is honoring the woman whose story she brought to the big screen. \r\n"Ruth Bader Ginsbu… [+1304 chars]',
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: null,
      title: "Remembering Ruth Bader Ginsburg - CNN",
      description: null,
      url:
        "https://www.cnn.com/specials/politics/digital-channel-ruth-bader-ginsburg",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/190110151918-02-ruth-bader-ginsburg-lead-image-super-tease.jpg",
      publishedAt: "2020-09-19T15:52:31.363191Z",
      content:
        "Take a look back at the life and legacy of Supreme Court Justice Ruth Bader Ginsburg with our new streaming channel.",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Analysis by Maeve Reston, CNN",
      title: "Analysis: Ruth Bader Ginsburg's death reshapes the 2020 campaign",
      description:
        "With 45 days before the election, the battle over who will replace Ruth Bader Ginsburg on the Supreme Court is already reshaping the debate in the presidential race and more than a half-dozen closely-fought Senate races, with the potential to turn out impassi…",
      url:
        "http://us.cnn.com/2020/09/19/politics/supreme-court-ginsburg-senate-2020/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/190110152017-03-ruth-bader-ginsburg-lead-image-super-tease.jpg",
      publishedAt: "2020-09-19T14:00:36Z",
      content: null,
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: "Joan Biskupic and Ariane de Vogue, CNN",
      title: "Justice Ruth Bader Ginsburg dead at 87",
      description:
        "Supreme Court Justice Ruth Bader Ginsburg died on Friday due to complications of metastatic pancreas cancer, the court announced. She was 87.",
      url:
        "http://us.cnn.com/2020/09/18/politics/ruth-bader-ginsburg-dead/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/200714175736-ginsburg-feb-2020-super-tease.jpg",
      publishedAt: "2020-09-19T04:10:06Z",
      content:
        "(CNN)Supreme Court Justice Ruth Bader Ginsburg died on Friday due to complications of metastatic pancreas cancer, the court announced. She was 87.\r\nGinsburg was appointed in 1993 by President Bill Cl… [+13060 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: null,
      title: "Joe Biden reacts to Ruth Bader Ginsburg's death  - CNN Video",
      description:
        "Democratic presidential nominee Joe Biden reacts to the death of Justice Ruth Bader Ginsburg.",
      url:
        "http://us.cnn.com/videos/us/2020/09/19/biden-ruth-bader-ginsburg-rbg-vpx.cnn",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/200918214553-biden-rbg-super-tease.jpg",
      publishedAt: "2020-09-19T03:07:20.9958721Z",
      content:
        "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds.",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author: null,
      title: "In photos: Supreme Court Justice Ruth Bader Ginsburg",
      description:
        "See photos of Ruth Bader Ginsburg, the second woman to serve on the US Supreme Court. Ginsburg died Friday, September 18, due to complications from pancreatic cancer. She was 87.",
      url:
        "http://us.cnn.com/2017/06/06/politics/gallery/ruth-bader-ginsburg/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/170517111357-01-justice-ruth-bader-ginsberg-restricted-super-tease.jpg",
      publishedAt: "2020-09-19T02:22:08Z",
      content:
        "Supreme Court Justice Ruth Bader Ginsburg is seen in Washington in 2013. She was the second woman to serve on the Supreme Court.\r\nRuth Bader Ginsburg, the second woman to serve on the US Supreme Cour… [+898 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author:
        'By <a href="/profiles/fernando-alfonso-iii">Fernando Alfonso III</a>, <a href="/profiles/veronica-rocha">Veronica Rocha</a>, <a href="/profiles/meg-wagner">Meg Wagner</a> and Melissa Macaya, CNN',
      title: "Live updates: Ruth Bader Ginsburg death reactions and tributes",
      description:
        "Supreme Court Justice Ruth Bader Ginsburg has died at the age of 87. Follow here as we remember the life of the second woman appointed to the bench.",
      url:
        "https://www.cnn.com/us/live-news/ruth-bader-ginsburg-death-live-updates/h_89140e578d6ca4f474421880d4bac6bc",
      urlToImage:
        "https://dynaimage.cdn.cnn.com/cnn/digital-images/org/2438bf06-09a3-46c7-9fa0-5bcd4aa70a2e.jpg",
      publishedAt: "2020-09-18T23:43:32Z",
      content:
        "Supreme Court Justice Ruth Bader Ginsburg was remembered at an online service on the eve of Rosh Hashanah at Adas Israel Congregation in Washington, DC, according to a congregant.\r\nA photo of Ginsbur… [+1032 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author:
        'By <a href="/profiles/fernando-alfonso-iii">Fernando Alfonso III</a>, <a href="/profiles/veronica-rocha">Veronica Rocha</a>, <a href="/profiles/meg-wagner">Meg Wagner</a> and Melissa Macaya, CNN',
      title: "Live updates: Ruth Bader Ginsburg death reactions and tributes",
      description:
        "Supreme Court Justice Ruth Bader Ginsburg has died at the age of 87. Follow here as we remember the life of the second woman appointed to the bench.",
      url:
        "https://www.cnn.com/us/live-news/ruth-bader-ginsburg-death-live-updates/h_a704693f7ae6f20633f3885224b62850",
      urlToImage:
        "https://dynaimage.cdn.cnn.com/cnn/digital-images/org/8d5ebace-5155-4281-aee4-c534a21e781d.jpg",
      publishedAt: "2020-09-18T23:43:32Z",
      content:
        "President Trump has updated a roster of more than 20 potential Supreme Court nominees in recent weeks, a list that includes prominent and lesser-known conservatives who would undoubtedly tilt the cou… [+2542 chars]",
    },
    {
      source: { id: "cnn", name: "CNN" },
      author:
        'By <a href="/profiles/fernando-alfonso-iii">Fernando Alfonso III</a>, <a href="/profiles/veronica-rocha">Veronica Rocha</a>, <a href="/profiles/meg-wagner">Meg Wagner</a>, Melissa Macaya and Rob Picheta, CNN',
      title: "Live updates: Ruth Bader Ginsburg death reactions and tributes",
      description:
        "Supreme Court Justice Ruth Bader Ginsburg has died at the age of 87. Follow here as we remember the life of the second woman appointed to the bench.",
      url:
        "https://www.cnn.com/us/live-news/ruth-bader-ginsburg-death-live-updates/h_30abfee93b4e00a475b635e9731bdbd3",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/200714175736-ginsburg-feb-2020-super-tease.jpg",
      publishedAt: "2020-09-18T23:43:32Z",
      content:
        "For young women, Justice Ruth Bader Ginsburg was a role model who demonstrated whats possible for them.\r\nSeeing a woman on the Supreme Court was inspirational, and that representation matters, said 2… [+1608 chars]",
    },
  ],
};
export default newsData;

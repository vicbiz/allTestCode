import axios from "axios";

const NEWS_API_KEY = "9c8e60bee636401f933ebf731951ada9";
const URL = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&country=us`;

export const fetchNews = async () => {
  const { data } = await axios.get(URL);
  // console.log("data", data);
  return data;
};

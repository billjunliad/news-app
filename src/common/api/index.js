import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
export const getTopHeadlines = async (page, keywords) => {
  const resp = await axios.get(`https://newsapi.org/v2/top-headlines?q=${keywords}&country=us&pageSize=20&page=${page}&apiKey=${apiKey}`);
  return resp.data;
};

export const getAllNews = async (page, keywords, sortBy) => {
  const resp = await axios.get(`https://newsapi.org/v2/everything?q=${keywords}&pageSize=20&page=${page}&sortBy=${sortBy}&apiKey=${apiKey}`);
  return resp.data;
};

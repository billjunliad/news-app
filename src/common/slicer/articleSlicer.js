import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTopHeadlines, getAllNews } from '../api';

const initialState = {
  articles: [],
  articleView: {},
  status: 'idle',
  error: null,
  count: 0,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    viewArticle: (state, action) => {
      state.articleView = action.payload;
    },
    resetArticles: (state) => {
      state.articles = [];
      state.status = 'idle';
      state.count = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHeadlineArticles.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getHeadlineArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.count = action.payload.totalResults;
      })
      .addCase(getHeadlineArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllNewsArticles.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllNewsArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.count = action.payload.totalResults;
      })
      .addCase(getAllNewsArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const getHeadlineArticles = createAsyncThunk('articles/getTopHeadlines', async (data) => {
  const response = await getTopHeadlines(data.page, data.keywords);
  return response;
});

export const getAllNewsArticles = createAsyncThunk('articles/getAllNews', async (data) => {
  console.log(data.keywords);
  const response = await getAllNews(data.page, data.keywords, data.sortby);
  return response;
});

export const selectAllArticles = (state) => state.articles.articles;
export const { addArticle, viewArticle, resetArticles } = articleSlice.actions;
export default articleSlice.reducer;

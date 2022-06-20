import { configureStore } from '@reduxjs/toolkit';
import articleSlice from '../common/slicer/articleSlicer';

export const store = configureStore({
  reducer: {
    articles: articleSlice,
  },
});

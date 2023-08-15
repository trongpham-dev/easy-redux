import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './pages/blog/blog.reducer';

export const store = configureStore({
  reducer: { blog: blogReducer }
});

// take RootState and AppDispatch from our store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

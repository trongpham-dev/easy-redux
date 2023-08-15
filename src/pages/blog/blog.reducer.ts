import { createReducer, createAction, current, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Post } from '../../types/blog.type';
import { initialPostList } from '../../constants/blog';

interface BlogState {
  postList: Post[];
  editingPost: Post | null;
}
const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
};
export const addPost = createAction<Post>('blog/addPost');
export const deletePost = createAction<string>('blog/deletePost');
export const startEditingPost = createAction<string>('/blog/startEditingPost');
export const cancelEditingPost = createAction('/blog/cancelEditingPost');
export const finishEditingPost = createAction<Post>('/blog/finishEditingPost');

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      // immerjs
      // immerjs giúp chúng ta mutate một state an toàn
      const post = action.payload;
      state.postList.push(post);
    })
    .addCase(deletePost, (state, action) => {
      console.log('start', current(state));
      const postId = action.payload;
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId);
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1);
      }
      console.log('finish', current(state));
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload;
      const foundPost = state.postList.find((post) => post.id === postId) || null;
      state.editingPost = foundPost;
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null;
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id;
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload;
          return true;
        }
        return false;
      });
      state.editingPost = null;
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(current(state));
      }
    );
});

export default blogReducer;

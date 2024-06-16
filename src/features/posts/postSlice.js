import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    setPostList: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    }
  }
});

export const { setPostList, addPost, deletePost } = postSlice.actions;

export default postSlice.reducer;

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/api/post');
    dispatch(setPostList(response.data.data.posts));
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

export const createNewPost = (postData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8000/api/post', postData);
    dispatch(addPost(response.data.data.post));
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export const removePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/api/post/${postId}`);
    dispatch(deletePost(postId));
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

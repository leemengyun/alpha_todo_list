// src/api/todos.js

//set up axios
import axios from 'axios';
const baseUrl = 'http://localhost:3004';

// 透過 Axios 向後端資料庫發出請求，因此需要等待資料庫回應之後，
// 才能繼續後面的動作。這種含有「等待」的程式流程，稱為「非同步」 (Asynchronous)處理

//get todo data
export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.error('[GET todos failed:]:', error);
  }
};

//create new todo data
export const createTodo = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axios.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[CREATE todos failed:]:', error);
  }
};
export const patchTodo = async (payload) => {
  try {
    const { id, title, isDone } = payload;
    const res = await axios.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Update todos failed:]:', error);
  }
};
export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[delete todos failed:]:', error);
  }
};

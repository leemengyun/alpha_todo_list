// src/api/todos.js

//set up axios
import axios from 'axios';
// const baseUrl = 'http://localhost:3004';
const baseUrl = 'https://todo-list.alphacamp.io/api/';

const axiosInstance = axios.create({
  baseUrl: baseUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.error(error);
  }
);

// 透過 Axios 向後端資料庫發出請求，因此需要等待資料庫回應之後，
// 才能繼續後面的動作。這種含有「等待」的程式流程，稱為「非同步」 (Asynchronous)處理

//get todo data
export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    //實際上getTodo的data包在下一層
    return res.data.data;
  } catch (error) {
    console.error('[GET todos failed:]:', error);
  }
};

//create new todo data
export const createTodo = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
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
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
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
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[delete todos failed:]:', error);
  }
};

////首先測試login api

import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    console.log(data);

    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('["login failed"]', error);
  }
};

export const register = async ({ username, password, email }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      password,
      email,
    });

    console.log(data);

    //用解構式帶出data
    //登入成功的結果
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }

    //登入失敗的結果
    return data;
  } catch (error) {
    console.error('["login failed"]', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/`, {
      headers: {
        Authorization: 'Bearer' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};

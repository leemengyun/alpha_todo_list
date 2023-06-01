import React, { useState } from 'react';
import { useEffect } from 'react';
//頁面切換是 react-router-dom 提供的 Link 功能
import { Link } from 'react-router-dom';
import { login } from 'api/auth';
//要在 React component 裡轉址，可以使用 react-router-dom 提供的 React Hook
import { useNavigate } from 'react-router-dom';
import { checkPermission } from 'api/auth';

import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';

//modal dialog套件
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    const { success, authToken } = await login({ username, password });

    //登入成功
    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '登入成功',
        text: `歡迎${username}回來`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        position: 'center',
      });
      navigate('/todos');
      return;
    }
    //登入失敗
    Swal.fire({
      title: 'OOPS',
      text: `找不到此筆user訊息，請確認是否有誤`,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      position: 'center',
    });
  };

  //檢查token
  useEffect(() => {
    const checkTokenIsvalid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        navigate('/todos');
      }
    };
    checkTokenIsvalid();
  }, [navigate]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label='帳號'
          placeholder='請輸入帳號'
          value={username}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type='password'
          label='密碼'
          placeholder='請輸入密碼'
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to='/signup'>
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;

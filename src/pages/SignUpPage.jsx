import React, { useEffect } from 'react';
import { useState } from 'react';
//頁面切換是 react-router-dom 提供的 Link 功能
import { Link } from 'react-router-dom';
import { checkPermission, register } from 'api/auth';
//要在 React component 裡轉址，可以使用 react-router-dom 提供的 React Hook
import { useNavigate } from 'react-router-dom';

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

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    const { success, authToken } = await register({
      username,
      password,
      email,
    });

    //註冊成功
    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '註冊成功',
        text: `歡迎${username}加入`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        position: 'center',
      });
      navigate('/todos');
      return;
    }

    //註冊失敗
    Swal.fire({
      title: 'OOPS',
      text: `無法註冊，此email/帳號已被使用`,
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
      <h1>建立您的帳號</h1>

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
          type='email'
          label='Email'
          placeholder='請輸入信箱'
          value={email}
          onChange={(emailInputValue) => setemail(emailInputValue)}
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
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to='/login'>
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;

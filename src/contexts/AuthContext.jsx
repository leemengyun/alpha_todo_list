// 建立 Context 步設定 Provider
import { createContext, useContext, useState, useEffect } from 'react';
import { register, login, checkPermission } from 'api/auth';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

//定義我們想共享的狀態與方法
const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  register: null, // 註冊方法
  login: null, // 登入方法
  logout: null, // 登入方法
};
//用 createContext 完成 Context 的建立。
const AuthContext = createContext(defaultAuthContext);
//導出 AuthContext
export const useAuth = () => useContext(AuthContext);

//定義provider，並封裝會影響到身份狀態的註冊、登入、登出方法，他會回傳一個可讓子元件共用的 <AuthContext.Provider>
export const AuthProvider = ({ children }) => {
  // 先初步設定 state，並用 props 的方式傳給 <AuthContext.Provider>：
  // isAuthenticated - 是否已獲得授權
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //payload - 等下會從 authToken 裡解析出使用者資料，放進 currentMember
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  //封裝檢查token
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          //JWT 解析工具所提供的
          //** 需要先安裝 JSON Web Token 套件，才能使用 JWT 提供的解析方法
          id: payload.sub, // 取出 sub 字串，可以做為使用者 id
          name: payload.name, // 取出使用者帳號
        }, //payload 解析資訊來的，因此要做預設除錯
        //共用的register流程
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            password: data.password,
            email: data.email,
          });
          // 解析payload
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        //共用的login流程
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          //解析payload
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        //共用的logout流程
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

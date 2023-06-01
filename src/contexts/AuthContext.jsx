// 建立 Context 步設定 Provider
import { createContext, useState } from 'react';

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

//定義provider，並封裝會影響到身份狀態的註冊、登入、登出方法，他會回傳一個可讓子元件共用的 <AuthContext.Provider>

const AuthProvider = ({ children }) => {
  // 先初步設定 state，並用 props 的方式傳給 <AuthContext.Provider>：
  // isAuthenticated - 是否已獲得授權
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //payload - 等下會從 authToken 裡解析出使用者資料，放進 currentMember
  const [playload, setPlayload] = useState(null);

  return (
    <AuthContext.Provider>
      value=
      {{
        isAuthenticated,
        currentMember: playload,
      }}
    </AuthContext.Provider>
  );
};

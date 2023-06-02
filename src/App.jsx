import React from 'react';
import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { AuthProvider } from 'contexts/AuthContext';

// import react-router-dom
// tutorial-page : https://reactrouter.com/en/v6.3.0/getting-started/overview#configuring-routes
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from 'react-router-dom';

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <div className='app'>
      <BrowserRouter basename={basename}>
        {/* //讓 <AuthProvider> 包住所有元件，如此一來子元件就可以取用 Context 的共享內容 */}
        {/* 但需要放在 <BrowserRouter> 裡面，因為我們在 AuthProvider 裡有使用到瀏覽器的資訊 */}
        <AuthProvider>
          <Routes>
            <Route path='*' element={<HomePage />}></Route>
            <Route path='login' element={<LoginPage />}></Route>
            <Route path='signup' element={<SignUpPage />}></Route>
            <Route path='todos' element={<TodoPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

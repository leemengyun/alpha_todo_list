import React from 'react';
import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';

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

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="todo" element={<TodoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signup/Signup';
import App from './App';
import './assets/base.css';


createRoot(document.getElementById('app')!).render(
  <HashRouter>
    <Routes>
      {/* URL path와 컴포넌트 매핑 */}
      <Route path="/" element={<Login />} />            
      <Route path="/signup" element={<Signup />} />         

      <Route path="/app" element={<App />} />         
      
      {/* http://…/#/ */}

      {/* 404 처리: 경로가 모두 일치하지 않을 때 */}
      <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  </HashRouter>
);

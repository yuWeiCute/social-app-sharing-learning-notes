import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { UserProfile } from './components';

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      <Route path="/user-profile/:userId" element={<UserProfile />} />
    </Routes>
  )
}

export default App
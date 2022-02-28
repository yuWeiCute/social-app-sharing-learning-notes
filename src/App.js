import React, { Fragment, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./container/Home"));
const UserProfile = lazy(() => import("./components/UserProfile"));

const App = () => {
  return (

    <Suspense fallback={<Fragment />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
      </Routes>
    </Suspense>


  )
}

export default App
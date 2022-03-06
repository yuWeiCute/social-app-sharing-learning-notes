import React, { Fragment, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './container/Home';
import UserProfile from './container/components/UserProfile/UserProfile';
import store from './redux/store'

const Login = lazy(() => import("./container/components/Login"));

const App = () => {
  store.subscribe(function() {
    document.title = headTitle
})
  // const isLogged =useSelector(state => state.isLogged)
  return (
    <Suspense fallback={<Fragment />}> 
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
      </Routes>
     </Suspense>
  )
}

export default App
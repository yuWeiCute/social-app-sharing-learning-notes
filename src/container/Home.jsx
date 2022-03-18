import React, { useState, useRef, useEffect, Fragment, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navigation';
import { Search, Feed, PostDetail, CreatePost, } from './components/Posts';
import { userQuery } from '../shared/utils/data';
import { client } from '../client';


 const Posts = lazy(() => import("./components/Posts/Posts"));
 const Myhome = lazy(() => import("./components/Home/Myhome"));

const Home = () => {
  
  //for search
  // const dispatch = useDispatch


  const [searchTerm, setSearchTerm] = useState('');

  const [user, setUser] = useState();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const scrollRef = useRef(null);

//   store.subscribe(function() {
//     document.title = headTitle
// })

  useEffect(() => {
    document.title = 'YUWEI - Inspiration & Notes From All Around Web'
    const query = userQuery(userInfo?.node_id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });


  return (


    <div className="flex bg-gray-50 md:flex-column flex-col h-screen transition-height duration-75 ease-out">

      <Navbar user={user && user} />

      {/* 等于work的时候显示 */}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
      <Suspense fallback={<Fragment />}> 
        <Routes>
          <Route path="" element={<Myhome />} />
          <Route path="post-detail/:pinId" element={<PostDetail user={user && user} />} />
          <Route path="create-post" element={<CreatePost user={user && user} />} />
          <Route path="/work" element={<Posts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} >
            <Route path="" element={<Feed />} />
            <Route path="category/:categoryId" element={<Feed />} />
            
            
            <Route path="search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Route>
        </Routes>
        </Suspense>
      </div>

    </div>
  )
}

export default Home
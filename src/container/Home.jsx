import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { NavLink, Link, Route, Routes, useParams } from 'react-router-dom';
import { Searchbar, Sidebar, UserProfile, Search, Feed, PinDetail, CreatePin, Navbar } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import logo from '../assets/logo.png';
import Pins from './Pins';


const Home = () => {
  //for search
  const [searchTerm, setSearchTerm] = useState('');

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const scrollRef = useRef(null);

  useEffect(() => {
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


      {/* <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div> */}
      <Navbar user={user && user} />





      {/* 内容部分 */}

      {/* for search */}
      {/* <div className="bg-gray-50 px-2 md:px-2 ">

        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div> */}



      {/* 等于work的时候显示 */}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          {/* <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} /> */}

          <Route path="/work" element={<Pins user={user && user} />} >
            <Route path="" element={<Feed />} />
            <Route path="category/:categoryId" element={<Feed />} />
            <Route path="pin-detail/:pinId" element={<PinDetail user={user && user} />} />
            <Route path="create-pin" element={<CreatePin user={user && user} />} />
            <Route path="search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Route>
        </Routes>
        {/* <div className="px-2 md:px-2">
          <div className="bg-gray-50">
            <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
          </div>
          <div className="h-full">
            <Routes>
              <Route path="/work" element={<Feed />} />
              <Route path="/work/category/:categoryId" element={<Feed />} />
              <Route path="/work/pin-detail/:pinId" element={<PinDetail user={user && user} />} />
              <Route path="/work/create-pin" element={<CreatePin user={user && user} />} />
              <Route path="/work/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            </Routes>
          </div>
        </div> */}
      </div>

    </div>
  )
}

export default Home
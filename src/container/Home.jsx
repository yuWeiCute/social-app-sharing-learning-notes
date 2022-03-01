import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { NavLink, Link, Route, Routes, useParams } from 'react-router-dom';
import { Searchbar, Sidebar, UserProfile, Search, Feed, PinDetail, CreatePin, Navbar } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import logo from '../assets/logo.png';
import Pins from './Pins';
import Myhome from '../components/Home/Myhome';


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


  useEffect(() => {
    const query = userQuery(userInfo?.node_id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  
  return (


    <div className="flex bg-gray-50 md:flex-column flex-col h-screen transition-height duration-75 ease-out">

      <Navbar user={user && user} />




      {/* 等于work的时候显示 */}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="" element={<Myhome/>} />
          <Route path="/work" element={<Pins searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} >
            <Route path="" element={<Feed />} />
            <Route path="category/:categoryId" element={<Feed />} />
            <Route path="pin-detail/:pinId" element={<PinDetail user={user && user} />} />
            <Route path="create-pin" element={<CreatePin user={user && user} />} />
            <Route path="search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Route>
        </Routes>
      </div>

    </div>
  )
}

export default Home
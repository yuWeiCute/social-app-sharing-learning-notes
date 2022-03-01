import React, { useState } from 'react';
import { Routes, Route,Outlet } from 'react-router-dom';

import { Searchbar, Feed, PinDetail, CreatePin, Search } from '../components';

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
      <Outlet />
        {/* <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user && user} />} />
          <Route path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes> */}
      </div>
    </div>
  );
};

export default Pins;
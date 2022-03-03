import React, { useState } from 'react';
import { Routes, Route,Outlet } from 'react-router-dom';

import { Searchbar } from '../Navigation';

const Pins = ({ searchTerm, setSearchTerm }) => {
  // const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="md:m-3 h-full">
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
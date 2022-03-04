import React from 'react';
import { Outlet } from 'react-router-dom';
import { Searchbar } from '../Navigation';

const Posts = ({ searchTerm, setSearchTerm }) => {

  return (
    <div className="px-2 md:px-7">
      <div className="bg-gray-50">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="md:m-3 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Posts;
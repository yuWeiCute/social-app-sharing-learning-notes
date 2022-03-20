import React from 'react';
import { Outlet } from 'react-router-dom';
import { Searchbar } from '../Navigation';
import './post.scss'

const Posts = ({ searchTerm, setSearchTerm }) => {

  return (
    <div className="px-2 md:px-7 bgImage h-full overflow-hidden" style={{backgroundImage:"url(" + require("../Home/assets/bgWhite.webp") + ")"}}>
      <div className="md:m-3 z-99">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className=" md:m-3 h-full 2xl:px-24 justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Posts;
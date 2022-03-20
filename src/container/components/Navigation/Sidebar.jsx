import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../../../shared/assets/logo.webp';
import { categories } from '../../../shared/utils/data';
import { motion } from 'framer-motion'
import ReactTooltip from 'react-tooltip';
import './bar.scss';

const isNotActiveStyle = ' flex items-center px-5 gap-3 text-gray-400 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';
const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (





        <div className="px-7 lg:px-20 flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
        <motion.div
        initial={{ x:-50,opacity: 0 }}
        animate={{ x:0,opacity: [0,0,1] }}
        exit={{ x:-50,opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="h-full"
      >
          <div className="flex flex-col">
            {/* 图标 */}
            <Link
              to="/"
              className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
              onClick={handleCloseSidebar}
            >
              <img src={logo} alt="logo" className="w-full" />
            </Link>



            <div className="flex flex-col gap-5">



              {/* 主菜单 */}
              <div className=" md:hidden mt-10 px-5 flex flex-row items-center">

                {['home', 'work'].map((item) => (

                  <NavLink
                    to={`/${item === 'home' ? '' : item}`}
                    className={" text-xl font-medium text-gray-500 hover:text-secColor"
                      // ({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)
                    }
                    // onClick={handleCloseSidebar}
                    key={item}
                  >
                    {item}&nbsp;/&nbsp;
                  </NavLink>

                ))}

                {/* 用户图标或登录按钮 */}
                {user ? <></> :
                  <Link to='/login' className="text-xl font-medium text-gray-500 hover:text-secColor">
                    <p >Login</p>
                  </Link>
                }
              </div>



              <h3 className="mt-2 mb-12 px-5 text-base 2xl:text-xl">Discover cateogries</h3>

              {/* categories */}
              {categories.slice(0, categories.length).map((category) => (
                <div className="mt-3 " key={category.name}>

                  <motion.div
                    whileInView={{ opacity: [0, 0, 1] }}
                    whileHover={{ x: 30 }}
                    transition={{ duration: 0.9 }}
                    initial={{ opacity: 0 }}
                    data-tip
                    data-for={category.name}

                  >

                    <div className="text-xs absolute mt-1 ">
                      {category.index}
                    </div>
                    <NavLink
                      to={`/work/category/${category.name}`}
                      className={`mx-7 text-2xl font-medium ${({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}`}
                      onClick={handleCloseSidebar}
                    >{category.name}

                    </NavLink>

                  </motion.div>

                  <ReactTooltip
                    id={category.name}
                    place="right"
                    className={`${category.image}-tooltip tooltip`}
                  />


                  <div className="mt-6 mx-8 bg-lightGrayColor"
                    style={{
                      width: 24,
                      height: 2,
                    }}>
                  </div>

                </div>

              ))}


            </div>
          </div>
      </motion.div>
      <motion.div
        initial={{ x:-50,opacity: 0 }}
        animate={{ x:0,opacity: 1 }}
        exit={{ x:-50,opacity: 0 }}
        transition={{ duration: 1 }}
      >
          {user && (
            <Link
              to={`user-profile/${user._id}`}
              className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
              onClick={handleCloseSidebar}
            >
              <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p>{user.userName}</p>
              <IoIosArrowForward />
            </Link>
          )}
                </motion.div>
        </div>



  );
};

export default Sidebar;

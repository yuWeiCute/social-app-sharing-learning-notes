import React, { useState } from 'react';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { NavLink, Link } from 'react-router-dom';
import { Sidebar } from './';

import logo from '../../../shared/assets/logo.webp';


const Navbar = ({ user }) => {


    const [toggleSidebar, setToggleSidebar] = useState(false);



    return (
        <div className="flex flex-row  ">

            {/* 导航栏 */}
            <div className=" p-2 w-full flex flex-row justify-between items-center bg-opacity-0 h-12">

                {/* 菜单 按钮*/}
                <IoMenu fontSize={40} className="md:hidden cursor-pointer transition-all duration-300 hover:text-secColor" onClick={() => setToggleSidebar(true)} />

                {/* 图标 */}
                <Link to="/">
                    <img src={logo} alt="logo" className="w-28" />
                </Link>

                {/* md时候的菜单 */}
                <ul className="md:flex flex-row items-center text-base font-medium text-gray-500">

                    {['home', 'work'].map((item) => (
                        <NavLink
                            to={`/${item === 'home' ? '' : item}`}
                            className={"hidden md:flex flex-row px-2 "
                                // ({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)
                            }
                            // onClick={handleCloseSidebar}
                            key={item}
                        >
                            <span className='hover:border-b-2 border-blue-700  cursor-pointer  '>
                                {item}
                            </span>
                            &nbsp;&nbsp;  /
                        </NavLink>
                    ))}


                    {/* 用户图标或登录按钮 */}
                    {user ? <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png"
                            }}
                            alt="" className=" w-8 h-8 rounded-full " />
                    </Link> :
                        <Link to='/login' className="px-2  hover:text-secColor">
                            <p className='hover:border-b-2 border-blue-700'>Login</p>
                        </Link>
                    }
                </ul>



            </div>

            {/* 悬浮固定图标 */}
            <IoMenu fontSize={34} className="z-20 hidden md:block absolute cursor-pointer mr-2 right-0 top-1/2 transition-all duration-300 hover:text-secColor"
                onClick={() => setToggleSidebar(true)}
            />


            {/* 侧边栏的显示 */}
            {toggleSidebar && (

                <div className="fixed w-full lg:w-1/2 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in duration-200">
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <IoIosArrowDropleft fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
                    </div>
                    <Sidebar closeToggle={setToggleSidebar} user={user && user} />
                </div>
            )}

        </div>
    )
}

export default Navbar
/* connect(
    (state) => ({ headTitle: state.headTitle })
)() */
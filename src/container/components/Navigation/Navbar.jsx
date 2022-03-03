import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { NavLink, Link } from 'react-router-dom';
import { Sidebar } from './';

import logo from '../../../shared/assets/logo.png';


const Navbar = ({ user }) => {



    const [toggleSidebar, setToggleSidebar] = useState(false);


    return (
        <div className="flex flex-row">

            {/* 导航栏 */}
            <div className=" p-2 w-full flex flex-row justify-between items-center shadow-md">

                {/* 菜单 按钮*/}
                <HiMenu fontSize={40} className="md:hidden cursor-pointer" onClick={() => setToggleSidebar(true)} />

                {/* 图标 */}
                <Link to="/">
                    <img src={logo} alt="logo" className="w-28" />
                </Link>

                {/* md时候的菜单 */}
                <ul className="md:flex flex-row items-center ">


                    {['home', 'work'].map((item) => (
                        <NavLink
                            to={`/${item == 'home' ? '' : item}`}
                            className={"hidden md:flex flex-row px-2 text-base font-medium text-gray-500 hover:text-secColor"
                                // ({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)
                            }
                            // onClick={handleCloseSidebar}
                            key={item}
                        >
                            {item} &nbsp;&nbsp;  /
                        </NavLink>
                    ))}


                    {/* 用户图标或登录按钮 */}
                    {user ? <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="user-pic" className=" w-8 h-8 rounded-full " />
                    </Link> :
                        <Link to='/login' className="px-2 text-base font-medium text-gray-500 hover:text-secColor">
                            <p >Login</p>
                        </Link>
                    }
                </ul>



            </div>

{/* 悬浮固定图标 */}
            <HiMenu fontSize={40} className="hidden md:block absolute cursor-pointer left-0 top-1/2" onClick={() => setToggleSidebar(true)} />


            {/* 侧边栏的显示 */}
            {toggleSidebar && (
                <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
                    </div>
                    <Sidebar closeToggle={setToggleSidebar} user={user && user} />
                </div>
            )}

        </div>
    )
}

export default Navbar
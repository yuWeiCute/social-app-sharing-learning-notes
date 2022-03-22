import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { userCreatedPostsQuery, userQuery, userSavedPostsQuery } from '../../../shared/utils/data';
import { client } from '../../../client';
import MasonryLayout from '../Posts/components/MasonryLayout';
import Spinner from '../../../shared/components/Spinner';
import ReactTooltip from 'react-tooltip';
import logo from '../../../shared/assets/logowhite.webp';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'

const activeBtnStyles = 'bg-secondaryColor text-white font-bold p-2 rounded-full w-20 outline-none hover:text-primary';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none hover:text-secColor';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPostsQuery = userCreatedPostsQuery(userId);

      client.fetch(createdPostsQuery).then((data) => {
        setPosts(data);
      });
    } else {
      const savedPostsQuery = userSavedPostsQuery(userId);

      client.fetch(savedPostsQuery).then((data) => {
        setPosts(data);
      });
    }
  }, [text, userId]);

  const onLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (

    <motion.div
      whileInView={{ y: [20, 10, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      className="bg-white h-screen"
    >

      <div >
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div
              className=" w-full h-20 shadow-lg bg-secondaryColor opacity-75"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover bg-white z-20"
              src={user.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png"
              }}
              alt=""
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            <button
              type="button"
              className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={onLogout}
            ><p data-tip="Logout" >
                <AiOutlineLogout color="red" fontSize={21} />
              </p>
              <ReactTooltip />
            </button>
          </div>
          <div className=" absolute top-0 z-1 left-0 p-2.5">
            <Link to="/">
              <img src={logo} alt="logo" className="cursor-pointer w-36" />
            </Link>
          </div>

        </div>

        <div className="text-center  mb-4">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}` }
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles} 
            cursor-pointer transition-all duration-300 `}
          >
            Saved
          </button>
        </div>

        <AnimatePresence className="px-2">
          {posts?.length !== 0 &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="block m-auto" style={{ maxWidth: '1640px' }}
            >
              <MasonryLayout pins={posts} />
            </motion.div>
          }
        </AnimatePresence>

        {posts?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Posts Found!
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default UserProfile;

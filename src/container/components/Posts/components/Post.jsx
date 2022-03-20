import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  motion } from 'framer-motion'
// unique resource identifier
// this can provide us unique ids for each one of our posts
import { v4 as uuidv4 } from 'uuid';

import { AiTwotoneDelete, AiFillEye } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../../../../client';


const Post = ({ pin }) => {

  const [postHovesecondaryColor, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [beSaved, setBeSaved] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, projectLink, codeLink, title, description, categories } = pin;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePost = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  // just return the item passed
  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.node_id);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  var inThrottle = false;
  const savePost = (id) => {

    if (alreadySaved?.length === 0 && user) {
      if (!inThrottle) {
        inThrottle = true;
        //每秒最多发送一次请求
        setTimeout(() => (inThrottle = false), 1000)
        setSavingPost(true);

        client
          .patch(id)
          //initialize the saving array
          .setIfMissing({ save: [] })
          //save[-1] meaning at end
          .insert('after', 'save[-1]', [{
            //generate an unique id
            _key: uuidv4(),
            userId: user?.node_id,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.node_id,
            },
          }])
          //returning a promise
          .commit()
          .then(() => {
            setSavingPost(false);
            setBeSaved(true)
          });
      } else {
        alert('正在发送请求')
      }
    } else {
      alert('Please login first')
    }
  };


  return (
    <motion.div
      whileInView={{ y: [30, 15, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <div className='z-20 absolute right-7 top-2 flex items-start'>
        <span className='text-xs font-semibold'>
          # &nbsp;
        </span>
        <span className='items-start'>
          <span className='font-mono text-3xl font-semibold text-gray-700'>
            {`${categories[0].slice(0, 1).toUpperCase()}`}
          </span>
          <span className='font-mono text-2xl font-semibold text-gray-700'>
            {`${categories[0].slice(1, categories[0].length - 1).toUpperCase()}`}
          </span>
        </span>
        <span className='font-mono text-3xl font-semibold text-gray-700 transform translate-y-1'>
          {`${categories[0].slice(categories[0].length - 1, categories[0].length).toUpperCase()}`}
        </span>
      </div>
      <div className="m-3 mt-10 xl:ml-5 2xl:ml-10 xl:mr-5 2xl:mr-10 mb-8 ">
        <motion.div

          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, type: 'tween' }}
        >


          <div
            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
            onClick={() => navigate(`/post-detail/${_id}`)}
            className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
          >

            {image && (
              <img style={{ minHeight: '10rem' }} className="rounded-lg w-full"
                src={(urlFor(image).width(400).url())} alt="user-post" />)
            }
            {postHovesecondaryColor && (
              <div
                className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 hover:bg-black hover:bg-opacity-10"
                style={{ height: '100%' }}
              >
                <div className="flex flex-row-reverse items-center justify-between">

                  {/* save按钮按钮 */}
                  {(alreadySaved?.length !== 0) || (beSaved === true) ? (
                    <button type="button" className="bg-secondaryColor opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                      {pin?.save?.length}  Saved
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        savePost(_id);
                      }}
                      type="button"
                      className="bg-secondaryColor opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                    >
                      {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                    </button>
                  )}

                  {/* view*/}
                  {projectLink?.slice(8).length > 0 ? <a
                    target="_blank"
                    rel="noreferrer"
                    href={projectLink}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                    el="noreferrer"
                  >
                    <AiFillEye />
                  </a> : undefined}

                </div>


                <div className=" flex  items-center gap-2 w-full">

                  {/* git*/}
                  {codeLink?.slice(8).length > 0 ? (
                    <a
                      href={codeLink}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      target="_blank"
                      className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                      rel="noreferrer"
                    >
                      {' '}
                      <BsFillArrowUpRightCircleFill />
                      {codeLink?.slice(8, 17)}...
                    </a>
                  ) : undefined}

                  {/* 删除按钮 */}
                  {postedBy?._id === user?.node_id && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePost(_id);
                      }}
                      className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                    >
                      <AiTwotoneDelete />
                    </button>
                  )
                  }
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* 单元的详细 */}
        <Link to={`/user-profile/${postedBy?._id}`} className=" gap-2 mt-2 ">
          <p className="mt-2 text-sm tracking-tight font-medium capitalize" >{title.toUpperCase()}</p>
          <p className="text-sm text-darkGray capitalize leading-5" >{description}</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default Post;

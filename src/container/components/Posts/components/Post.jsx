import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// unique resource identifier
// this can provide us unique ids for each one of our posts
import { v4 as uuidv4 } from 'uuid';

import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete, AiFillEye } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../../../../client';
// import { alert } from '../../../../shared/utils/alert';

const Post = ({ pin }) => {

  const [postHovesecondaryColor, setPostHovesecondaryColor] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [beSaved, setBeSaved] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, projectLink, codeLink, title, description } = pin;

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

  const savePost = (id) => {
    if (alreadySaved?.length === 0 && user) {
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
      alert('Please login first')
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovesecondaryColor(true)}
        onMouseLeave={() => setPostHovesecondaryColor(false)}
        onClick={() => navigate(`/work/post-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />)}
        {postHovesecondaryColor && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">

              {/* view and git按钮 */}
              <div className="flex gap-2">
                <a
                  href={pin.download}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
              </div>

              {/* 保存按钮按钮 */}
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

            </div>

            {/* git  and view*/}
            <div className=" flex  items-center gap-2 w-full">

              <a
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
              </a>

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


      {/* 单元的详细 */}
      <Link to={`/user-profile/${postedBy?._id}`} className=" gap-2 mt-2 ">
        <p className="font-semibold capitalize">{title}</p>
        <p className="capitalize">{description}</p>
      </Link>
    </div>
  );
};

export default Post;
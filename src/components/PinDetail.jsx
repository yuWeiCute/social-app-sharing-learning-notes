import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete, AiFillEye, AiFillGithub } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

//blog body
import BlockContent from "@sanity/block-content-to-react"

const PinDetail = ({ user }) => {
  console.log(user);
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        console.log(data);
        setPinDetail(data[0]);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  //https://www.npmjs.com/package/@sanity/client?source=post_page---------------------------
  //api参考网站 
  const deleteComment = (key) => {
    
    console.log(key);
    const commentsToRemove = ['comments[0]', `comments[_key=='${key}']`]
    client
      .patch(`${pinDetail._id}`)
      .unset(commentsToRemove)
      .commit()
      .then(() => {
        console.log('已经删除，后台处理后更新');
        window.location.reload();
      })
      .catch((err) => {
        console.error('Delete failed: ', err.message)
      });
  };


  useEffect(() => {

    fetchPinDetails();
    console.log(pinDetail);
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      if (user) {
        setAddingComment(true);
        client
          .patch(pinId)
          .setIfMissing({ comments: [] })
          .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
          .commit()
          .then(() => {
            fetchPinDetails();
            setComment('');
            setAddingComment(false);
          });
        alert('评论成功，核验后显示')
      }
      else {
        alert('请先登录')
      }
    } else {
      alert('请输入内容')
    }
  };

  if (!pinDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }

  return (
    <>
      {pinDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>

          {/* 主图 */}
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">

            {/* download picture +git  and view */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-lightGrayColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
                <a
                  target="_blank"
                  href={pinDetail.projectLink}
                  onClick={(e) => {
                    e.stopPropagation();

                  }}
                  className="bg-lightGrayColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                  el="noreferrer"
                >
                  <AiFillEye />
                </a>

                {pinDetail.codeLink?.slice(8).length > 0 ? (
                  <a

                    href={pinDetail.codeLink}
                    onClick={(e) => {
                      e.stopPropagation();

                    }}
                    target="_blank"
                    className="bg-lightGrayColor flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100"
                    rel="noreferrer"
                  >
                    {' '}
                    <AiFillGithub />
                    {pinDetail.codeLink?.slice(8, 17)}...
                  </a>
                ) : undefined}

              </div>

            </div>

            {/* 标题和介绍 */}
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.description}</p>
            </div>


            {/* blog body */}
            <div className="block__content">
              <BlockContent
                blocks={pinDetail.body}
              />
            </div>


            {/* 上传者 */}
            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>

            {/* 评论 */}
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>

                  {
                    item.postedBy?._id === user?._id && (
                      <button
                        type="button"
                        onClick={(e) => {
                          console.log(item._key);
                          e.stopPropagation();
                          deleteComment(item._key);

                        }}
                        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                      >
                        <AiTwotoneDelete />
                      </button>
                    )
                  }

                </div>
              ))}
            </div>



            {/* comment */}
            <div className="flex flex-wrap mt-6 gap-3">
              {user && <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>}
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-secondaryColor text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>

              {/* Read more articles */}
              <button>
                <Link
                  to="/work"
                  className="py-2 px-6 rounded shadow text-white bg-black hover:bg-transparent border-2 border-black transition-all duration-500 hover:text-black font-bold"
                >
                  Read more articles
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;

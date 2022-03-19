import React, { useEffect, useState } from 'react';
import { AiTwotoneDelete, AiFillEye,  AiOutlineCalendar, AiOutlineProfile } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { format } from 'date-fns';

import { client, urlFor } from '../../../client';
import { MasonryLayout, BlogBody } from './';
import { pinDetailMorePostQuery, pinDetailQuery } from '../../../shared/utils/data';
import Spinner from '../../../shared/components/Spinner';

//add rich date from html-react-parser
import parse from 'html-react-parser';

const PostDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPosts] = useState();
  const [pinDetail, setPostDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPostDetails = () => {
    const query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPostDetail(data[0]);
        if (data[0]) {
          const query1 = pinDetailMorePostQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPosts(res);
          });
        }
      });
    }
  };

  //https://www.npmjs.com/package/@sanity/client?source=post_page---------------------------
  //api参考网站 
  const deleteComment = (key) => {
    const commentsToRemove = ['comments[0]', `comments[_key=='${key}']`]
    client
      .patch(`${pinDetail._id}`)
      .unset(commentsToRemove)
      .commit()
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error('Delete failed: ', err.message)
      });
  };


  useEffect(() => {
    fetchPostDetails();
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
            fetchPostDetails();
            setComment('');
            setAddingComment(false);
          });
      }
      else {
        alert('Please login first')
      }
    } else {
      alert('Please enter the content')
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
        <div className="xl:mt-5 flex lg:text-lg flex-col m-auto bg-white p-5 xl:p-10" style={{ maxWidth: '1380px', borderRadius: '32px' }}>
          <div>
            {/* 主图 */}
            <div className="flex justify-center items-center md:items-start flex-initial" >
              <img
                className="object-cover rounded-t-3xl rounded-b-lg h-96 w-full"
                src={(pinDetail?.image && urlFor(pinDetail?.image).width(1280).url())}
                // style={{ maxHeight: '680px' , objectFit: 'cover'}}
                alt="user-post"
              />
            </div>
            <div className="w-full pt-5 flex-1 xl:min-w-620">

              {/* download picture +git  and view */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">

                  {/*                   <a href={`${pinDetail.image.asset.url}?dl=`}
                    download
                    className="bg-lightGrayColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                  > <MdDownloadForOffline />
                  </a> */}
                  {pinDetail.projectLink?.slice(8).length > 0 ? (
                    <a target="_blank"
                      rel="noreferrer"
                      href={pinDetail.projectLink}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="bg-lightGrayColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                      el="noreferrer"
                    > <AiFillEye />
                    </a>
                  ) : undefined}

                  {pinDetail.codeLink?.slice(8).length > 0 ? (
                    <a href={pinDetail.codeLink}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      target="_blank"
                      className="bg-lightGrayColor flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100"
                      rel="noreferrer"
                    > {' '} <BsFillArrowUpRightCircleFill />
                      {pinDetail.codeLink?.slice(8, 17)}...
                    </a>
                  ) : undefined}

                </div>
              </div>

              {/* 标题和介绍 */}
              <div>
                <h1 className="mt-4 mb-4 text-3xl md:text-4xl font-bold break-words mt-3">
                  {pinDetail.title}
                </h1>
                <p className="flex items-center  mt-1"><AiOutlineCalendar className="mr-2" /> {format(new Date(pinDetail.publishedAt), 'p, MMMM dd, yyyy')}</p>
                <p className="flex items-center  mt-1"><AiOutlineProfile className="mr-2" /> {pinDetail.description}</p>
              </div>

              {/* blog body */}
              {pinDetail?.body && <div className="block__content leading-relaxed">
                <BlogBody pinDetail={pinDetail} />
              </div>
              }

              {pinDetail?.richtext &&
                <div className="block__content leading-relaxed">
                  {parse(pinDetail?.richtext)}
                </div>
              }

              {/* 上传者 */}
              <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy.image}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png"
                      }}
                      alt="" className="w-10 h-10 rounded-full cursor-pointer" />
                <p className="font-bold">{pinDetail?.postedBy.userName}</p>
              </Link>

              {/* 评论 */}
              <h2 className="mt-5 text-2xl">Comments</h2>
              <div className="max-h-370 overflow-y-auto">
                {pinDetail?.comments?.map((item) => (
                  <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                    <img src={item.postedBy?.image}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png"
                      }}
                      alt="" className="w-10 h-10 rounded-full cursor-pointer" />
                    <div className="flex flex-col">
                      <p className="font-bold">{item.postedBy?.userName}</p>
                      <p>{item.comment}</p>
                    </div>

                    {/*postedBy */}
                    {item.postedBy?._id === user?._id && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteComment(item._key);
                        }}
                        className="p-2 ml-8 text-2xl text-dark opacity-60 cursor-pointer transition-all duration-500 hover:opacity-100"
                      >
                        <AiTwotoneDelete />
                      </button>)}

                  </div>))}
              </div>

              {/* comment */}
              <div className="flex flex-wrap mt-6 gap-3">
                {user && <Link to={`/user-profile/${user._id}`}>
                  <img src={user?.image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png"
                    }}
                    alt="" className="w-10 h-10 rounded-full cursor-pointer" />
                </Link>}
                <input
                  className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-lg py-2 px-6 shadow text-white bg-secondaryColor hover:bg-transparent transition-all duration-500 hover:text-secColor font-bold"
                    onClick={addComment}
                  >
                    {addingComment ? 'Doing...' : 'Done'}
                  </button>

                  {/* Read more articles */}
                  <button
                    className="rounded-lg py-2 px-6 shadow text-white bg-secondaryColor hover:bg-transparent transition-all duration-500 hover:text-secColor font-bold"
                  >
                    <Link to="/work">
                      Read more articles
                    </Link>
                  </button>
                </div>

              </div>
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
        <div
          className="block m-auto" style={{ maxWidth: '1380px' }}
        >
          <MasonryLayout pins={pins}
          />
        </div>

      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PostDetail;

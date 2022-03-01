import React, { useRef, useState } from 'react';
import {
  LoginSocialGoogle,
  LoginSocialGithub
} from 'reactjs-social-login'
import {
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons'
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {

  //login (https://www.npmjs.com/package/reactjs-social-login)

  const googleRef = useRef(null)
  const githubRef = useRef(null)

  const navigate = useNavigate();
  const response = ({ provider, data }) => {
    console.log(data)
    //正在响应数据
    const avatar =
      data?.avatar ||
      data?.avatar_url ||
      data?.picture?.data?.url ||
      data?.profile_image_url_https ||
      'https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png'
    const name = data?.login || data?.name;
    const node_id = data?.node_id || data?.id;
    const email = data?.email || null;
    const profileObj = {
      node_id: node_id,
      platform: provider,
      name: name,
      imageUrl: avatar,
    }
    console.log(profileObj)
    localStorage.setItem('user', JSON.stringify(profileObj));
    const doc = {
      _id: node_id,
      _type: 'user',
      email: email,
      platform: provider,
      userName: name,
      image: avatar,
    };
    //正在验证信息
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">



<div class="bg-indigo-600">
  <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between flex-wrap">
      <div class="w-0 flex-1 flex items-center">
        <span class="flex p-2 rounded-lg bg-indigo-800">
          {/* <!-- Heroicon name: outline/speakerphone --> */}
          <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </span>
        <p class="ml-3 font-medium text-white truncate">
          <span class="md:hidden"> We announced a new product! </span>
          <span class="hidden md:inline"> Big news! We're excited to announce a brand new product. </span>
        </p>
      </div>
      <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
        <a href="#" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"> Learn more </a>
      </div>
      <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
        <button type="button" class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
          <span class="sr-only">Dismiss</span>
          {/* <!-- Heroicon name: outline/x --> */}
          <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>









      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">

            <LoginSocialGithub
              ref={githubRef}
              client_id={process.env.REACT_APP_CLIENT_ID}
              client_secret={process.env.REACT_APP_CLIENT_SECRET}
              redirect_uri={process.env.REACT_APP_REDIRECT_URI}
              onResolve={response}
              onReject={(err) => {
                console.log(err)
                alert('获取信息失败，请重试')
              }}
            >
              <GithubLoginButton />
            </LoginSocialGithub>

            <LoginSocialGoogle
              ref={googleRef}
              client_id={process.env.REACT_APP_GOOGLE_API_TOKEN || ''}
              onResolve={response}
              onReject={(err) => {
                console.log(err)
                alert('获取信息失败，请重试')
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>

          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
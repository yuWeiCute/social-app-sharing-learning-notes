import React, { useState } from 'react';
import { LoginSocialGoogle, LoginSocialGithub } from 'reactjs-social-login'
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons'
import { useNavigate } from 'react-router-dom';
import shareVideo from '../../shared/assets/share.mp4';
import logo from '../../shared/assets/logowhite.webp';
import { client } from '../../client';

const Login = () => {

  document.title = 'YUWEI - Login for subscribe and communication'

  // alert是否显示
  const [answer, setAnswer] = useState(false);
  const [verification, setVerification] = useState(false);

  const navigate = useNavigate();

  //login (https://www.npmjs.com/package/reactjs-social-login)
  const response = ({ provider, data }) => {
    //正在响应数据
    setAnswer(true)
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
    localStorage.setItem('user', JSON.stringify(profileObj));
    const doc = {
      _id: node_id,
      _type: 'user',
      email: email,
      platform: provider,
      userName: name,
      image: avatar,
    };
    setAnswer(false)
    //正在验证信息
    setVerification(true)
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      {/* 提示框 */}
      {answer && <div className=" z-50 fixed m-3 p-4 mb-4 inline-flex items-center text-base text-blue-700 bg-white rounded dark:bg-blue-200 dark:text-blue-800" role="alert">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
        </svg>
        Responding to data...
      </div>}

      {verification && <div className=" z-50 fixed m-3 p-4 mb-4 inline-flex items-center text-base text-blue-700 bg-white rounded dark:bg-blue-200 dark:text-blue-800" role="alert">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-circle-right" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path>
        </svg>
        Validating information...
      </div>}

      <div className=" relative w-full h-full">
        {/* 背景 */}
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        {/* 登录 */}
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">

          <div className="p-5 z-50">
            <img src={logo} width="130px" alt="" />
          </div>
          


          <div className="shadow-2xl">

            <LoginSocialGithub
              client_id={process.env.REACT_APP_CLIENT_ID}
              client_secret={process.env.REACT_APP_CLIENT_SECRET}
              redirect_uri={process.env.REACT_APP_REDIRECT_URI}
              onResolve={response}
              onReject={(err) => {
                console.log(err)
                alert('Failed to get information, please try again')
              }}
            >
              <GithubLoginButton />
            </LoginSocialGithub>

            <LoginSocialGoogle
              client_id={process.env.REACT_APP_GOOGLE_API_TOKEN || ''}
              onResolve={response}
              onReject={(err) => {
                console.log(err)
                alert('Failed to get information, please try again')
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
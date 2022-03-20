import React, { useState } from 'react';
import { LoginSocialGoogle, LoginSocialGithub } from 'reactjs-social-login'
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons'
import { useNavigate } from 'react-router-dom';
import shareVideo from '../../shared/assets/share.mp4';
import logo from '../../shared/assets/logowhite.webp';
import { client } from '../../client';
import { motion } from 'framer-motion';
import Spinner from '../../shared/components/Spinner';

const Login = () => {

  document.title = 'YUWEI - Login for subscribe and communication'

  const [verification, setVerification] = useState(false);

  const navigate = useNavigate();

  //login (https://www.npmjs.com/package/reactjs-social-login)
  const response = ({ provider, data }) => {
    //正在响应数据
    setVerification(true)
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
    //正在验证信息
    setVerification(true)
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    }).catch(setVerification(false));
  };

  return (
    <motion.div
      whileInView={{ opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
    >
      <div className="flex justify-start items-center flex-col h-screen">
        {/* 提示框 */}

        {verification&& 
        <div className="fixed z-50  top-2 rounded-2xl"><Spinner  message=" " /></div> }

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
    </motion.div>
  )
}

export default Login
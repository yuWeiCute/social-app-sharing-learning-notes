import React, { useCallback, useRef, useState, useEffect, createContext, useReducer } from 'react';
import GoogleLogin from 'react-google-login';
// import GithubIcon from "mdi-react/GithubIcon";
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


const REDIRECT_URI = 'http://localhost:3000/login'


const Login = () => {

  //login (https://www.npmjs.com/package/reactjs-social-login)
  const [provider, setProvider] = useState('')

  const googleRef = useRef(null)
  const githubRef = useRef(null)


  const onLogout = useCallback(() => {
    switch (provider) {
      case 'amazon':
        amazonRef.current?.onLogout()
        break
      case 'facebook':
        facebookRef.current?.onLogout()
        break
      case 'google':
        googleRef.current?.onLogout()
        break
      case 'instagram':
        instagramRef.current?.onLogout()
        break
      case 'microsoft':
        microsoftRef.current?.onLogout()
        break
      case 'github':
        githubRef.current?.onLogout()
        break
      case 'pinterest':
        pinterestRef.current?.onLogout()
        break
      case 'twitter':
        twitterRef.current?.onLogout()
        break
      case 'linkedin':
        linkedinRef.current?.onLogout()
        break
      default:
        break
    }
  }, [provider])

  const navigate = useNavigate();
  const response = ({ provider, data }) => {
    console.log(data)
    setProvider(provider)
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
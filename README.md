# React Social App for Shareme
1. This work decomposing the system into `front end` and [`back end`](https://github.com/yuWeiCute/backend-for-my-website)  
   这是一个前[后端](https://github.com/yuWeiCute/backend-for-my-website)分离的项目

2. Including **home page**, **blog (browsing, searching, publishing, classified display)**, **user (login, collection, comment and management)** and other functional modules   
   包括**主页**、**博客**、**用户管理**等功能模块

3. Front-end: use `Reactjs Hooks`, file, and folder structure, `SCSS`, `Framer Motion`, `Taiwind` to make Animations.    
   前端：使用React、Hooks，并使用SCSS、Framer Motion、Taiwind编写样式。

4. Back-end: this work use Sanity as Backend Sanity to dynamically manage the content of the entire application.   
   后端：使用Sanity动态管理整个应用程序的内容。

   [![Back-end Code: with sanity](https://img.shields.io/badge/Backend_Code-Sanity-ff69b4.svg)](https://github.com/yuWeiCute/backend-for-my-website)

# Demo
[**demo1: https://yuwei.netlify.app/**](https://yuwei.netlify.app/)
[**demo2: https://yuwei.netlify.app/**](https://yuweicute.github.io/social-app-sharing-learning-notes/)

## Screenshot 项目截图
### View for web
[<img src="/.github/gifs/web.webp">](https://yuwei.netlify.app/ "Go to demo website")

### View for phone
[<img src="/.github/gifs/phone.webp">](https://yuwei.netlify.app/ "Go to demo website")

### Installing

## Technology Stack 技术栈
 > React

 > React-router-dom

 > Taiwind

 > SASS

 > Framer-motion

 > Sanity

 > Draft.js

 > ...

## Project Structure 项目结构
```bash
├──public
│  ├──favicon.ico
│  ├──index.html                         // 项目首页
│  ├──logo192.png                        // 图标
│  ├──logo512.png                        // 图标
│  └──manifest.json                      // 文档说明
│
└──src                                   // 项目源文件
   │
   ├──backstage                          // 管理系统（更新中）
   │
   ├──container                          // fronted界面
   │  │  
   │  ├──components
   │  │  │
   │  │  ├──Home                         // 网站介绍及个人信息
   │  │  │  ├──Myhome.jsx
   │  │  │  └──Myhome.scss
   │  │  │ 
   │  │  ├──Navigation                   // 导航
   │  │  │  ├──index.js                  // 索引
   │  │  │  ├──Navbar.jsx
   │  │  │  ├──Searchbar.jsx
   │  │  │  └──Sidebar.jsx
   │  │  │ 
   │  │  ├──Posts                        // 博客
   │  │  │  ├──components
   │  │  │  │  ├──BlogBody.jsx           // 富文本显示
   │  │  │  │  ├──DraftEditor.jsx        // 富文本编辑器
   │  │  │  │  ├──Feed.jsx               // 博文分类筛选
   │  │  │  │  ├──Search.jsx             // 博文搜索
   │  │  │  │  ├──MasonryLayout.jsx      // 瀑布流显示
   │  │  │  │  └──Post.jsx               // 目录单元
   │  │  │  │
   │  │  │  ├──CreatePost.jsx            // 发布页面
   │  │  │  ├──index.js                  // 索引
   │  │  │  ├──PostDetail.jsx            // 博文细节页面
   │  │  │  └──Posts.jsx                 // 博文目录页面
   │  │  │
   │  │  ├──UserProfile                  //用户收藏及发布
   │  │  │  ├──index.js
   │  │  │  └──UserProfile.jsx
   │  │  │ 
   │  │  └──Login.jsx                    //用户登录
   │  │  
   │  └──Home.jsx                        //主页入口
   │
   ├──shared                             //共享文件
   │  ├──assets                          //图片及视频
   │  │  ├──logo.webp
   │  │  ├──logowhite.webp
   │  │  └──share.webm
   │  │
   │  ├──components                      //共享组件
   │  │  └──Spinner.jsx                  //loading加载组件
   │  │
   │  └──utils                           //共享工具
   │     ├──cursor.js                    //鼠标
   │     ├──data.js                      //获取后端数据
   │     └──getSanityImageData.js        //获取图片地址
   │  
   ├──App.js       
   ├──client.js                          //后端接口
   ├──index.css                          //全局css
   └──index.js         

├──.env                                  // 环境变量配置
├──.gitignore                            // git忽略配置
├──package-lock.json
├──package.json                          // 依赖配置
├──tailwind.config.js                    // tailwind配置
└──yarn.lock
```

## 浏览器支持

* IE 9+
* Firefox（最新）
* Chrome（最新）
* Safari（最新）

## Build Setup
1. Clone the repository

   ```
   git clone https://github.com/yuWeiCute/social-app-sharing-learning-notes
   ```
2. Install dependencies, this can take a minute

   ```
   cd social-app-sharing-learning-notes
   npm install
   ```
3. Start the local server

   ```
   npm start
   ```

Your browser should now open and show the app. Otherwise open http://localhost:3000/ in your browser. Editing files will automatically refresh the page.

##### If you link this project, Please note its orginal linkage, Thanks!



// import { urlFor, client } from './client';
const sanityClient = require("@sanity/client");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { query } = require("express");
const { json } = require("body-parser");

const client = sanityClient({
  projectId: 'y4ftypvu',
  dataset: 'production',
  apiVersion: '2022-02-02',
  useCdn: false,  //if you want to ensure fresh data
  token: 'skkC5azf11PoNhkNHoxooPHNHKFc4jDCKML8DUVCPJaxbK6jmviBHv5d91sDMM6rC0eBjZ8xwaTUMq6JQitwrvNdME4Oj428wRMmoigY3WDMmaOun5vqgVnf3zaqDihZ8br7O3W4fm9wkEYfLsBBh76zhLVklETaWU3TpvBoW2rl1WphNV49',
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 设置路由
app.get("/query", (req, res) => {
  const skillsQuery = '*[_type == "skills"]';
  // let note = undefined;
  // query = (req.body);
  // client.fetch(query).then((data) => {
  //     let json = {} 
  // });
  client.fetch(skillsQuery).then((data) => {
    res.json(data);
  });
  
})

app.post("/update", (req, res) => {

  // client.fetch(query).then((data) => {
  //     setExperiences(data);
  // });
  res.json("Hello, World!");
})

// 设置请求
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})


const express = require('express')
const axios = require('axios');

const app = express()
const { OMDB_API_KEY } = process.env;

app.use(express.json())
// Http 통신에는 get, post 방식이 있다.
// get = axios.get
// post= axios.post
// post 방식은 통신할때 body 영역안에 데이터를 담아서 
// 넘긴다.
// 이 body를 express.json을 등록함으로서
// express.json 형식으로 body를 해석하게 된다.
// all()= get + post 
app.post('/',async(req,res)=>{ 
  const payload = req.body;
  const { title, type, year, page, id } = payload;

  console.log('OMDB_API_KEY: ', OMDB_API_KEY);
  console.log('params: ', payload);

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;


  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      res.status(400).json(data.Error)
      console.log('다시해보삼')
    }
    
    res.status(200).json(data)
  } catch (error) {
    res.status(error.response.status).json(error.message)
  }
})



module.exports = app
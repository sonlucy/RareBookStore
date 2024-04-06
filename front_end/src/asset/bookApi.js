import axios from 'axios';
// import React, { useEffect, useState } from 'react'


const KAKAO_KEY  = "259f9c328369ccb85f05a57f39d93f27"

const Kakao = axios.create({
  baseURL : "https://dapi.kakao.com",
  headers : {
    Authorization : 'KaKaoAk ' + KAKAO_KEY
  },
});

export const bookSearch = (params) => {
  return Kakao.get('/v3/serch/book', {params});
};

// const bookSearchHandler = async (query, reset) => {
//   const params = {
//     query: query,
//     sort: 'accuracy',
//     page: 1,
//     size: 10,
//   };
//   const {data} = await bookSearch(params);
//   if (reset) {
//     setBooks(data.documents)
//   } else {
//     setBooks(bboks.concat(data.documents))
//   }
//   console.log(data);
// }

export default bookSearch
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Link for check
// http://localhost:3000/api/getblog?slug=css

import * as fs from 'fs';

// This is methof for get data also with endpoints.

export default async function handler(req, res) {

  let data = await fs.promises.readdir('blogdata');
  let myfiles;
  let allBlogs=[];  
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfiles=await fs.promises.readFile(('blogdata/' + item),'utf-8');
    allBlogs.push(JSON.parse(myfiles));
  }
  res.status(200).json(allBlogs)
}

// Simple medthod to get only data in folder.

//   fs.readdir('blogdata', (err,data)=>{
//     res.status(200).json(data)
//   }) 
// }
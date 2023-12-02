import * as fs from 'fs';
import { stringify } from 'querystring';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      console.log(req.body)
      res.status(200).json(req.body)
      let data = await fs.promises.readdir('contactdata')
      fs.promises.writeFile(`contactdata/${data.length+1}}.json`, JSON.stringify(req.body) )
    } else {
      // Handle any other HTTP method
      res.status(200).json( "Fail")
    }
  }
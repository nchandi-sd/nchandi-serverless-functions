import type { VercelRequest, VercelResponse } from '@vercel/node';
import db, {deleteVolunteer} from "../utils/fire.js"


const allowCors = fn => async (req, res) => {
  /*     const allowedOrigins = ['http://localhost:4200', 'https://nchandi.org'];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
      } */
      res.setHeader('Access-Control-Allow-Origin', "*");
  
      res.setHeader('Access-Control-Allow-Credentials', true)
      // another common pattern
      // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      )
      if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
      }
      return await fn(req, res)
    }


export default function handler(req: VercelRequest, res: VercelResponse){
    console.log("req.query.id", req.query.id)
    var id: string | string[] = req.query.id
    if(typeof id === "string"){
      return deleteVolunteer(req.query.id, res)
    }
}

/* export default allowCors(handler) */

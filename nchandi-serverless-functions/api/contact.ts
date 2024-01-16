import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer"


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


const handler = (req: VercelRequest, res: VercelResponse) => {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    var emailData = req.body

    var body = () => {
        let i = 0
        let theBody = ""
        while(i < Object.keys(emailData).length){
          let keyList = Object.keys(emailData)
          let valueList = Object.values(emailData)
          theBody += emailData[keyList[i]] ? `<h3>${keyList[i]}</h3><p>${valueList[i]}</p> ` : "\n"
          i++
        }
        return theBody
      }

      console.log("body", body())

    let mailOptions = {
        from: process.env.EMAIL,
        to: "info@nchandi.org",
        subject: "contact request",
        html: body(),
        
    };

    try {
      transporter.sendMail(mailOptions, function(error, info){
          if (!error) {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info.response)
          }
      })
      } catch(error) {
        console.log("error", error)
        res.status(400).send(error)
        res.status(500).send(error)

    }
};

export default allowCors(handler)
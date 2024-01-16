import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer"
import admin from "firebase-admin"
import fs from "fs"
import db from "../utils/fire"



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
    let body = req.body
    delete body.panelCoordinator
    delete body.panelLeader
    db.firestore().collection("Pending").add(body).then(() => console.log(body.firstName + " " + body.lastName + " has been added")).catch(error => console.log(error.message))

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

    let mailOptions = {
        from: process.env.EMAIL,
        to: `${req.body.panelCoordinator}, ${req.body.panelLeader}, facilities@nchandi.org`,
        subject: "Request to Join Panel",
        html: `${req.body.firstName + " " + req.body.lastName} wishes to volunteer at the ${req.body.facilityName} on ${req.body.dayOfWeek} of week ${req.body.weekOfMonth} at ${req.body.eventTime}.` ,
    };

    try {
      transporter.sendMail(mailOptions, function(error, info){
          if (!error) {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info.response)
          }
      })
      } catch(error) {
        console.log("error", error.message)
        res.status(500).send(error.message)

    }

}

export default allowCors(handler)
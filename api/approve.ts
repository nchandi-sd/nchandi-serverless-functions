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


    const handler = async (req: VercelRequest, res: VercelResponse) => {
      var selectedPanel = await db.firestore().collection("Panels").doc(req.body.panelId).get().then(panel => {return {ref: panel.ref, id: panel.id, data: panel.data()}})
      var newMember = await db.firestore().collection("Members").add({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        commitment: -1
      }).then(document => document.get())
      const {numberNeeded} = selectedPanel.data
      const soonToBeFilledSlot = `panelMember${6 - numberNeeded}`
      console.log("numberNeeded", numberNeeded)
      if(numberNeeded !== 0){
        selectedPanel.ref.update({
          numberNeeded: numberNeeded - 1,
          [soonToBeFilledSlot]: newMember.ref
      })
      console.log("got past update", req.body.id)
      db.firestore().collection("Pending").doc(req.body.id).delete()
      }
  }

export default allowCors(handler)
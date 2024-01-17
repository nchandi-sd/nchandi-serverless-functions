import admin from "firebase-admin"
import fs from 'fs'
import process from "process"
/* import * as serviceAccount from "../nchandi.json" */

/* var serviceAccount = fs.readFileSync("./nchandi.json", {encoding: "utf8"}) */
var serviceAccount = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url
  }
  
/* serviceAccount = JSON.parse(serviceAccount) */

const db = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASEDATABASEURL,
})

export default db


export function deleteVolunteer(id, res){
    console.log("made it to deleteVolunteer function", id)
    return db.firestore().collection("Pending").doc(id).delete().then(() => res.status(200).send("successfully rejected the volunteer")).catch(err => res.status(500).send("Unsuccessfully rejected the volunteer"))
}

export async function removeMember(panelId, property, scope, memberId, res){
    if(scope === "panel"){
        console.log("panel scope")
        db.firestore().collection("Panels").doc(panelId).update({
            [property + "Id"]: "lB2Df2G2LUEcmbBu4BTB",
            [property]: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB")
        }).catch(error => res.status(200).send("successfully removed member from the panel"))
    } else {
        console.log("memberid", memberId)
        console.log("all")

        var boardChampionList = await db.firestore().collection("Panels").where("boardChampionId", "==", memberId).get().then(documents => documents.docs)
        boardChampionList.map(document => document.ref.update({
            boardChampion: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            boardChampionId: "lB2Df2G2LUEcmbBu4BTB"
        }))

        var panelCoordinatorList = await db.firestore().collection("Panels").where("panelCoordinatorId", "==", memberId).get().then(documents => documents.docs)
        panelCoordinatorList.map(document => document.ref.update({
            panelCoordinator: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            panelCoordinatorId: "lB2Df2G2LUEcmbBu4BTB"
        }))

        var panelLeaderList = await db.firestore().collection("Panels").where("panelLeaderId", "==", memberId).get().then(documents => documents.docs)
        panelLeaderList.map(document => document.ref.update({
            panelLeader: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            panelLeaderId: "lB2Df2G2LUEcmbBu4BTB"
        }))

        var panelMember1List = await db.firestore().collection("Panels").where("panelMember1Id", "==", memberId).get().then(documents => documents.docs)
        panelMember1List.map(document => document.ref.update({
            panelMember1: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            panelMember1Id: "lB2Df2G2LUEcmbBu4BTB"
        }))

        var panelMember2List = await db.firestore().collection("Panels").where("panelMember2Id", "==", memberId).get().then(documents => documents.docs)
        panelMember2List.map(document => document.ref.update({
            panelMember2: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            panelMember2Id: "lB2Df2G2LUEcmbBu4BTB"
        }))

        var panelMember3List = await db.firestore().collection("Panels").where("panelMember3Id", "==", memberId).get().then(documents => documents.docs)
        panelMember3List.map(document => document.ref.update({
            panelMember3: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            panelMember3Id: "lB2Df2G2LUEcmbBu4BTB"
        }))

        var panelMember4List = await db.firestore().collection("Panels").where("panelMember4Id", "==", memberId).get().then(documents => documents.docs)
        panelMember4List.map(document => document.ref.update({
            panelMember4: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            panelMember4Id: "lB2Df2G2LUEcmbBu4BTB"
        }))

        var panelMember5List = await db.firestore().collection("Panels").where("panelMember5Id", "==", memberId).get().then(documents => documents.docs)
        panelMember5List.map(document => document.ref.update({
            panelMember5: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
            panelMember5Id: "lB2Df2G2LUEcmbBu4BTB"
        }))
/*         await db.firestore().collection("Panels").where("boardChampionId", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("boardChampion", document.id)
                document.ref.update({
                    boardChampion: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    boardChampionId: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("boardChampion Error", error)) */
/*         await db.firestore().collection("Panels").where("panelCoordinatorId", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("panelCoordinator", document.id)
                document.ref.update({
                    panelCoordinator: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    panelCoordinatorId: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("panelCoordinator Error", error)) */
/*         db.firestore().collection("Panels").where("panelLeaderId", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("panelLeader", document.id)
                document.ref.update({
                    panelLeader: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    panelLeaderId: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("panelLeader Error", error)) */
/*         db.firestore().collection("Panels").where("panelMember1Id", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("panelMember1", document.id)
                document.ref.update({
                    panelMember1: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    panelMember1Id: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("panelMember1 Error", error)) */
/*         db.firestore().collection("Panels").where("panelMember2Id", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("panelMember2", document.id)
                document.ref.update({
                    panelMember2: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    panelMember2Id: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("panelMember2 Error", error)) */
/*         db.firestore().collection("Panels").where("panelMember3Id", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("panelMember3", document.id)
                document.ref.update({
                    panelMember3: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    panelMember3Id: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("panelMember3 Error", error)) */
/*         db.firestore().collection("Panels").where("panelMember4Id", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("panelMember4", document.id)
                document.ref.update({
                    panelMember4: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    panelMember4Id: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("panelMember4 Error", error)) */
/*         db.firestore().collection("Panels").where("panelMember5Id", "==", memberId).get().then(documents => documents.docs.forEach(document => {
            if(document.exists){
                console.log("panelMember5", document.id)
                document.ref.update({
                    panelMember5: db.firestore().collection("Members").doc("lB2Df2G2LUEcmbBu4BTB"),
                    panelMember5Id: "lB2Df2G2LUEcmbBu4BTB"
                })
            }
        })).catch(error => console.log("panelMember5 Error", error)) */
    }
}

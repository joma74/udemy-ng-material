process.env.DEBUG = "*"

const LOG = require("debug")("firebase-admin")
const FIRESTORELOG = require("debug")("firestore")

const HttpsProxyAgent = require("https-proxy-agent")
const admin = require("firebase-admin")
admin.database.enableLogging(true)
admin.firestore.setLogFunction((msg) => FIRESTORELOG(msg))

const util = require("util")
// LOGGING
process.env.GPRC_TRACE = "all"
process.env.GPRC_VERBOSITY = "DEBUG"
// OTHERS
// process.env.GOOGLE_APPLICATION_CREDENTIALS = "/media/accountkeys/ng-fitness-tracker-AccountKey.json"
// process.env.GCLOUD_PROJECT = "ng-fitness-tracker-49d1f"

/**
 * See https://github.com/firebase/snippets-node/blob/d769695bd1159103e7c877849ccaccab3db37039/firestore/main/index.js#L392-L392
 */
// @ts-ignore
const serviceAccount = require("/media/accountkeys/ng-fitness-tracker-AccountKey.json")

/**
 * See https://medium.com/faun/firebase-accessing-firestore-and-firebase-through-a-proxy-server-c6c6029cddb1
 */
// const agent = new HttpsProxyAgent("IXIDIXI")

let defaultApp = admin.initializeApp({
  // credential: firebase.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ng-fitness-tracker-49d1f.firebaseio.com",
  // httpAgent: agent,
})
//
const firestoreDb = admin.firestore()

/**
 *
 * @param {FirebaseFirestore.Firestore} db
 */
let execute = async (db) => {
  LOG(`After firestore`)

  const refs = db.collection("availableExercises")

  LOG(`After collection`)
  await refs
    .get()
    .then((documentSet) => {
      // Print the ID and contents of each document
      documentSet.forEach((doc) => {
        LOG(doc.id, " => ", doc.data())
      })
    })
    .catch((err) => {
      // Error fetching documents
      LOG("Error", err)
    })
}

execute(firestoreDb)

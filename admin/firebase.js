const MASTERLOG = require("debug")
// tslint:disable-next-line: no-console
MASTERLOG.log = console.info.bind(console) // set all output to go via console.info
MASTERLOG.enable("firebase-admin")
const LOG = MASTERLOG("firebase-admin")
const FIRESTORELOG = require("debug")("firestore")

const tunnel = require("tunnel2")
const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "IXIDIXI",
    port: 1234,
  },
})

const admin = require("firebase-admin")
admin.database.enableLogging(true)
admin.firestore.setLogFunction((msg) => FIRESTORELOG(msg))

const util = require("util")
// LOGGING
// process.env.GPRC_TRACE = "all"
// process.env.GPRC_VERBOSITY = "DEBUG"
// OTHERS
// process.env.GOOGLE_APPLICATION_CREDENTIALS = "/media/accountkeys/ng-fitness-tracker-AccountKey.json"
// process.env.GCLOUD_PROJECT = "ng-fitness-tracker-49d1f"

/**
 * See https://github.com/firebase/snippets-node/blob/d769695bd1159103e7c877849ccaccab3db37039/firestore/main/index.js#L392-L392
 */
// @ts-ignore
const serviceAccount = require("/media/accountkeys/ng-fitness-tracker-AccountKey.json")

let defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ng-fitness-tracker-49d1f.firebaseio.com",
  //   httpAgent: agent,
})

// LOG(defaultApp.name)

// // Retrieve services via the defaultApp variable...
// var defaultAuth = admin.auth()
// LOG(defaultAuth)
// var defaultDatabase = admin.database()
// LOG(defaultDatabase)
//
const firestoreDb = admin.firestore()

/**
 *
 * @param {FirebaseFirestore.Firestore} db
 */
let execute = async (db) => {
  const refs = db.collection("availableExercises")

  await refs
    .doc("5lWnIBIggSPbm86wq9Qb")
    .get()
    .then((doc) => {
      LOG(doc.id, " => ", doc.data())
    })
    .catch((err) => {
      // Error fetching documents
      LOG("Error", err)
    })

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

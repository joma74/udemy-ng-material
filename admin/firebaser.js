const LOG = require("./LoggerFactory")("firebaser")

const ADMIN = require("./FirebaseAdminFactory")({
  initializeApp: {
    databaseURL: "https://ng-fitness-tracker-49d1f.firebaseio.com",
    serviceAccountFile: "/media/accountkeys/ng-fitness-tracker-AccountKey.json",
  },
  logging: {
    enabled: true,
    logOrCategory: "firestore",
  },
})

const util = require("util")

// LOG(defaultApp.name)

// // Retrieve services via the defaultApp variable...
// var defaultAuth = ADMIN.auth()
// LOG(defaultAuth)
// var defaultDatabase = ADMIN.database()
// LOG(defaultDatabase)
//
const firestoreDb = ADMIN.firestore()

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

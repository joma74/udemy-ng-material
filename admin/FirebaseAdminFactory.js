"use strict"

const ADMIN = require("firebase-admin")
const CreateLogger = require("./LoggerFactory")
const tunnel = require("tunnel2")

/**
 * @typedef {Object} CreateParameter
 * @property {Logging=} logging
 * @property {InitializeApp=} initializeApp
 */

/**
 * @typedef {Object} Logging
 * @property {boolean} enabled
 * @property {((([]: object[]) => void) | string)=} logOrCategory
 */

/**
 * @typedef {Object} InitializeApp
 * @property {string} databaseURL
 * @property {Object=} proxy
 * @property {string} serviceAccountFile
 */

/**
 *
 * @param {CreateParameter} createParameter
 */
const Create = (createParameter) => {
  const logging = createParameter.logging
  if (logging && !logging.logOrCategory && logging.enabled) {
    throw new Error("logOrCategory is mandatory if enabled for database")
  } else if (logging && logging.enabled) {
    let FIRESTORELOG = null
    if (typeof logging.logOrCategory === "function") {
      FIRESTORELOG = logging.logOrCategory
    } else if (typeof logging.logOrCategory === "string") {
      FIRESTORELOG = CreateLogger(logging.logOrCategory, logging.enabled)
    } else {
      throw new Error("logOrCategory must be either a string or a function")
    }

    ADMIN.database.enableLogging(true)
    ADMIN.firestore.setLogFunction((msg) => FIRESTORELOG(msg))
  }

  const initializeApp = createParameter.initializeApp
  if (initializeApp) {
    const serviceAccountFile = require(initializeApp.serviceAccountFile)

    let agent = null
    if (initializeApp.proxy) {
      agent = tunnel.httpsOverHttp(initializeApp.proxy)
    }

    ADMIN.initializeApp({
      /**
       * See https://github.com/firebase/snippets-node/blob/d769695bd1159103e7c877849ccaccab3db37039/firestore/main/index.js#L392-L392
       */
      // @ts-ignore
      credential: ADMIN.credential.cert(serviceAccountFile, agent),
      databaseURL: initializeApp.databaseURL,
      // @ts-ignore
      httpAgent: agent,
    })
  }

  return ADMIN
}

/**
 * @param {string} serviceAccountFile,
 * @param {string} projectId
 */
const configureViaEnv = function(serviceAccountFile, projectId) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountFile
  process.env.GCLOUD_PROJECT = projectId
}

module.exports = Create

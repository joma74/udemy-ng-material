"use strict"

const MASTERLOG = require("debug")
// tslint:disable-next-line: no-console
MASTERLOG.log = console.info.bind(console) // set all output to go via console.info

/**
 * @param {string} category
 * @param {boolean} enabled
 */
const Create = (category, enabled = true) => {
  if (!category) {
    throw new Error("category is mandatory")
  }

  if (enabled) {
    const categories = MASTERLOG.disable()
    MASTERLOG.enable(categories + "," + category)
  }
  const LOG = MASTERLOG(category)
  /**
   * @param {object[]} message
   */
  let doLog = function(...message) {
    LOG.apply(null, message)
  }
  return doLog
}

const turnOnGPRCLogging = function() {
  process.env.GPRC_TRACE = "all"
  process.env.GPRC_VERBOSITY = "DEBUG"
}

module.exports = Create

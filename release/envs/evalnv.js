const semanticreleaseenvgit = require("./git")
const prettyformat = require("pretty-format")
const EOL = require("os").EOL

const LOG = require("debug")("semantic-release-envs-evalnv")

const CONFIG = { ...semanticreleaseenvgit, RELEASE_PROC_TYPE: "evalnv" }

LOG(EOL + prettyformat(CONFIG))

module.exports = CONFIG

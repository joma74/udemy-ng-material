const EOL = require("os").EOL
const prettyformat = require("pretty-format")
const execa = require("execa")
const LOG = require("debug")("semantic-release-env")

/**
 *
 * @param {string} configName
 */
const readGitConfig = (configName) => {
  try {
    return execa
      .sync("git", ["config", configName], { timeout: 500 })
      .stdout.trim()
  } catch (error) {
    LOG(error)
    return null
  }
}

const CONFIGNAME_EMAIL = "user.email"
const CONFIGNAME_USERNAME = "user.name"

const CONFIG_USEREMAIL = readGitConfig(CONFIGNAME_EMAIL)
const CONFIG_USERNAME = readGitConfig(CONFIGNAME_USERNAME)

const GITCONFIG = {
  GIT_AUTHOR_EMAIL: CONFIG_USEREMAIL || undefined,
  GIT_AUTHOR_NAME: CONFIG_USERNAME || undefined,
  GIT_COMMITTER_EMAIL: CONFIG_USEREMAIL || undefined,
  GIT_COMMITTER_NAME: CONFIG_USERNAME || undefined,
}

LOG(EOL + prettyformat(GITCONFIG))

module.exports = GITCONFIG

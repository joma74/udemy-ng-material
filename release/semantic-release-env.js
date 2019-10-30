const execa = require("execa")

const CONFIGNAME_EMAIL = "user.email"
const CONFIGNAME_USERNAME = "user.name"

/**
 *
 * @param {string} configName
 */
const readGitConfig = (configName) => {
  return execa.sync("git", ["config", configName], { timeout: 500 }).stdout
}

const CONFIG_EMAIL = readGitConfig(CONFIGNAME_EMAIL)
const CONFIG_NAME = readGitConfig(CONFIGNAME_USERNAME)

module.exports = {
  GIT_AUTHOR_EMAIL: CONFIG_EMAIL,
  GIT_AUTHOR_NAME: CONFIG_NAME,
  GIT_COMMITTER_EMAIL: CONFIG_EMAIL,
  GIT_COMMITTER_NAME: CONFIG_NAME,
}

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

const CONFIG_EMAIL = readGitConfig("user.email")
const CONFIG_NAME = readGitConfig("user.name")

module.exports = {
  GIT_AUTHOR_EMAIL: readGitConfig(CONFIG_EMAIL),
  GIT_AUTHOR_NAME: readGitConfig(CONFIG_NAME),
  GIT_COMMITTER_EMAIL: readGitConfig(CONFIG_EMAIL),
  GIT_COMMITTER_NAME: readGitConfig(CONFIG_NAME),
}

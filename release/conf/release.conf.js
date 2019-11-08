const commonconfig = require("./release.common.conf")

const EVALNV_CONFIG = {
  ...commonconfig,
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/exec",
      {
        failCmd: "./release/cmds/semantic-release-show-env.sh failCmd",
        successCmd:
          "./release/cmds/cmds/semantic-release-show-env.sh successCmd",
        verifyConditionsCmd:
          "./release/cmds/semantic-release-evalnv.sh verifyConditionsCmd",
        verifyReleaseCmd:
          "./release/cmds/semantic-release-evalnv.sh verifyReleaseCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
      },
    ],
  ],
}

const RELEASE_CONFIG = {
  ...commonconfig,
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/exec",
      {
        failCmd: "./release/cmds/semantic-release-show-env.sh failCmd",
        successCmd: "./release/cmds/semantic-release-show-env.sh successCmd",
        verifyReleaseCmd:
          "./release/cmds/semantic-release-show-env.sh verifyReleaseCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
      },
    ],
  ],
}

let config = EVALNV_CONFIG

if (process.env.RELEASE_PROC_TYPE === "release") {
  config = RELEASE_CONFIG
}

module.exports = config

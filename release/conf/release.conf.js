const commonconfig = require("./release.common.conf")

const EVALNV_CONFIG = {
  ...commonconfig,
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/exec",
      {
        failCmd:
          "./release/cmds/semantic-release-show-env.sh failCmd ${JSON.stringify(nextRelease)}",
        successCmd:
          "./release/cmds/semantic-release-show-env.sh successCmd ${JSON.stringify(nextRelease)}",
        verifyReleaseCmd:
          "./release/cmds/semantic-release-evalrv.sh verifyReleaseCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
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
        failCmd:
          "./release/cmds/semantic-release-show-env.sh failCmd ${JSON.stringify(nextRelease)}",
        successCmd:
          "./release/cmds/semantic-release-show-env.sh successCmd ${JSON.stringify(nextRelease)}",
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

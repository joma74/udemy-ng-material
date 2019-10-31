const config = {
  branches: [
    "master",
    {
      channel: "alpha",
      name: "release-proc",
      prerelease: true,
    },
    {
      channel: "beta",
      name: "develop",
      prerelease: true,
    },
  ],
  npmPublish: false,
  preset: "angular",
  releaseRules: [
    {
      release: "patch",
      type: "bug",
    },
    {
      release: "patch",
      scope: "deps-dev",
      type: "chore",
    },
    {
      release: "patch",
      scope: "deps",
      type: "chore",
    },
  ],
}

module.exports = config

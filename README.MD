# Udemy NG Material

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=joma74/udemy-ng-material)](https://dependabot.com) [![Build Status](https://travis-ci.org/joma74/udemy-ng-material.svg?branch=release-proc)](https://travis-ci.org/joma74/udemy-ng-material)

## HMR

See

- https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/configure-hmr.md
- https://github.com/PatrickJS/angular-hmr

## Deploy

firebase deploy --only hosting

## Release

### Pre-required installs

```
yarn global add semantic-release@beta
yarn global add @semantic-release/git
yarn global add @semantic-release/changelog
```

### Pre-required setup

```
 export GH_TOKEN=yourghtoken
```

### What dry-run skips

```
...
[1:51:49 PM] [semantic-release] › ⚠  Skip step "prepare" of plugin "@semantic-release/changelog" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "prepare" of plugin "@semantic-release/npm" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "prepare" of plugin "@semantic-release/git" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "prepare" of plugin "@semantic-release/exec" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip v1.0.0-develop.1@beta tag creation in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "publish" of plugin "@semantic-release/npm" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "publish" of plugin "@semantic-release/github" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "publish" of plugin "@semantic-release/exec" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "success" of plugin "@semantic-release/github" in dry-run mode
[1:51:49 PM] [semantic-release] › ⚠  Skip step "success" of plugin "@semantic-release/exec" in dry-run mode
...
```

### Debug points

```js
 // semantic-release/lib/plugins/normalize.js
 ...
        const result = await func({
          ...cloneDeep(omit(input, ['stdout', 'stderr', 'logger'])),
          stdout,
          stderr,
          logger: logger.scope(logger.scopeName, pluginName),
        });
...
```

```js
// @semantic-release/exec/lib/exec.js
...
const result = execa(script, {shell: shell || true, cwd: execCwd ? path.resolve(cwd, execCwd) : cwd, env});
...
  return (await result).stdout.trim();

```

### Tapping code

```js
/home/xxx/.config/yarn/global/node_modules/@semantic-release/exec/lib/exec.js

const path = require("path");
const { template } = require("lodash");
const execa = require("execa");
const util = require("util");

module.exports = async (cmdProp, { shell, execCwd, ...config }, { cwd, env, stdout, stderr, logger, ...context }) => {
  logger.log("Got context %s", util.inspect(context, { maxArrayLength: 3 }));

  const cmd = config[cmdProp] ? cmdProp : "cmd";
  const script = template(config[cmd])({ config, ...context });

  logger.log("Call script %s", script);

  const result = execa(script, { shell: shell || true, cwd: execCwd ? path.resolve(cwd, execCwd) : cwd, env });

  result.stdout.pipe(
    stdout,
    { end: false }
  );
  result.stderr.pipe(
    stderr,
    { end: false }
  );

  return (await result).stdout.trim();
};

```

```json
[
  "@semantic-release/exec",
  {
    "verifyReleaseCmd": "./semantic-release-show-env.sh verifyReleaseCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
    "generateNotesCmd": "./semantic-release-show-env.sh generateNotesCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
    "prepareCmd": "./semantic-release-show-env.sh prepareCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
    "publishCmd": "./semantic-release-show-env.sh publishCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
    "successCmd": "./semantic-release-show-env.sh successCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}",
    "failCmd": "./semantic-release-show-env.sh failCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}"
  }
]
```

### Tapping verifyConditions and analyzeCommits

Both are not tapped.

- verifyConditions delivers a config object, which here is of no usage.
- analyzeCommits must return type of release t.i. patch minor major. This is not what one should provide yourself.

### Tapping verifyRelease

```
[1:51:49 PM] [semantic-release] › ✔  Completed step "analyzeCommits" of plugin "@semantic-release/exec"
[1:51:49 PM] [semantic-release] › ℹ  There is no previous release, the next release version is 1.0.0-develop.1
[1:51:49 PM] [semantic-release] › ℹ  Start step "verifyRelease" of plugin "@semantic-release/exec"
[1:51:49 PM] [semantic-release] [@semantic-release/exec] › ℹ  Got context {
  options:
   { branches: [ 'master', [Object] ],
     repositoryUrl:
      'https://[secure]@github.com/joma74/udemy-ng-material.git',
     tagFormat: 'v${version}',
     plugins:
      [ '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [Array],
        ... 4 more items ],
     npmPublish: [secure],
     preset: 'angular',
     releaseRules: [ [Object], [Object], [Object] ],
     _: [],
     d: true,
     'dry-run': true,
     dryRun: true,
     '$0': '../../../.npm-global/bin/semantic-release' },
  branches:
   [ { channel: undefined,
       tags: [],
       type: 'release',
       name: 'master',
       range: '>=1.0.0',
       accept: [Array] },
     { channel: 'beta',
       type: 'prerelease',
       name: 'develop',
       prerelease: 'develop',
       tags: [] } ],
  branch:
   { channel: 'beta',
     type: 'prerelease',
     name: 'develop',
     prerelease: 'develop',
     tags: [] },
  releases: [],
  lastRelease: {},
  commits:
   [ { commit: [Object],
       tree: [Object],
       author: [Object],
       committer: [Object],
       subject:
        'Merge remote-tracking branch \'refs/remotes/origin/develop\' into develop',
       body: '',
       hash: '11d98c91d79b7d78230cbad99f546dacdcdb6ae4',
       committerDate: 2019-10-29T09:32:35.000Z,
       message:
        'Merge remote-tracking branch \'refs/remotes/origin/develop\' into develop',
       gitTags: '(HEAD -> develop)' },
     { commit: [Object],
       tree: [Object],
       author: [Object],
       committer: [Object],
       subject:
        'Merge pull request #253 from joma74/dependabot/npm_and_yarn/develop/angular/cli-8.3.15',
       body: '',
       hash: 'ea49f146f13a2271d1564327793e32b8bf3bff12',
       committerDate: 2019-10-29T09:07:33.000Z,
       message:
        'Merge pull request #253 from joma74/dependabot/npm_and_yarn/develop/angular/cli-8.3.15',
       gitTags: '(origin/develop)' },
     { commit: [Object],
       tree: [Object],
       author: [Object],
       committer: [Object],
       subject: 'chore(deps-dev): bump @angular/cli from 8.3.14 to 8.3.15',
       body:
        'Bumps [@angular/cli](https://github.com/angular/angular-cli) from 8.3.14 to 8.3.15.\n- [Release notes](https://github.com/angular/angular-cli/releases)\n- [Commits](https://github.com/angular/angular-cli/compare/v8.3.14...v8.3.15)\n\nSigned-off-by: dependabot-preview[bot] <support@dependabot.com>',
       hash: '693a74450b03068e91d5fcf211ea335283e6bcd9',
       committerDate: 2019-10-29T09:00:57.000Z,
       message:
        'chore(deps-dev): bump @angular/cli from 8.3.14 to 8.3.15\n\nBumps [@angular/cli](https://github.com/angular/angular-cli) from 8.3.14 to 8.3.15.\n- [Release notes](https://github.com/angular/angular-cli/releases)\n- [Commits](https://github.com/angular/angular-cli/compare/v8.3.14...v8.3.15)\n\nSigned-off-by: dependabot-preview[bot] <support@dependabot.com>',
       gitTags: '' },
     ... 295 more items ],
  nextRelease:
   { type: 'minor',
     channel: 'beta',
     gitHead: '11d98c91d79b7d78230cbad99f546dacdcdb6ae4',
     version: '1.0.0-develop.1',
     gitTag: 'v1.0.0-develop.1@beta',
     name: 'v1.0.0-develop.1' } }
[1:51:49 PM] [semantic-release] [@semantic-release/exec] › ℹ  Call script ./semantic-release-show-env.sh verifyReleaseCmd 1.0.0-develop.1 {"type":"minor","channel":"beta","gitHead":"11d98c91d79b7d78230cbad99f546dacdcdb6ae4","version":"1.0.0-develop.1","gitTag":"v1.0.0-develop.1@beta","name":"v1.0.0-develop.1"}
args: verifyReleaseCmd 1.0.0-develop.1 {type:minor,channel:beta,gitHead:11d98c91d79b7d78230cbad99f546dacdcdb6ae4,version:1.0.0-develop.1,gitTag:v1.0.0-develop.1@beta,name:v1.0.0-develop.1}
```

### Tapping generateNotes

Same as `verifyRelease`, just the notes are appended.

```
[1:51:49 PM] [semantic-release] › ✔  Completed step "generateNotes" of plugin "@semantic-release/release-notes-generator"
[1:51:49 PM] [semantic-release] › ℹ  Start step "generateNotes" of plugin "@semantic-release/exec"
[1:51:49 PM] [semantic-release] [@semantic-release/exec] › ℹ  Got context {
  options:
   { branches: [ 'master', [Object] ],
     repositoryUrl:
      'https://[secure]@github.com/joma74/udemy-ng-material.git',
     tagFormat: 'v${version}',
     ...
  nextRelease:
   { type: 'minor',
     channel: 'beta',
     gitHead: '11d98c91d79b7d78230cbad99f546dacdcdb6ae4',
     version: '1.0.0-develop.1',
     gitTag: 'v1.0.0-develop.1@beta',
     name: 'v1.0.0-develop.1',
     notes:
      '# 1.0.0-develop.1 (2019-10-29)\n\n\n### Bug Fixes\n\n* bug: WIP angular/angular/issues/22829 ([c44b947](https://github.com/joma74/udemy-ng-material/commit/c44b947b6c0f187380e5317863a6f27a80caee56))\n* Build Status badge points to the wrong branch ([b85a9ab](https://github.com/joma74/udemy-ng-material/commit/b85a9ab656cae8f4ffdf3e7d30436307230760ed))\n*
      ...\n\n\n\n' } }
[1:51:49 PM] [semantic-release] [@semantic-release/exec] › ℹ  Call script ./semantic-release-show-env.sh generateNotesCmd 1.0.0-develop.1 {"type":"minor","channel":"beta","gitHead":"11d98c91d79b7d78230cbad99f546dacdcdb6ae4","version":"1.0.0-develop.1","gitTag":"v1.0.0-develop.1@beta","name":"v1.0.0-develop.1","notes":"# 1.0.0-develop.1 (2019-10-29)\n\n\n### Bug Fixes\n\n* bug: WIP angular/angular/issues/22829 ([c44b947](https://github.com/joma74/udemy-ng-material/commit/c44b947b6c0f187380e5317863a6f27a80caee56))\n* ...)\n\n\n\n}
```

#### Tapping prepare

TBD

#### Tapping publish

TBD

#### Tapping success

TBD

#### Tapping fail

TBD

### Tapping env

```
npm_package_release_plugins_4_message="chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
npm_package_release_plugins_6_1_generateNotesCmd=./semantic-release-show-env.sh generateNotesCmd {cwd} {env} ${nextRelease.version}
npm_package_release_plugins_4_path=@semantic-release/git
npm_package_release_plugins_6_0=@semantic-release/exec
npm_package_scripts_release=semantic-release --no-ci 2>&1 | tee semantic-release.log
npm_package_release_releaseRules_0_release=patch
npm_package_release_branches_1_prerelease=true
npm_package_release_plugins_6_1_failCmd=./semantic-release-show-env.sh failCmd ${cwd} ${env} ${nextRelease.version}
npm_package_release_releaseRules_2_scope=deps
npm_package_release_plugins_6_1_successCmd=./semantic-release-show-env.sh successCmd ${cwd} ${env} ${nextRelease.version}
npm_package_release_releaseRules_1_scope=deps-dev
npm_package_scripts_release_dry=semantic-release -d 2>&1 | tee semantic-release-dry.log
GIT_AUTHOR_NAME=semantic-release-bot
GIT_COMMITTER_NAME=semantic-release-bot
npm_package_release_plugins_6_1_verifyReleaseCmd=./semantic-release-show-env.sh verifyReleaseCmd ${nextRelease.version} ${JSON.stringify(nextRelease)}
npm_package_release_branches_1_channel=beta
npm_config_argv={"remain":[],"cooked":["run","release-dry"],"original":["release-dry"]}
GIT_COMMITTER_EMAIL=semantic-release-bot@martynus.net
npm_package_release_plugins_0=@semantic-release/commit-analyzer
npm_package_release_plugins_1=@semantic-release/release-notes-generator
npm_lifecycle_event=release-dry
npm_package_release_plugins_3=@semantic-release/npm
npm_package_release_plugins_2_1_changelogTitle=# Changelog
npm_package_release_plugins_5=@semantic-release/github
npm_package_release_branches_1_name=develop
npm_package_release_plugins_2_0=@semantic-release/changelog
npm_package_release_releaseRules_0_type=bug
npm_package_release_branches_0=master
npm_package_release_npmPublish=[secure]
npm_package_release_releaseRules_1_type=chore
npm_package_release_plugins_2_1_changelogFile=CHANGELOG.MD
npm_package_release_releaseRules_2_type=chore
npm_lifecycle_script=semantic-release -d 2>&1 | tee semantic-release-dry.log
npm_package_release_releaseRules_1_release=patch
npm_package_release_releaseRules_2_release=patch
npm_package_release_preset=angular
npm_package_release_plugins_4_assets_1=CHANGELOG.MD
npm_package_release_plugins_4_assets_0=package.json
npm_package_release_plugins_6_1_publishCmd=./semantic-release-show-env.sh publishCmd ${cwd} ${env} ${nextRelease.version}
GIT_AUTHOR_EMAIL=semantic-release-bot@martynus.net
npm_package_release_plugins_6_1_prepareCmd=./semantic-release-show-env.sh prepareCmd ${cwd} ${env} ${nextRelease.version}
```

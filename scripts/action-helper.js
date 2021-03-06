const core = require('@actions/core');
const { getVersion, isBeta } = require('./version-helper');

const version = getVersion();
const beta = isBeta();

const envs = {
  VERSION: version,
  RELEASE_NAME: [
    beta && 'BETA',
    `v${version}`,
  ].filter(Boolean).join(' '),
  RELEASE_PREFIX: [
    'LibertyBear',
    beta && 'beta',
  ].filter(Boolean).join('-'),
  PRERELEASE: !!beta,
  TEMP_DIR: 'tmp',
  ASSETS_DIR: 'dist-assets',
};

envs.ASSET_ZIP = `${envs.RELEASE_PREFIX}-webext-v${envs.VERSION}.zip`;
envs.ASSET_SELF_HOSTED_ZIP = `${envs.RELEASE_PREFIX}-webext-ffself-v${envs.VERSION}.zip`;

// TODO generate release notes by conventional commit messages and add installation instructions
envs.RELEASE_NOTE = beta ? `\
**This is a beta release of LibertyBear, use it at your own risk.**
` : `\
See <https://liberty-bear.github.io/> for more details.
`;

Object.entries(envs).forEach(([key, value]) => {
  core.exportVariable(key, value);
});

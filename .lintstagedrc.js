const micromatch = require('micromatch');

const extenstions = ['**/*.ts'];

const analyzeStagedFiles = allStagedFiles => {
  const changedCodeFiles = micromatch(allStagedFiles, extenstions);
  return [`eslint --fix ${changedCodeFiles.join(' ')}`, 'tsc --noEmit'];
};

module.exports = analyzeStagedFiles;

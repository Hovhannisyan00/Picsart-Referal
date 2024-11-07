const { danger, warn, fail } = require('danger');
const compareVersions = require('compare-versions');

const errorMessages = {
  reviewers: 'Please include people who should review.',
  shortTitle: 'Too short title for MR.',
  sourceBranchCheckbox: 'Please use the "Delete source branch" checkbox',
  jira: 'JIRA ticket ID is not detected in your MR Title. Please fix it by adding the ticket ID.',
  draftPR: 'MR is classed as Work in Progress',
  packageLock: 'Changes were made to package.json, but not to ' + 'package-lock.json.' + 'Perhaps you need to run `npm install` and commit changes ' + 'in package-lock.json',
  bigPR: ':exclamation: Big PR',
  incorrectPackageChange: 'The {{lib}} package version is incorrectly changed. It should not be incremented or decremented. Only hotfix can be installed',
  incorrectPackageHotfix: 'The hotfix version for the {{lib}} package is incorrect.',
  incorrectPackagePrefix: 'Hotfix branch should contain strict version of {{lib}} package',
};

// Reviewers
if (danger.gitlab.mr.reviewers === null) {
  warn(errorMessages.reviewers);
}

// Short title
if (danger.gitlab.mr.title.length < 15) {
  fail(errorMessages.shortTitle);
}

// Delete source branch checkbox
if (danger.gitlab.mr.should_remove_source_branch === false) {
  warn(errorMessages.sourceBranchCheckbox);
}

// JIRA ticket
if (!danger.gitlab.mr.title.match('(s|[|^)([A-Z]+-[0-9]+)(s|]|$)')) {
  fail(errorMessages.jira);
}

// JIRA RTM
// if (danger.gitlab.mr.labels.includes('Ready to Merge')) {
//   message('MR can be merged, JIRA transition state is **Ready to Merge**');
// } else {
//   fail('We did`t detected Ready to Merge status in JIRA');
// }

// Draft
if (danger.gitlab.mr.title.includes('Draft')) {
  fail(errorMessages.draftPR);
}

// Package.json change check
const packageChanged = danger.git.modified_files.includes('package.json');
const lockfileChanged = danger.git.modified_files.includes('package-lock.json');

if (packageChanged && !lockfileChanged) {
  warn(errorMessages.packageLock);
}

// Big PR
const prThreshold = 50;
if (danger.gitlab.mr.changes_count > prThreshold) {
  fail(errorMessages.bigPR);
}

// Check PA libraries packages
const branchesToCheck = ['live', 'release'];
const compareBranchesToSkip = ['master', 'release'];

if (packageChanged && branchesToCheck.includes(danger.gitlab.mr.target_branch) && !compareBranchesToSkip.includes(danger.gitlab.mr.source_branch)) {
  (async () => {
    const diff = await danger.git.JSONDiffForFile('package.json');

    const packages = Object.keys(diff.dependencies.before).filter(el => el.startsWith('@pa'));

    packages.forEach(lib => {
      const newVersion = diff.dependencies.after[lib];
      const beforeVersion = diff.dependencies.before[lib];

      if (newVersion === beforeVersion) {
        return;
      }

      const isHotfix = !/^\d+(\.\d+){0,2}$/.test(newVersion.replace('^', ''));
      const isOtherUpdate = !compareVersions.compare(beforeVersion, newVersion, '=');

      let errorMessage;

      if (!isHotfix && isOtherUpdate) {
        errorMessage = errorMessages.incorrectPackageChange;
      }

      if (isHotfix) {
        if (!compareVersions.validate(newVersion)) {
          errorMessage = errorMessages.incorrectPackageHotfix;
        }

        if (newVersion.startsWith('^')) {
          errorMessage = errorMessages.incorrectPackagePrefix;
        }
      }

      if (errorMessage) {
        fail(`:exclamation: PA package error: ${errorMessage.replace('{{lib}}', lib)}`);
      }
    });
  })();
}

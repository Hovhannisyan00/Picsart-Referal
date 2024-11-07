import { createRoot } from 'react-dom/client';
import errorLogger, { scopeType, bugsnagStagesEnum } from '@picsart/growth-rc/services/errorLogger';
import webVitals from '@picsart/rc/services/webVitals';
import { getContext } from '@picsart/miniapps-sdk';

import App from './App';

import { bugsnagApiKey } from './constants/common';

const miniappName = import.meta.env.VITE_APP_MINIAPP_NAME;
const appVersion = import.meta.env.VITE_APP_VERSION;
const currentBranchName = import.meta.env.VITE_APP_CURRENT_BRANCH_NAME;
const deploymentBranchName = import.meta.env.VITE_APP_DEPLOYMENT_BRANCH_NAME;
const releaseBranchName = import.meta.env.VITE_APP_RELEASE_CANDIDATE_BRANCH_NAME;
const onlyAppVersion = import.meta.env.VITE_APP_ONLY_APP_VERSION_FOR_BUGSNAG;

if (miniappName !== 'miniapp-id' && bugsnagApiKey && currentBranchName && (currentBranchName === deploymentBranchName || currentBranchName === releaseBranchName)) {
  // @ts-ignore
  bugsnagStagesEnum[bugsnagStagesEnum.miniapp_name_stage] = `${miniappName}${/^\d+.\d+.\d+-beta.\d+$/.test(appVersion) ? '-stage' : ''}`;
  errorLogger
    .init({
      apiKey: bugsnagApiKey,
      releaseStage: bugsnagStagesEnum.miniapp_name_stage,
      appVersion: onlyAppVersion ? appVersion : `${miniappName}-${appVersion}`,
      scope: scopeType.miniapps,
      project: miniappName,
    })
    .catch(error => errorLogger.trigger(error, 'error'));
}

webVitals(window.location.href, miniappName, getContext().handlers.sendAnalytics);

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
createRoot(document.getElementById('root')!).render(<App />);

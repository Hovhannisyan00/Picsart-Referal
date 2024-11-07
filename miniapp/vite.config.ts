import { defineConfig, loadEnv } from 'vite';
import { join, resolve } from 'path';
import { lstatSync, readdirSync } from 'fs';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import projectPackage from './package.json';
import miniappManifest from './extension-manifest.json';

const { version: packageVersion } = projectPackage;
const { id: miniappName } = miniappManifest;
const { PACKAGE_VERSION, DEPLOYMENT_BRANCH_NAME = 'main', RELEASE_CANDIDATE_BRANCH_NAME = 'release-candidate', CI_COMMIT_BRANCH } = process.env;
const appVersion = PACKAGE_VERSION || packageVersion;
process.env.VITE_APP_VERSION = appVersion;
process.env.VITE_APP_MINIAPP_NAME = miniappName;
process.env.VITE_APP_DEPLOYMENT_BRANCH_NAME = DEPLOYMENT_BRANCH_NAME;
process.env.VITE_APP_RELEASE_CANDIDATE_BRANCH_NAME = RELEASE_CANDIDATE_BRANCH_NAME;
process.env.VITE_APP_CURRENT_BRANCH_NAME = CI_COMMIT_BRANCH;

const sourcePath = './src';

const topLevelDirectories = readdirSync(sourcePath).filter(file => lstatSync(join(sourcePath, file)).isDirectory());

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
    ],
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: [
        ...topLevelDirectories.map(topLevelDirectory => ({
          find: topLevelDirectory,
          replacement: resolve(join(sourcePath, topLevelDirectory)),
        })),
      ],
    },
  };
});

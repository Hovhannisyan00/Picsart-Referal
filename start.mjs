#!/usr/bin/env zx

const CONTAINER_WORKSPACE = 'container';

echo(chalk.blue(`Starting Picsart miniapps development environment...`));

const tasks = [];
const manifests = [];
const miniappsToLaunch = [];

tasks.push($`npm run dev -w ${CONTAINER_WORKSPACE}`.quiet());

await scanManifestJsons(__dirname);

if (miniappsToLaunch.length === 0) {
  echo(chalk.red('No miniapps found in the workspace.'));
  process.exit(1);
} else {
  echo(chalk.blue(`Launching miniapps: ${miniappsToLaunch.join(', ')}`));
}

const extensionJsonPath = path.join(CONTAINER_WORKSPACE, 'public', 'extensions.json');
await fs.writeJSON(
  extensionJsonPath,
  manifests.map(manifest => mapToExtensionJson(manifest)),
);

if (!fs.existsSync(extensionJsonPath)) {
  echo(chalk.red('Failed to create extensions.json'));
  process.exit(1);
}

echo(chalk.blue(`Open http://localhost:3000/editor to start developing.`));
await Promise.all(tasks);

// Function will recursively scan adjusted directory for extension-manifest.json files
// and start development server for each found miniapp
// Script assuming folder name can be accessed as workspace in "package.json" script
async function scanManifestJsons(dir, fileName = 'extension-manifest.json', level = 0) {
  if (level > 1) {
    // Scan only 1 level deep
    return;
  }
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') {
        await scanManifestJsons(fullPath, fileName, level + 1);
      }
    } else if (entry.isFile() && entry.name === fileName) {
      const manifestJSON = await await fs.readJSON(path.join(dir, fileName));
      const port = manifestJSON.development.port;
      const { host } = new URL(manifestJSON.development.host);
      tasks.push($`npm run dev -w ${path.basename(dir)} -- --port ${port} --host ${host}`.quiet());
      miniappsToLaunch.push(manifestJSON.name);
      manifests.push(manifestJSON);
    }
  }
}

function mapToExtensionJson(manifest) {
  return {
    id: manifest.id,
    packageId: `${manifest.id}-dev`,
    name: manifest.name,
    iconUrl: manifest.iconUrl,
    state: 'Draft',
    description: manifest.description,
    tags: [],
    platformVersion: manifest.platformVersion,
    extensions: manifest.extensions.map(typeConfig => {
      return {
        ...typeConfig,
        params: typeConfig.params,
        deploymentUrl: `${manifest.development.host}:${manifest.development.port}`,
      };
    }),
  };
}

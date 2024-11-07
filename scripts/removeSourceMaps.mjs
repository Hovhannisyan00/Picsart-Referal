import path from 'path';
import fs from 'fs';

const { MINIAPP_DIR } = process.env;

const miniappDir = MINIAPP_DIR || 'miniapp'

const buildDirectory = path.join(process.cwd(), '..', miniappDir, 'build');
console.log(buildDirectory);

const jsAssetsDirectory = path.join(buildDirectory, 'assets');

const removeSourceMapsMarker = filePath => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const updatedFileContent = fileContent.replace(/\/\/# sourceMappingURL=.*/g, '');
  fs.writeFileSync(filePath, updatedFileContent);
};

fs.readdirSync(jsAssetsDirectory).forEach(jsAssetFileName => {
  if (jsAssetFileName.endsWith('.js')) {
    // Remove source maps marker from all .js files in the build directory
    removeSourceMapsMarker(path.join(jsAssetsDirectory, jsAssetFileName));
  }
  if (jsAssetFileName.endsWith('.js.map')) {
    // Remove source maps from all .js files in the build directory
    fs.unlinkSync(path.join(jsAssetsDirectory, jsAssetFileName));
  }
});

import fs from 'fs';
import path from 'path';

const { MINIAPP_DIR } = process.env;

const packageJsonPaths = ['dist', MINIAPP_DIR];

for (const pjPath of packageJsonPaths) {
  // Path to the package.json file in the dist folder
  const packageJsonPath = path.join(process.cwd(), pjPath, 'package.json');

  // Read the package.json file
  fs.readFile(packageJsonPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading package.json file:', err);
      return;
    }

    try {
      // Parse the JSON data
      const packageJson = JSON.parse(data);

      // Update the version
      packageJson.version = process.env.PUBLISH_PACKAGE_VERSION || packageJson.version; // Replace 'NEW_VERSION' with the desired version
      
      // Write the updated package.json back to file
      fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}
`, 'utf8', (err) => {
        if (err) {
            console.error('Error writing package.json file:', err);
            return;
        }
        console.log('Package.json version updated successfully.');
      });
    } catch (jsonErr) {
      console.error('Error parsing package.json file:', jsonErr);
    }
  });
}

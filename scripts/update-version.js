import fs from 'fs';
import path from 'path';

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const versionFilePath = path.join(__dirname, '..', 'src', 'utils', 'version.js');
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const [major, minor, patch] = packageJson.version.split('.').map(Number);

const versionFileContent = `export const VERSION = {
  major: ${major},
  minor: ${minor},
  patch: ${patch},
  toString() {
    return \`\${this.major}.\${this.minor}.\${this.patch}\`;
  }
};

export const BUILD_DATE = new Date('${new Date().toISOString()}');

export const getVersionString = () => {
  return \`v\${VERSION.toString()} (\${BUILD_DATE.toISOString().split('T')[0]})\`;
};
`;

fs.writeFileSync(versionFilePath, versionFileContent);

if (!fs.readFileSync(changelogPath, 'utf8').includes(`## [${packageJson.version}]`)) {
    console.log(`Version ${packageJson.version} not found in CHANGELOG.md. Please update it manually.`);
}

// scripts/publish.mjs
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const run = cmd => {
  console.log(`\n▶ Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

const pkgPath = path.resolve('projects/dms/package.json');
const distPath = path.resolve('dist/dms');

try {
  // Step 1: Build
  console.log('\n📦 Building library...');
  run('node scripts/build-all.mjs');

  // Step 2: Copy package.json to dist if ng-packagr didn't do it
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  if (!fs.existsSync(path.join(distPath, 'package.json'))) {
    fs.writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(pkg, null, 2));
    console.log('📦 Copied package.json to dist');
  }

  // Step 3: Publish to npm
  console.log('\n🚀 Publishing to npm...');
  run(`cd ${distPath} && npm publish --access public`);
  console.log('\n🎉 Publish complete!');
} catch (err) {
  console.error('\n❌ Publish failed:', err.message);
  process.exit(1);
}

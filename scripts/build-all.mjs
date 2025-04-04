// scripts/build-all.js
import { execSync } from 'child_process';

const run = cmd => {
  console.log(`\n▶ Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

try {
  run('npm run build:tailwind');
  run('node scripts/copy-vendor-css.js');
  run('node scripts/create-bundle-entry.mjs');
  run('npm run build:bundle');
  run('ng build dms');
  run('node scripts/cleanup.mjs');
} catch (err) {
  console.error('\n❌ Build failed:', err.message);
  process.exit(1);
}

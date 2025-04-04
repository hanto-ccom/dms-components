// scripts/cleanup.js
import { rimrafSync } from 'rimraf';

const cleanupPaths = [
  'projects/dms/src/styles/tailwind.generated.css',
  'projects/dms/src/styles/bundle.css',
  'projects/dms/bundle.css',
  'projects/dms/src/styles/vendor',
  'projects/dms/vendor',
];

cleanupPaths.forEach(p => {
  rimrafSync(p);
  console.log(`🧹 Removed ${p}`);
});

// scripts/create-bundle-entry.js
import fs from 'fs';
import path from 'path';

const bundlePath = path.join('projects/dms/src/styles/bundle.css');
const vendorPath = path.join('projects/dms/src/styles/vendor/vendor.css');

const bundleContent = `@import "./tailwind.generated.css";
@import "./vendor/vendor.css";
@import "./global.css";
@import "./digi-overrides/digi-overrides.css";
`;

const vendorContent = `@import "./vendor-digi.css";
@import "./vendor-fonts.css";
`;

fs.writeFileSync(vendorPath, vendorContent);
console.log('✅ Created vendor.css');

fs.writeFileSync(bundlePath, bundleContent);
console.log('✅ Created bundle.css');

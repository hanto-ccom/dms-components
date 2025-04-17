const fs = require('fs');
const path = require('path');

const root = process.cwd();

// Dev paths
const vendorDir = path.join(root, 'projects/dms/src/styles/vendor');
const vendorAssetsDir = path.join(vendorDir, 'assets/fonts');
const vendorDigiCss = path.join(vendorDir, 'vendor-digi.css');
const vendorFontsCss = path.join(vendorDir, 'vendor-fonts.css');
const vendorBundleCss = path.join(vendorDir, 'vendor.css');

// Packaging path
const packagingFontsDir = path.join(root, 'projects/dms/vendor/fonts');

// Source paths
const digiCssPath = path.join(
  root,
  'node_modules/@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/digi-arbetsformedlingen.css'
);
const fontsCssPath = path.join(
  root,
  'node_modules/@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/fonts/src/fonts.css'
);
const fontsSourceDir = path.join(
  root,
  'node_modules/@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/fonts/src/assets/fonts'
);

// ng-select paths
const ngSelectCssPath = path.join(
  root,
  'node_modules/@ng-select/ng-select/themes/default.theme.css'
);
// target for ng-select CSS in your dev vendor folder
const vendorNgSelectCss = path.join(vendorDir, 'vendor-ng-select.css');

// Ensure target directories exist
fs.mkdirSync(vendorAssetsDir, { recursive: true });
fs.mkdirSync(packagingFontsDir, { recursive: true });

// Copy vendor CSS
fs.copyFileSync(digiCssPath, vendorDigiCss);
console.log('✅ Copied vendor-digi.css');

fs.copyFileSync(fontsCssPath, vendorFontsCss);
console.log('✅ Copied vendor-fonts.css');

// Copy ng-select theme CSS
fs.copyFileSync(ngSelectCssPath, vendorNgSelectCss);
console.log('✅ Copied vendor-ng-select.css');

// Copy fonts (for dev and packaging)
const fontFiles = fs.readdirSync(fontsSourceDir);
for (const file of fontFiles) {
  const from = path.join(fontsSourceDir, file);
  const toDev = path.join(vendorAssetsDir, file);
  const toPackage = path.join(packagingFontsDir, file);

  fs.copyFileSync(from, toDev);
  fs.copyFileSync(from, toPackage);
  console.log(`✅ Copied font: ${file}`);
}

// ✅ Create vendor.css that @imports the others
const vendorCssContent = `@import './vendor-digi.css';
@import './vendor-fonts.css';
@import './vendor-ng-select.css';
`;
fs.writeFileSync(vendorBundleCss, vendorCssContent);
console.log('✅ Generated vendor.css');

console.log('\n🎉 All vendor assets prepared for development and packaging.');

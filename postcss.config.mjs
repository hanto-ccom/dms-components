import autoprefixer from 'autoprefixer';
import path from 'path';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';

import tailwind from '@tailwindcss/postcss';

const root = process.cwd();

export default {
  plugins: [
    postcssImport(),
    tailwind(),
    postcssUrl({
      url: asset => {
        // ✅ Rewrite the URL in bundle.css to a flat vendor/fonts path
        return `vendor/fonts/${path.basename(asset.url)}`;
      },
      // ✅ Point to where the fonts are physically located in your source
      basePath: path.join(root, 'projects/dms/src/styles/vendor'),
      // ✅ Point to where the fonts should be copied in your project before build
      assetsPath: path.join(root, 'projects/dms/vendor/fonts'),
      useHash: false,
      relative: false,
    }),
    autoprefixer(),
  ],
};

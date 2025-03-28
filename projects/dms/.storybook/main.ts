import { join } from 'path';

import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules to support PostCSS
          {
            test: /\.css$/,
            include: [join(__dirname, '../src/styles')],
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              {
                // Gets options from `postcss.config.js` in your project root
                loader: 'postcss-loader',
                options: { implementation: require.resolve('postcss') }
              }
            ],
          }
        ]
      }
    }
  ],

  webpackFinal: async (config) => {
    // Add a rule to process Angular component CSS files using raw-loader,
    // which will provide the CSS as a string for ShadowCSS to process.
    config!.module!.rules!.push({
      test: /\.css$/,
      // Exclude global styles directory so they’re handled by your PostCSS rule
      exclude: [join(__dirname, '../src/styles')],
      type: 'asset/source'
    });
    return config;
  },
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  }
};
export default config;
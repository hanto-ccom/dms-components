import 'zone.js';

import { Renderer } from 'storybook/internal/types';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/angular';

import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute<Renderer>({
      themes: {
        default: 'default',
        arbetsformedling: 'arbetsformedling',
        ehandel: 'ehandel'
      },
      defaultTheme: 'default',
      attributeName: 'data-theme',
    }),
  ]
};

export default preview;
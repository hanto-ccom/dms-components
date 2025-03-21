import {
    Meta,
    moduleMetadata,
    StoryFn,
} from '@storybook/angular';

import { DmsCardContentComponent } from './dms-card-content.component';
import { DmsCardFooterComponent } from './dms-card-footer.component';
import { DmsCardHeaderComponent } from './dms-card-header.component';
import { DmsCardComponent } from './dms-card.component';

export default {
    title: 'My Library/DMS Card',
    parameters: { layout: 'centered' },
    decorators: [
        moduleMetadata({
            // Import all standalone components.
            imports: [
                DmsCardComponent,
                DmsCardHeaderComponent,
                DmsCardContentComponent,
                DmsCardFooterComponent,
            ],
        }),
    ],
    argTypes: {
        headerTitle: { control: 'text' },
        cardContent: { control: 'text' },
        footerContent: { control: 'text' },
    },
} as Meta;

// Simple usage: header displays simple text via projection.
const DefaultTemplate: StoryFn<any> = (args: any) => ({
    props: args,
    template: `
    <lib-dms-card>
      <lib-dms-card-header>{{ headerTitle }}</lib-dms-card-header>
      <lib-dms-card-content>{{ cardContent }}</lib-dms-card-content>
      <lib-dms-card-footer>{{ footerContent }}</lib-dms-card-footer>
    </lib-dms-card>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
    headerTitle: 'Simple Header',
    cardContent: 'This is the basic card content.',
    footerContent: 'Simple Footer',
};

// Advanced usage: header displays complex, custom HTML content.
const ComplexTemplate: StoryFn<any> = (args: any) => ({
    props: args,
    template: `
    <lib-dms-card>
      <lib-dms-card-header>
        <div class="flex items-center">
        <digi-icon-apple></digi-icon-apple>
          <span class="font-bold text-xl text-gray-600">{{ headerTitle }}</span>
        </div>
      </lib-dms-card-header>
      <lib-dms-card-content>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-600">Advanced Section</h3>
          <p class="text-gray-700 mt-2">
            This card demonstrates advanced header content with custom HTML and TailwindCSS styling.
          </p>
        </div>
      </lib-dms-card-content>
      <lib-dms-card-footer>{{ footerContent }}</lib-dms-card-footer>
    </lib-dms-card>
  `,
});

export const Complex = ComplexTemplate.bind({});
Complex.args = {
    headerTitle: 'Advanced Header',
    cardContent: 'This is the advanced card content.',
    footerContent: 'Complex Footer',
};

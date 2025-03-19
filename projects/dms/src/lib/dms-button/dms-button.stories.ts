import {
  Meta,
  StoryFn,
} from '@storybook/angular';

import { DmsButtonComponent } from './dms-button.component';

export default {
    title: 'My Library/DMS Button',
    component: DmsButtonComponent,
    argTypes: {
        label: { control: 'text' },
    },
} as Meta;

const Template: StoryFn<DmsButtonComponent> = (args: DmsButtonComponent) => ({
    props: args,
});

export const Default = Template.bind({});
Default.args = {
    label: 'Click me',
};
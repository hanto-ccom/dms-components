import {
    Meta,
    StoryFn,
} from '@storybook/angular';

import { DmsCardComponent } from './dms-card.component';

export default {
    title: 'My Library/DMS Card',
    parameters: {
        layout: 'centered'
    },
    component: DmsCardComponent,
    argTypes: {
        title: { control: 'text' },
        content: { control: 'text' },
    },
} as Meta;

const Template: StoryFn<DmsCardComponent> = (args: DmsCardComponent) => ({
    props: args,
});

export const Default = Template.bind({});
Default.args = {
    title: 'Card Title',
    content: 'Card content goes here.',
};
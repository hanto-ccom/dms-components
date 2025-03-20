import {
    Meta,
    StoryFn,
} from '@storybook/angular';

import { DmsButtonComponent } from './dms-button.component';

// Create a type for story args that redefines clickEvent as a function.
type DmsButtonComponentArgs = Omit<DmsButtonComponent, 'clickEvent'> & {
    clickEvent: () => void;
};

export default {
    title: 'My Library/DMS Button',
    parameters: {
        layout: 'centered',
    },
    component: DmsButtonComponent,
    argTypes: {
        label: { control: 'text' },
        clickEvent: { action: 'clicked' },
    },
} as Meta;

const Template: StoryFn<DmsButtonComponentArgs> = (args: DmsButtonComponentArgs) => ({
    props: args,
});

export const Default = Template.bind({});
Default.args = {
    label: 'Click me!',
    clickEvent: () => { },
};
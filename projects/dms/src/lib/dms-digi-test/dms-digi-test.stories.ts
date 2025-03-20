import { ButtonVariation } from '@digi/arbetsformedlingen';
import {
    Meta,
    StoryFn,
} from '@storybook/angular';

import { DmsDigiTestComponent } from './dms-digi-test.component';

// Create a type for story args that redefines handleClick as a function.
type DmsDigiTestComponentArgs = Omit<DmsDigiTestComponent, 'clickEvent'> & {
    clickEvent: () => void;
};

export default {
    title: 'My Library/DMS Digi Test',
    parameters: {
        layout: 'centered',
    },
    component: DmsDigiTestComponent,
    argTypes: {
        clickEvent: { action: 'clicked' },
        buttonVariation: {
            control: {
                type: 'select',
                options: Object.values(ButtonVariation),
            },
        },
    },
} as Meta;

const Template: StoryFn<DmsDigiTestComponentArgs> = (args: DmsDigiTestComponentArgs) => ({
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    buttonVariation: ButtonVariation.PRIMARY,
    clickEvent: () => { },
};

export const Secondary = Template.bind({});
Secondary.args = {
    buttonVariation: ButtonVariation.SECONDARY,
    clickEvent: () => { },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    buttonVariation: ButtonVariation.TERTIARY,
    clickEvent: () => { },
};

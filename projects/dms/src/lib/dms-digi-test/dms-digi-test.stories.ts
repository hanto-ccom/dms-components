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


// Define the enum options manually as strings
const buttonVariationOptions: ButtonVariation[] = [
    'primary',
    'secondary',
    'function',
    'tertiary'
] as ButtonVariation[];

export default {
    title: 'My Library/DMS Digi Test',
    parameters: {
        layout: 'centered',
    },
    component: DmsDigiTestComponent,
    argTypes: {
        clickEvent: { action: 'clicked' },
        buttonVariation: {
            control: { type: 'select' },
            options: buttonVariationOptions,
        },
    },
} as Meta;

const Template: StoryFn<DmsDigiTestComponentArgs> = (args: DmsDigiTestComponentArgs) => ({
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    buttonVariation: 'primary' as ButtonVariation,
    clickEvent: () => { console.log('👋 Hallå Världen - Primary'); },
};

export const Secondary = Template.bind({});
Secondary.args = {
    buttonVariation: 'secondary' as ButtonVariation,
    clickEvent: () => { console.log('👋 Hallå Världen - Secondary'); },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    buttonVariation: 'tertiary' as ButtonVariation,
    clickEvent: () => { console.log('👋 Hallå Världen - Tertiary'); },
};

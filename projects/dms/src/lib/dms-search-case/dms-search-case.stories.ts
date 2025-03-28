import {
    Meta,
    StoryFn,
} from '@storybook/angular';

import { DmsSearchComponent } from './dms-search-case.component';

export default {
    title: 'My Library/DMS Search Case',
    parameters: {
        layout: 'centered',
    },
    component: DmsSearchComponent,
    argTypes: {
        label: { control: 'text' },
        clickEvent: { action: 'clicked' },
    },
} as Meta;

const Template: StoryFn<DmsSearchComponent> = (args: DmsSearchComponent) => ({
    props: args,
});

export const Default = Template.bind({});
Default.args = {


};
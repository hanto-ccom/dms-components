import { of } from 'rxjs';

import {
    Meta,
    StoryObj,
} from '@storybook/angular';

import type { DirectoryEntry } from '../dms-directory-suggestion/dms-directory.service';
import { DmsSelectivityComponent } from './dms-selectivity.component';

const mockItems: DirectoryEntry[] = [
    { id: 'apple', displayLabel: 'Apple' },
    { id: 'banana', displayLabel: 'Banana' },
    { id: 'cherry', displayLabel: 'Cherry' },
];

const meta: Meta<DmsSelectivityComponent> = {
    title: 'Components/DmsSelectivity',
    component: DmsSelectivityComponent,
    tags: ['autodocs'],
    decorators: [
        // no moduleMetadata needed since it's standalone
    ],
    argTypes: {
        searchFn: { table: { disable: true } },
        inputId: { table: { disable: true } },
        change: { action: 'changed' },
        open: { action: 'opened' },
        close: { action: 'closed' },
        error: { table: { disable: true } },
    },
};

export default meta;
type Story = StoryObj<DmsSelectivityComponent>;

/**
 * Default (single-select) with mocked searchFn.
 */
export const Default: Story = {
    render: (args) => ({
        props: {
            ...args,
            searchFn: (term: string) =>
                of(mockItems.filter((i) =>
                    i.displayLabel.toLowerCase().includes(term.toLowerCase())
                )),
        },
    }),
    args: {
        multiple: false,
        placeholder: 'Search fruit…',
        disabled: false,
        clearable: true,
        tagging: false,
        debounceTime: 300,
        minimumInputLength: 1,
    },
};

/**
 * Multiple + tagging enabled.
 */
export const MultipleWithTagging: Story = {
    render: (args) => ({
        props: {
            ...args,
            searchFn: (term: string) =>
                of(mockItems.filter((i) =>
                    i.displayLabel.toLowerCase().includes(term.toLowerCase())
                )),
        },
    }),
    args: {
        ...Default.args,
        multiple: true,
        tagging: true,
        placeholder: 'Pick or add tags…',
    },
};

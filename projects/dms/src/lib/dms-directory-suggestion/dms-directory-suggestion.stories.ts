// dms-directory-suggestion.stories.ts
import { of } from 'rxjs';

import {
    Meta,
    moduleMetadata,
    StoryObj,
} from '@storybook/angular';

import { DmsDirectorySuggestionComponent } from './dms-directory-suggestion.component';
import {
    DirectoryEntry,
    DirectoryService,
} from './dms-directory.service';

// -- mocks --
const mockEntries: DirectoryEntry[] = [
    { id: 'eng', displayLabel: 'Engineering' },
    { id: 'hr', displayLabel: 'Human Resources' },
    { id: 'sales', displayLabel: 'Sales' },
];
const mockDirectoryService = {
    suggestEntries: (_params: any) => of(mockEntries),
};

const meta: Meta<DmsDirectorySuggestionComponent> = {
    title: 'Components/DmsDirectorySuggestion',
    component: DmsDirectorySuggestionComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            // import your standalone component directly
            imports: [DmsDirectorySuggestionComponent],
            providers: [
                { provide: DirectoryService, useValue: mockDirectoryService },
            ],
        }),
    ],
    argTypes: {
        valueChange: { action: 'valueChanged' },
        errorMessage: { control: 'text' },
    },
};
export default meta;

type Story = StoryObj<DmsDirectorySuggestionComponent>;

/**
 * Default single‐select version.
 */
export const SingleSelect: Story = {
    args: {
        id: 'dept-suggest-1',
        label: 'Department',
        directoryName: 'departments',
        placeholder: 'Type to search departments…',
        multiple: false,
        readonly: false,
        required: false,
        minChars: 1,
        frequency: 300,
        errorMessage: '',
    },
};

/**
 * Multiple‐select version with required validation error shown.
 */
export const MultipleRequiredWithError: Story = {
    args: {
        ...SingleSelect.args!,
        id: 'dept-suggest-2',
        label: 'Departments (required)',
        multiple: true,
        required: true,
        errorMessage: 'At least one department must be selected.',
    },
};

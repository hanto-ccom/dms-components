import { CommonModule } from '@angular/common';
// dms-directory-suggestion.component.ts
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { DmsSelectivityComponent } from '../dms-selectivity/dms-selectivity.component';
import {
    DirectoryEntry,
    DirectoryService,
} from './dms-directory.service';

@Component({
    selector: 'dms-directory-suggestion',
    standalone: true,
    imports: [CommonModule, FormsModule, DmsSelectivityComponent],
    templateUrl: './dms-directory-suggestion.component.html'
})
export class DmsDirectorySuggestionComponent implements OnInit {
    /** must be unique on the page */
    @Input() id = `dms-dir-sug-${Math.random().toString(36).substr(2, 8)}`;
    @Input() label?: string;
    @Input() ariaLabel?: string;
    @Input() directoryName!: string;
    @Input() dbl10n = false;
    @Input() canSelectParent = false;
    @Input() multiple = false;
    @Input() readonly = false;
    @Input() required = false;
    @Input() minChars = 3;
    @Input() frequency = 300;
    @Input() placeholder = '';
    @Input() params: Record<string, any> = {};

    /** validation / server error message */
    @Input() errorMessage?: string;

    @Output() valueChange = new EventEmitter<string | string[]>();

    constructor(private directoryService: DirectoryService) { }

    ngOnInit() {
        if (!this.directoryName) {
            throw new Error('directoryName is required');
        }
    }

    searchEntries(term: string): Observable<DirectoryEntry[]> {
        const base = {
            directoryName: this.directoryName,
            dbl10n: this.dbl10n,
            canSelectParent: this.canSelectParent,
            localize: true,
            lang: navigator.language.split('-')[0] || 'en',
            searchTerm: term,
            ...this.params,
        };
        return this.directoryService.suggestEntries(base);
    }

    onChange(selection: any) {
        this.valueChange.emit(selection);
    }
}

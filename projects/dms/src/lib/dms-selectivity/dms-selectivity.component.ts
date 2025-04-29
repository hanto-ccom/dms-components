import { CommonModule } from '@angular/common';
// dms-selectivity.component.ts
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

import {
    Observable,
    Subject,
} from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    finalize,
    switchMap,
    tap,
} from 'rxjs/operators';

import {
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
} from '@ng-select/ng-select';

@Component({
    selector: 'dms-selectivity',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,              // ← import FormsModule
        ReactiveFormsModule,      // ← optionally ReactiveFormsModule, more implementation necessary
        NgLabelTemplateDirective,
        NgOptionTemplateDirective,
        NgSelectComponent,

    ],
    templateUrl: './dms-selectivity.component.html'
})
export class DmsSelectivityComponent implements OnInit {
    /** for `<label [for]>` */
    @Input() inputId!: string;
    /** if you don’t have a visible `<label>`, you can set this */
    @Input() ariaLabel?: string;
    /** hook up to an error message `<span id="…">` */
    @Input() ariaDescribedBy?: string | null;
    /** highlight invalid state */
    @Input() error?: string | null;

    @Input() multiple = false;
    @Input() placeholder = '';
    @Input() disabled = false;
    @Input() clearable = true;
    @Input() tagging = false;

    @Input() debounceTime = 300;             // ms
    @Input() minimumInputLength = 3;
    /** your typeahead function */
    @Input() searchFn!: (term: string) => Observable<any[]>;

    @Output() change = new EventEmitter<any>();
    @Output() open = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();

    items: any[] = [];
    loading = false;
    search$ = new Subject<string>();

    selectControl = new FormControl();

    ngOnInit() {
        if (!this.searchFn) {
            throw new Error('dms-selectivity: you must provide a searchFn');
        }
        this.search$
            .pipe(
                debounceTime(this.debounceTime),
                distinctUntilChanged(),
                // only pass along non-null strings
                filter((term): term is string => typeof term === 'string' && term.length >= this.minimumInputLength),
                tap(() => (this.loading = true)),
                switchMap((term) =>
                    this.searchFn(term).pipe(finalize(() => (this.loading = false)))
                )
            )
            .subscribe((results) => (this.items = results));
    }

    /** for tagging support */
    createTag = (term: string) => ({ id: term, displayLabel: term });
}

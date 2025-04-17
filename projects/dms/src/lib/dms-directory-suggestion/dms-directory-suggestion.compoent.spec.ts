import {
    ComponentFixture,
    fakeAsync,
    TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DmsSelectivityComponent } from '../dms-selectivity/dms-selectivity.component';
import { DmsDirectorySuggestionComponent } from './dms-directory-suggestion.component';
import { DirectoryService } from './dms-directory.service';

class MockDirectoryService {
    suggestEntries = jasmine.createSpy('suggestEntries').and.returnValue(of([]));
}

describe('DmsDirectorySuggestionComponent', () => {
    let component: DmsDirectorySuggestionComponent;
    let fixture: ComponentFixture<DmsDirectorySuggestionComponent>;
    let mockService: MockDirectoryService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmsDirectorySuggestionComponent],
            providers: [{ provide: DirectoryService, useClass: MockDirectoryService }]
        }).compileComponents();

        fixture = TestBed.createComponent(DmsDirectorySuggestionComponent);
        component = fixture.componentInstance;
        mockService = TestBed.inject(DirectoryService) as any;
        component.directoryName = 'testDir';
        component.minChars = 1;
        component.frequency = 0;
        fixture.detectChanges();
    });

    it('should throw if directoryName is missing', () => {
        const comp = TestBed.createComponent(DmsDirectorySuggestionComponent).componentInstance;
        expect(() => comp.ngOnInit()).toThrowError('directoryName is required');
    });

    it('should call service with assembled params', fakeAsync(() => {
        const term = 'abc';
        component.searchEntries(term).subscribe();
        const expected = jasmine.objectContaining({
            directoryName: 'testDir',
            searchTerm: term,
            localize: true,
            lang: navigator.language.split('-')[0]
        });
        expect(mockService.suggestEntries).toHaveBeenCalledWith(expected);
    }));

    it('should emit valueChange on onChange()', () => {
        spyOn(component.valueChange, 'emit');
        const selection = ['1', '2'];
        component.onChange(selection);
        expect(component.valueChange.emit).toHaveBeenCalledWith(selection);
    });

    it('should bind properties into <dms-selectivity>', () => {
        const selectComp = fixture.debugElement.query(By.directive(DmsSelectivityComponent)).componentInstance;
        expect(selectComp.inputId).toBe(`${component.id}-input`);
        expect(selectComp.multiple).toBe(component.multiple);
        expect(selectComp.placeholder).toBe(component.placeholder);
    });

    // Accessibility tests for WAI-ARIA
    it('should pass aria-label to dms-selectivity when ariaLabel provided', () => {
        component.ariaLabel = 'Choose items';
        fixture.detectChanges();
        const selectComp = fixture.debugElement.query(By.directive(DmsSelectivityComponent)).componentInstance;
        expect(selectComp.ariaLabel).toBe('Choose items');
    });


    it('should pass error flag to dms-selectivity when errorMessage is present', () => {
        component.errorMessage = 'Invalid input';
        fixture.detectChanges();
        const selectComp = fixture.debugElement.query(By.directive(DmsSelectivityComponent)).componentInstance;
        expect(selectComp.error).toBe('Invalid input');
    });
});

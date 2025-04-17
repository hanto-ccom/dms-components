import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  of,
  Subject,
} from 'rxjs';

import { NgSelectComponent } from '@ng-select/ng-select';

import { DmsSelectivityComponent } from './dms-selectivity.component';

// Optional: to run automated accessibility audits, install axe-core and import it here
// import axe from 'axe-core';

describe('DmsSelectivityComponent', () => {
  let component: DmsSelectivityComponent;
  let fixture: ComponentFixture<DmsSelectivityComponent>;
  let mockSearchFn: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsSelectivityComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DmsSelectivityComponent);
    component = fixture.componentInstance;
    mockSearchFn = jasmine.createSpy('searchFn').and.returnValue(of([{ id: '1', displayLabel: 'One' }]));

    component.searchFn = mockSearchFn;
    component.inputId = 'test-select';
    component.minimumInputLength = 1;
    component.debounceTime = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error if searchFn is not provided', () => {
    const comp = TestBed.createComponent(DmsSelectivityComponent).componentInstance;
    comp.inputId = 'no-search';
    comp.minimumInputLength = 1;
    comp.debounceTime = 0;
    expect(() => comp.ngOnInit()).toThrowError('dms-selectivity: you must provide a searchFn');
  });

  it('should load items on valid search term', fakeAsync(() => {
    component.ngOnInit();
    component.search$.next('abc');
    tick();
    fixture.detectChanges();

    expect(mockSearchFn).toHaveBeenCalledWith('abc');
    expect(component.loading).toBeFalse();
    expect(component.items).toEqual([{ id: '1', displayLabel: 'One' }]);
  }));

  it('should set loading true before search and false after', fakeAsync(() => {
    const results$ = new Subject<any[]>();
    mockSearchFn.and.returnValue(results$.asObservable());
    component.ngOnInit();
    component.search$.next('term');
    tick();
    expect(component.loading).toBeTrue();

    results$.next([{ id: '2', displayLabel: 'Two' }]);
    results$.complete();
    tick();
    expect(component.loading).toBeFalse();
    expect(component.items).toEqual([{ id: '2', displayLabel: 'Two' }]);
  }));

  it('should not call searchFn if term is too short', fakeAsync(() => {
    component.minimumInputLength = 5;
    component.ngOnInit();
    component.search$.next('abc');
    tick();
    expect(mockSearchFn).not.toHaveBeenCalled();
  }));

  it('createTag should return correct object', () => {
    const term = 'newTag';
    expect(component.createTag(term)).toEqual({ id: term, displayLabel: term });
  });

  it('should emit change, open, and close events from ng-select', () => {
    const ngSelectDe = fixture.debugElement.query(By.directive(NgSelectComponent));
    const changeSpy = spyOn(component.change, 'emit');
    const openSpy = spyOn(component.open, 'emit');
    const closeSpy = spyOn(component.close, 'emit');

    ngSelectDe.triggerEventHandler('change', 'event');
    ngSelectDe.triggerEventHandler('open', null);
    ngSelectDe.triggerEventHandler('close', null);

    expect(changeSpy).toHaveBeenCalledWith('event');
    expect(openSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  // Accessibility tests for WAI-ARIA
  it('should set aria-label on ng-select when provided', () => {
    component.ariaLabel = 'Select items';
    fixture.detectChanges();
    const ngSelectEl = fixture.debugElement.query(By.css('ng-select')).nativeElement;
    expect(ngSelectEl.getAttribute('aria-label')).toBe('Select items');
  });

  it('should set aria-describedby on ng-select when provided', () => {
    component.ariaDescribedBy = 'error-msg';
    fixture.detectChanges();
    const ngSelectEl = fixture.debugElement.query(By.css('ng-select')).nativeElement;
    expect(ngSelectEl.getAttribute('aria-describedby')).toBe('error-msg');
  });

  it('should apply aria-invalid when error is present', () => {
    component.error = 'Required field';
    fixture.detectChanges();
    const ngSelectEl = fixture.debugElement.query(By.css('ng-select')).nativeElement;
    expect(ngSelectEl.getAttribute('aria-invalid')).toBe('true');
  });

  // Optional: run automated accessibility audit using axe-core
  // it('should have no accessibility violations', async (done) => {
  //   const results = await axe.run(fixture.nativeElement);
  //   expect(results.violations.length).toBe(0);
  //   done();
  // });
});

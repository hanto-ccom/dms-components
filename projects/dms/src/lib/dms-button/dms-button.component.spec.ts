import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { DmsButtonComponent } from './dms-button.component';

describe('DmsButtonComponent', () => {
    let component: DmsButtonComponent;
    let fixture: ComponentFixture<DmsButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DmsButtonComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DmsButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the default label', () => {
        const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
        expect(buttonElement.textContent?.trim()).toEqual('Click me');
    });

    it('should display the provided label', () => {
        component.label = 'Test Label';
        fixture.detectChanges();
        const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
        expect(buttonElement.textContent?.trim()).toEqual('Test Label');
    });
});

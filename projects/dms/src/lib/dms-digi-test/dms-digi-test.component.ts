import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { ButtonVariation } from '@digi/arbetsformedlingen';
import {
    DigiArbetsformedlingenAngularModule,
} from '@digi/arbetsformedlingen-angular';

@Component({
    selector: 'lib-dms-digi-test',
    imports: [DigiArbetsformedlingenAngularModule],
    templateUrl: './dms-digi-test.component.html'
})
export class DmsDigiTestComponent {
    @Input() buttonVariation: ButtonVariation = ButtonVariation.SECONDARY;
    @Output() clickEvent = new EventEmitter<void>();


    handleClick() {

        this.clickEvent.emit();
    }
}

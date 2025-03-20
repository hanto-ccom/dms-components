import {
    Component,
    EventEmitter,
    Output,
} from '@angular/core';

import { ButtonVariation } from '@digi/arbetsformedlingen';
import {
    DigiArbetsformedlingenAngularModule,
} from '@digi/arbetsformedlingen-angular';

@Component({
    selector: 'lib-dms-digi-test',
    standalone: true,
    imports: [DigiArbetsformedlingenAngularModule],
    templateUrl: './dms-digi-test.component.html'
})
export class DmsDigiTestComponent {
    @Output() clickEvent = new EventEmitter<void>();

    buttonVariation = ButtonVariation.SECONDARY;
    handleClick() {
        console.log('👋 Hallå Världen');
        this.clickEvent.emit();
    }
}

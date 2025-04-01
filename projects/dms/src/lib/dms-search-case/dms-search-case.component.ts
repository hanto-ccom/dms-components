import {
    Component,
    Input,
} from '@angular/core';

import { FormInputButtonVariation } from '@digi/arbetsformedlingen';
import { DigiArbetsformedlingenAngularModule } from '@digi/arbetsformedlingen-angular';

@Component({
    selector: 'lib-dms-search',
    imports: [DigiArbetsformedlingenAngularModule],
    templateUrl: './dms-search-case.component.html',
    styleUrls: ['./dms-search-case.component.css'],
    standalone: true
})
export class DmsSearchComponent {

    @Input() buttonVariation: FormInputButtonVariation = FormInputButtonVariation.PRIMARY;

}
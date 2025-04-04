import {
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';

import { FormInputButtonVariation } from '@digi/arbetsformedlingen';
import { DigiArbetsformedlingenAngularModule } from '@digi/arbetsformedlingen-angular';

@Component({
    selector: 'lib-dms-search',
    imports: [DigiArbetsformedlingenAngularModule],
    templateUrl: './dms-search-case.component.html',
    styleUrls: ['./dms-search-case.component.css'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
})
export class DmsSearchComponent {

    @Input() buttonVariation: FormInputButtonVariation = FormInputButtonVariation.PRIMARY;

}
import { Component } from '@angular/core';

import { DigiArbetsformedlingenAngularModule } from '@digi/arbetsformedlingen-angular';

@Component({
    selector: 'lib-dms-card-content',
    templateUrl: './dms-card-content.component.html',
    standalone: true,
    imports: [DigiArbetsformedlingenAngularModule]
})
export class DmsCardContentComponent {
}
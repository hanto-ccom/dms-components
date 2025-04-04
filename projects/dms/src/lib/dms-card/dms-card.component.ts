import { Component } from '@angular/core';

import { DmsCardContentComponent } from './dms-card-content.component';
import { DmsCardFooterComponent } from './dms-card-footer.component';
import { DmsCardHeaderComponent } from './dms-card-header.component';

@Component({
  selector: 'lib-dms-card',
  templateUrl: './dms-card.component.html',
  standalone: true,
  imports: [
    DmsCardHeaderComponent,
    DmsCardContentComponent,
    DmsCardFooterComponent
  ]
})
export class DmsCardComponent { }
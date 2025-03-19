import {
  Component,
  Input,
} from '@angular/core';

@Component({
    selector: 'lib-dms-card',
    templateUrl: './dms-card.component.html',
})
export class DmsCardComponent {
    @Input() title: string = 'Card Title';
    @Input() content: string = 'Card content goes here.';
}
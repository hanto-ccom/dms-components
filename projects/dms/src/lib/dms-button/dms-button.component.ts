import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'lib-dms-button',
  templateUrl: './dms-button.component.html',
})
export class DmsButtonComponent {
  @Input() label: string = 'Click me';
}
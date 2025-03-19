import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'lib-dms-button',
  templateUrl: './dms-button.component.html'
})
export class DmsButtonComponent {
  @Input() label: string = 'Click me';
  @Output() clickEvent = new EventEmitter<void>();


  handleClick() {
    console.log("Button clicked! ")
    //emit event to parent if needed
    this.clickEvent.emit();
  }
}
import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'lib-dms-button',
  template: `
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {{ label }}
    </button>
  `,
})
export class DmsButtonComponent {
  @Input() label: string = 'Click me';
}
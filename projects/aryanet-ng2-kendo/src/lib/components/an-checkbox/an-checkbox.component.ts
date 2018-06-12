import { Component, OnInit, Input, Output, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'an-k-checkbox',
  templateUrl: './an-checkbox.component.html',
  styleUrls: ['./an-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AryaNetanCheckBoxComponent),
      multi: true
    }

  ]
})
export class AryaNetanCheckBoxComponent extends FormBaseComponent {


  data: boolean;
  required: boolean;

  constructor() {
    super();
  }

  writeValue(obj: any) {
    if (obj) {
      this.data = obj;
    }
  }


}

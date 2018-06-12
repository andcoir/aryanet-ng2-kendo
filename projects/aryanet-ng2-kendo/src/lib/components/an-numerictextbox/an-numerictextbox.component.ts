import { Component, OnInit, Input, Output, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBaseComponent } from '@app/admin/form/components/base.component';

@Component({
  selector: 'an-k-numerictextbox',
  templateUrl: './an-numerictextbox.component.html',
  styleUrls: ['./an-numerictextbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AryaNetanNumericTextBoxComponent),
      multi: true
    }

  ]
})
export class AryaNetanNumericTextBoxComponent extends FormBaseComponent {


  @Input() direction: boolean;
  @Input() placeholder: string;
  @Input() inputType: string;
  @Input() min=0 
  @Input() max=99999;
  @Input() format="n0";
  @Input() step=1;
  data: string;
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

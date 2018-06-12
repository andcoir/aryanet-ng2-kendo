import { Component, OnInit, Input, Output, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBaseComponent } from '@app/admin/form/components/base.component';

@Component({
  selector: 'an-k-textarea',
  templateUrl: './an-textarea.component.html',
  styleUrls: ['./an-textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AryaNetTextAreaComponent),
      multi: true
    }

  ]
})
export class AryaNetTextAreaComponent extends FormBaseComponent {


  @Input() direction: boolean;
  @Input() placeholder: string;
  @Input() inputType: string;

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

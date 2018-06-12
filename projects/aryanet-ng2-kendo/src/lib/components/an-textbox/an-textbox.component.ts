
import {
  Component, OnInit, Input, Output,
  forwardRef, OnChanges, SimpleChanges,
  Directive, Renderer2, ElementRef, HostListener,
  ContentChild, HostBinding, OnDestroy, AfterViewInit, AfterViewChecked
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { FormBaseComponent } from '@app/admin/form/components/base.component';

import * as $ from 'jquery';
import { InputRefDirective } from '@app/admin/form/directive/input-ref-directive';


@Component({
  selector: 'an-k-textbox',
  templateUrl: './an-textbox.component.html',
  styleUrls: ['./an-textbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AryaNetTextBoxComponent),
      multi: true
    }

  ]
})
export class AryaNetTextBoxComponent extends FormBaseComponent
  implements OnChanges, OnDestroy, AfterViewChecked {




  @Input() direction: boolean;
  @Input() placeholder: string;
  @Input() inputType: string;

  @Input() required: boolean;
  @Input() ngName: string;
  @Input() minlength: number;

  data: string;

  constructor() {
    super();

  }

  ngOnInitHandler() {

  }

  ngAfterViewChecked(): void {
  }

  writeValue(obj: any) {
    if (obj) {
      this.data = obj;
    }
  }




  @Input() anchor: HTMLInputElement;
  @Input() control: NgModel;
  @ContentChild(InputRefDirective) input: InputRefDirective;
  @HostBinding("class.focus")
  get focus() {
    return this.input ? this.input.focus : false;
  }

  ngOnDestroy(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
   
  }


}

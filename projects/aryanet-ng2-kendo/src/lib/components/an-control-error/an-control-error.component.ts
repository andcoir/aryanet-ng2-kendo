
import {
  Component, OnInit, Input, Output, OnChanges, OnDestroy, SimpleChanges,
} from '@angular/core';
import { BaseComponent } from '@app/core/components/base.component';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'an-k-control-error',
  templateUrl: './an-control-error.component.html',
  styleUrls: ['./an-control-error.component.css']
})
export class AryaNetControlErrorComponent extends BaseComponent
  implements OnChanges, OnDestroy {

  @Input() anchor: HTMLInputElement;
  @Input() control: NgModel;
  @Input() name: string;

  constructor() {
    super();
  }


  ngOnDestroy(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  
  }


}


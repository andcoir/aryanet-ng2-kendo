import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import {
  FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

import { Observable } from 'rxjs';

import { SelectListModel } from '@app/core';
import { FormBaseComboComponent } from '@app/admin/form/components/base.component';
import { FormBaseComboService } from '@app/admin/form/services/base.service';

@Component({
  selector: 'an-k-dropdownlist',
  templateUrl: './an-dropdownlist.component.html',
  styleUrls: ['./an-dropdownlist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AryaNetDropdownlistComponent),
      multi: true
    }

  ]
})
export class AryaNetDropdownlistComponent extends FormBaseComboComponent {


  required: boolean;

  constructor(service: FormBaseComboService) {
    super();

    this.service = service;



  }

  ngOnInitHandler() {
    let items = new Array<SelectListModel>();
    const that = this;

    if (this.dataSourceUrl !== undefined &&
      this.dataSourceUrl != '') {

      // this.service.setApiUrl(this.dataSourceUrl)
      this.view = this.service;

      if (this.autoBound) {

        this.service.readAllByUrlObservable(this.dataSourceUrl)
          .subscribe((x: SelectListModel[]) => {
            items = x;
            //
            that.view = Observable.create((observer) => {
              observer.next(items);
            });

          });

      }

    }
    else if (this.dataSourceItems !== undefined &&
      this.dataSourceItems.length > 0) {

      for (let i = 0; i < this.dataSourceItems.length; i++) {

        const element = this.dataSourceItems[i];
        if (typeof element == 'string') {
          items.push(<SelectListModel>{
            text: element,
            value: element
          })
        }
        else {
          items.push(<SelectListModel>{
            text: element.text,
            value: element.value
          })
        }
      }



      this.view = Observable.create((observer) => {
        observer.next(items);
      });


    }



  }




}

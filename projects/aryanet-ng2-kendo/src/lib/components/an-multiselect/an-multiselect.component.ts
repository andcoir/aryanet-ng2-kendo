import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import {
  FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

import { Observable, of } from 'rxjs';

import { SelectListModel } from '@app/core';
import { FormBaseComboComponent, FormBaseKendoMultiSelectComponent } from '@app/admin/form/components/base.component';
import { FormBaseComboService } from '@app/admin/form/services/base.service';
import { map, switchMap } from 'rxjs/operators';
import { defaultUrlMatcher } from '@angular/router/src/shared';

@Component({
  selector: 'an-k-multiselect',
  templateUrl: './an-multiselect.component.html',
  styleUrls: ['./an-multiselect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AryaNetMultiSelectComponent),
      multi: true
    }

  ]
})
export class AryaNetMultiSelectComponent extends FormBaseKendoMultiSelectComponent {


  public listItems: SelectListModel[] = [];
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

      this.view = this.service;
      if (this.autoBound) {

        this.service.readAllByUrlObservable(this.dataSourceUrl)
          .subscribe((x: SelectListModel[]) => {
            items = x;
            //
            that.view = Observable.create((observer) => {
              observer.next(items);
            });

            that.listItems = x;
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

      that.listItems = items;

    }



  }



  //   writeValue(obj: any): void {
  //     debugger;
  //     if (obj) {
  //         this.selectedtems = obj;
  //         // this.onValueChange(obj);
  //     }
  // }














  // public listItems: Array<string> = [
  //   "Small", "Medium", "Large"
  // ];


  // public valueNormalizer1 = (text$: Observable<string>) => text$.pipe(map((text: string) => {
  //   //search for matching item to avoid duplicates
  //   debugger;
  //   //search in values
  //   const matchingValue: any = this.selectedtems.find((item: any) => {
  //     return item.toLowerCase() === text.toLowerCase();
  //   });

  //   if (matchingValue) {
  //     return matchingValue; //return the already selected matching value and the component will remove it
  //   }

  //   //search in data
  //   const matchingItem: any = this.listItems.find((item: any) => {
  //     return item.toLowerCase() === text.toLowerCase();
  //   });

  //   if (matchingItem) {
  //     return matchingItem;
  //   } else {
  //     return text;
  //   }
  // }));








}

import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlBase } from '../models/control-base';


@Injectable()
export class ControlService {
  constructor() { }

  toFormGroup(control: ControlBase<any>[] ) {
    let group: any = {};

    control.forEach(control => {
      group[control.key] = control.required ? 
      new FormControl(control.value || '', Validators.required):
       new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
}


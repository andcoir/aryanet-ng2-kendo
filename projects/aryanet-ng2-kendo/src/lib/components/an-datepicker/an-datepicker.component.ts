import {
  Component, OnInit, Input,
  Output, ViewChild, forwardRef, EventEmitter
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';


import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { FormBaseComponent, FormBaseControlValueAccessor } from '@app/admin/form/components/base.component';
import { BaseControlValueAccessor } from '@app/core/components/base.component';

@Component({
  selector: 'an-k-datepicker',
  templateUrl: './an-datepicker.component.html',
  styleUrls: ['./an-datepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AryaNetDatePickerComponent),
      multi: true
    }

  ]
})
export class AryaNetDatePickerComponent extends FormBaseControlValueAccessor {


  date: any;

  @Input() id: string;
  @Input() name: string;
  @Input() label: string;
  @Input() labelInline: boolean;
  @Input() direction: boolean;
  @Input() placeholder: string;
  @Input() inputType: string;
  required: boolean;

  @ViewChild('datePicker') datePicker: DatePickerComponent;
  @Output() valueChanged = new EventEmitter<any>();


  datePickerConfig = {
    drops: 'down', // up,down
    format: 'jYYYY/jMM/jDD',
    //  format: 'LL', // 15 آبان 1396
    // format: 'YYYY/MM/DD',
    locale: 'fa',
    calendarSystem: 0,

    // hours12Format?: string;
    // hours24Format?: string;
    // maxTime?: Moment;
    // meridiemFormat?: string;
    // minTime?: Moment;
    // minutesFormat?: string;
    // minutesInterval?: number;
    // secondsFormat?: string;
    // secondsInterval?: number;
    // showSeconds?: boolean;
    // showTwentyFourHours?: boolean;
    // timeSeparator?: string;
    // calendarSystem?: ECalendarSystem;
    // isMonthDisabledCallback?: (date: Moment) => boolean;
    // allowMultiSelect?: boolean;
    // yearFormat?: string;
    // calendarSystem?: ECalendarSystem;
    // yearFormatter?: (month: Moment) => string;
    // format?: string;
    // isNavHeaderBtnClickable?: boolean;
    // monthBtnFormat?: string;
    // monthBtnFormatter?: (day: Moment) => string;
    // multipleYearsNavigateBy?: number;
    // showMultipleYearsNavigation?: boolean;
    // isDayDisabledCallback?: (date: Moment) => boolean;
    // isMonthDisabledCallback?: (date: Moment) => boolean;
    // weekDayFormat?: string;
    // showNearMonthDays?: boolean;
    // showWeekNumbers?: boolean;
    // firstDayOfWeek?: WeekDays;
    // calendarSystem?: ECalendarSystem;
    // format?: string;
    // allowMultiSelect?: boolean;
    // monthFormat?: string;
    // monthFormatter?: (month: Moment) => string;
    // enableMonthSelector?: boolean;
    // yearFormat?: string;
    // yearFormatter?: (year: Moment) => string;
    // dayBtnFormat?: string;
    // dayBtnFormatter?: (day: Moment) => string;
    // monthBtnFormat?: string;
    // monthBtnFormatter?: (day: Moment) => string;
    // multipleYearsNavigateBy?: number;
    // showMultipleYearsNavigation?: boolean;
    // closeOnSelect?: boolean;
    // closeOnSelectDelay?: number;
    // onOpenDelay?: number;
    // disableKeypress?: boolean;
    // appendTo?: string | HTMLElement;
    // inputElementContainer?: HTMLElement;
    // showGoToCurrent?: boolean;
    // drops?: TDrops;
    // opens?: TOpens;
    // hideInputContainer?: boolean;
};



  constructor() {
    super();
  }

  open() {
    this.datePicker.api.open();
  }

  close() {
    this.datePicker.api.close();
  }

  public onValueChange(value: any): void {
    this.propagateChange(value);
    this.valueChanged.emit(value);
  }

  writeValue(obj: any): void {
    this.date = obj;
    if (obj == undefined) {
    }
  }

}

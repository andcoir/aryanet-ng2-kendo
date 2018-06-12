import {
    Input, Output, EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';

import {
    BaseControlValueAccessor, SelectListModel,
    BaseComboService, BaseComponent, TreeModel
} from "aryanet-ng2-core";

import { GridDataResult, PageChangeEvent, SelectableSettings, SelectAllCheckboxState, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { BaseKendoGridService } from '../services/base.service';
import { State } from '@progress/kendo-data-query';

import { CheckableSettings } from '@progress/kendo-angular-treeview';



export abstract class BaseKendoComboComponent extends BaseControlValueAccessor {

    @Input() selectedId: any;
    @Output() valueChanged = new EventEmitter<any[]>();
    @Input() autoBound = true;
    service: BaseComboService;

    view: Observable<any[]>;

    constructor() {
        super();

    }

    abstract ngOnInitHandler();

    public clear(): void {
        this.selectedId = null;

    }


    public onValueChange(value: any): void {
        this.propagateChange(value);
        this.valueChanged.emit(value);
    }



    public onSelectionChange(): void {
    }

    public onFilterChange(): void {

    }

    public onOpen(): void {
    }

    public onClose(): void {
    }

    public onFocus(): void {
    }

    public onBlur(): void {
    }



    writeValue(obj: string): void {
        if (obj) {
            this.selectedId = obj.toString();
        }
    }


}


export abstract class BaseKendoMultiSelectComponent extends BaseControlValueAccessor {

    @Input() selectedtems: SelectListModel[] = [];
    @Output() valueChanged = new EventEmitter<any[]>();

    @Input() allowCustom: boolean = false;
    @Input() valueNormalizer: any;
    @Input() autoBound = true;
    service: BaseComboService;

    view: Observable<any[]>;

    constructor() {
        super();

    }

    abstract ngOnInitHandler();

    public clear(): void {
        this.selectedtems = null;

    }


    public onValueChange(value: any): void {
        this.propagateChange(value);
        this.valueChanged.emit(value);
    }



    public onSelectionChange(): void {
    }

    public onFilterChange(): void {

    }

    public onOpen(): void {
    }

    public onClose(): void {
    }

    public onFocus(): void {
    }

    public onBlur(): void {
    }



    writeValue(obj: any[]): void {
        if (obj) {
            this.selectedtems = obj;
        }
    }


}






export abstract class BaseKendoTreeComponent extends BaseComponent {


    public isExpanded = (item: TreeModel) => {
        return item.hasChildren;
    }
    public hasChildren = (item: TreeModel) => {
        return item.hasChildren;
    }

    public abstract fetchChildren = () => { };



    public checkedKeys: any[] = [''];
    public checkChildren = true;
    public checkParents = true;
    @Input() checkMode: any = 'multiple';
    public selectionMode: any = 'single';
    public expandedKeys: any[] = [''];
    public selectBy = 'id';
    public selectedKeys: any[] = [''];

    @Output() checkedKeysChange = new EventEmitter<any[]>();

    public get checkableSettings(): CheckableSettings {
        return {
            checkChildren: this.checkChildren,
            checkParents: this.checkParents,
            mode: this.checkMode
        };

    }



}

export abstract class BaseKendoGridComponent extends BaseComponent {

    gridDataResult: Observable<GridDataResult>;
    state: State = {
        skip: 0,
        take: 10,
        filter: {
            logic: 'and',
            filters: []
        }
    };
    protected selectableSettings = <SelectableSettings>{
        enabled: true,
        mode: 'multiple'
    };


    public openedConfirmDelete = true;
    protected editedRowIndex: number;
    protected editedItem: any;
    protected _service: BaseKendoGridService;

    public selectedKeys = Array<any>();
    public selectedRows = Array<any>();
    protected selectAllState: SelectAllCheckboxState = 'unchecked';

    // @ContentChild('deleteConfirm') deleteConfirm: ElementRef;
    // @ViewChild(DeleteConfirmComponent) deleteConfirm2: DeleteConfirmComponent;

    constructor(service: BaseKendoGridService) {
        super();
        this._service = service;
        this.gridDataResult =
            this.gridDataResult = service;


    }




    private onCloseEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        // this._service.resetItem(this.editedItem);
        this.editedRowIndex = undefined;
        this.editedItem = undefined;
    }




    onDataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this._service.state = state;
        this._service.readGrid();
    }




    onSelectedKeysChange() {
        const len = this.selectedKeys.length;

        if (len === 0) {
            this.selectAllState = 'unchecked';
        } else if (len > 0 && len < this.selectedKeys.length) {
            this.selectAllState = 'indeterminate';
        } else {
            this.selectAllState = 'checked';
        }
    }



    protected onSelectAllChange(checkedState: SelectAllCheckboxState) {

        if (checkedState === 'checked') {

            // this.dataItemSelection = this.items.map((item) => {
            //     return item.ProductID; });
            this.selectAllState = 'checked';
        } else {
            this.selectedKeys = [];
            this.selectAllState = 'unchecked';
        }
    }
    //===========


    onPageChange(event: PageChangeEvent): void {
        this.state.skip = event.skip;
        this._service.readGrid();
    }





    protected addClickedHandler() { }

    protected editClickedHandler() { }

    protected deleteClickedHandler() { }
    protected deleteAllClickedHandler() { }


}








export abstract class FormBaseComboComponent extends BaseKendoComboComponent {

    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() label: string;
    @Input() labelInline: boolean;
    @Input() dataSourceUrl: string;
    @Input() dataSourceItems: SelectListModel[] | string[];


}


export abstract class FormBaseKendoMultiSelectComponent extends BaseKendoMultiSelectComponent {

    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() label: string;
    @Input() labelInline: boolean;
    @Input() dataSourceUrl: string;
    @Input() dataSourceItems: SelectListModel[] | string[];


}









export abstract class FormBaseComponent extends BaseControlValueAccessor {
    @Input() id: string;
    @Input() name: string;
    @Input() label: string;
    @Input() labelInline: boolean;

    abstract writeValue(obj: any);

    constructor() {
        super();
        if (this.name == undefined ||
            this.name == '') {
            this.name = this.id;
        }
    }

}




export abstract class FormBaseKendoGridComponent extends BaseKendoGridComponent {

}



import { BehaviorSubject, Observable } from 'rxjs';


import { GridDataResult } from '@progress/kendo-angular-grid';

import { HttpParams } from '@angular/common/http';
import { BaseHttpClientService } from 'aryanet-ng2-core/lib/services/base.httpclient.service';
import { State, toDataSourceRequestString } from '@progress/kendo-data-query';
import { BaseService,BaseComboService,NotifyService, OperationResultModel } from 'aryanet-ng2-core';
import { map } from 'rxjs/operators';
















export class BaseKendoGridService extends BehaviorSubject<GridDataResult> {
    baseHttpService: BaseHttpClientService;
    readId: number;
    // loading: LoadingManager;
    notify: NotifyService;
    protected baseService: BaseService;
  
    protected dataItems: any[] = [];
    public state: State = {
      skip: 0,
      take: 10
    };
    filterModel: any = {};
  
    protected CREATE_ACTION = 'create';
    protected UPDATE_ACTION = 'update';
    protected REMOVE_ACTION = 'destroy';
    protected KendoGridDataResult: GridDataResult;
    constructor(apiUrl: string, readId: number = 0) {
      super(null);
      this.readId = readId;
  
      this.baseService = new BaseService(apiUrl);
      this.baseHttpService = new BaseHttpClientService();
      this.notify = this.baseService.notify;
      // this.loading = this._baseService.loading;
  
  
    }
  
  
  
    public readGrid(url?: string): void {
  
      const that = this;
      this._readGrid(this.state, this.filterModel, url)
        .subscribe(x => {
          super.next(x);
        });
    }
  
  
  
    public save(data: any, isNew?: boolean) {
      const action = isNew ? this.CREATE_ACTION : this.UPDATE_ACTION;
      const that = this;
      // this.loading.show();
      if (isNew) {
  
        this.baseHttpService.post(data, this.baseService.HTTP_URL).subscribe(
          d => {
            that.baseService.operationHandling(d, (r) => {
              that.notify.showSuccess();
              that.readGrid();
              // that.loading.hide();
            });
          },
          err => {
            that.notify.showError(err);
            console.log('error: ', err);
            // that.loading.hide();
          });
  
      } else {
        this.baseHttpService.put(data, this.baseService.HTTP_URL).subscribe(
          d => {
            that.baseService.operationHandling(d, (r) => {
              that.notify.showSuccess();
              that.readGrid();
              // that.loading.hide();
            });
          },
          err => {
            that.notify.showError(err);
            console.log('error: ', err);
            // that.loading.hide();
          });
      }
      // this.reset();
      // this.read();
      // this.fetch(action, data)
      //     .subscribe(() => this.read(), () => this.read());
    }
  
  
    public remove(id: number) {
  
      const that = this;
      this.notify.showDeleteConfirm((r) => {
  
        // this.loading.show();
        this.baseHttpService.delete(`${this.baseService.HTTP_URL}/${id}`)
          .subscribe((r) => {
  
            that.notify.showSuccess();
            that.readGrid();
          },
            err => {
              that.notify.showError(err);
            }
          );
      });
    }
  
  
    public removeRange(id: Array<number>) {
  
      const that = this;
      // this.loading.show();
      this.notify.showDeleteConfirm((r) => {
  
        this.baseService.deleteRange(id).subscribe(
          d => {
  
            that.notify.showSuccess();
            that.readGrid();
          }
          , err => {
            that.notify.showError(err);
          }
        );
  
      });
    }
  
    public removeAll() {
  
      const that = this;
      // this.loading.show();
      this.notify.showDeleteConfirm((r) => {
  
        this.baseService.deleteAll().subscribe(
          d => {
            that.baseService.operationHandling(d, (r) => {
              that.notify.showSuccess();
              that.readGrid();
            });
            // that.loading.hide();
          },
          err => {
            that.notify.showError(err);
            // that.loading.hide();
          }
        );
  
      });
    }
  
  
    private _readGrid(state: any, params: any, url?: string): Observable<GridDataResult> {
  
      let queryStr = `${toDataSourceRequestString(state)}`;
  
      // Customize  RMP API
      queryStr = queryStr.replace('page', 'pageIndex');
  
      let httpUrl = `${this.baseService.HTTP_URL}`;
      if (url != undefined)
        httpUrl += `/${url}`;
  
      if (this.readId > 0) {
        httpUrl += `?id=${this.readId}&${queryStr}`;
      } else {
        httpUrl += `?${queryStr}`;
      }
  
      let httparams = new HttpParams();
      if (params !== undefined && params !== null)
        httparams = this.baseService.appendHttpParams(httparams, params);
  
  
      const that = this;
      return this.baseHttpService.http.get(httpUrl, {
        params: httparams
      })
        .pipe(
  
          map((response: OperationResultModel) => {
            let result: GridDataResult;
            that.baseService.operationHandling(response, (r: GridDataResult) => {
              result = r;
            });
  
            return result || <GridDataResult>{};
  
          })
        );
  
  
    }
  
  }
  






export class FormBaseService extends BaseService {
    constructor(apiUrl: string) {
        super(apiUrl);
    }
}


export class FormBaseComboService extends BaseComboService {
    constructor() {
        super('');
    }
}


export class FormBaseKendoGridService extends BaseKendoGridService {
    constructor(apiUrl: string, readId: number = 0) {
        super(apiUrl, readId);
    }

}



import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AryanetNg2KendoComponent } from './aryanet-ng2-kendo.component';

describe('AryanetNg2KendoComponent', () => {
  let component: AryanetNg2KendoComponent;
  let fixture: ComponentFixture<AryanetNg2KendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AryanetNg2KendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AryanetNg2KendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

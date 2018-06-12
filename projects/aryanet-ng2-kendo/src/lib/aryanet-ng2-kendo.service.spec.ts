import { TestBed, inject } from '@angular/core/testing';

import { AryanetNg2KendoService } from './aryanet-ng2-kendo.service';

describe('AryanetNg2KendoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AryanetNg2KendoService]
    });
  });

  it('should be created', inject([AryanetNg2KendoService], (service: AryanetNg2KendoService) => {
    expect(service).toBeTruthy();
  }));
});

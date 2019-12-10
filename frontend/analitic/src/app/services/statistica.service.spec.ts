import { TestBed } from '@angular/core/testing';

import { StatisticaService } from './statistica.service';

describe('StatisticaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticaService = TestBed.get(StatisticaService);
    expect(service).toBeTruthy();
  });
});

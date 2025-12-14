import { TestBed } from '@angular/core/testing';

import { ListaGuardados } from './lista-guardados';

describe('ListaGuardados', () => {
  let service: ListaGuardados;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaGuardados);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAnimes } from './detalles-animes';

describe('DetallesAnimes', () => {
  let component: DetallesAnimes;
  let fixture: ComponentFixture<DetallesAnimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesAnimes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesAnimes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

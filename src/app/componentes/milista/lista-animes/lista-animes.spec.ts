import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnimes } from './lista-animes';

describe('ListaAnimes', () => {
  let component: ListaAnimes;
  let fixture: ComponentFixture<ListaAnimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAnimes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAnimes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

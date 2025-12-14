import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosListaAnime } from './datos-lista-anime';

describe('DatosListaAnime', () => {
  let component: DatosListaAnime;
  let fixture: ComponentFixture<DatosListaAnime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosListaAnime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosListaAnime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

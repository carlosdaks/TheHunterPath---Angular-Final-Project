import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDestacado } from './anime-destacado';

describe('AnimeDestacado', () => {
  let component: AnimeDestacado;
  let fixture: ComponentFixture<AnimeDestacado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDestacado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDestacado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

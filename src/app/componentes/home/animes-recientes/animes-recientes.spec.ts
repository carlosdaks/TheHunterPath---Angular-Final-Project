import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesRecientes } from './animes-recientes';

describe('AnimesRecientes', () => {
  let component: AnimesRecientes;
  let fixture: ComponentFixture<AnimesRecientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimesRecientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimesRecientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

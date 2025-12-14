import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Milista } from './milista';

describe('Milista', () => {
  let component: Milista;
  let fixture: ComponentFixture<Milista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Milista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Milista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

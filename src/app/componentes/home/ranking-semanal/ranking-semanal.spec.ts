import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingSemanal } from './ranking-semanal';

describe('RankingSemanal', () => {
  let component: RankingSemanal;
  let fixture: ComponentFixture<RankingSemanal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingSemanal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingSemanal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

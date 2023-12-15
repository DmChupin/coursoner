import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningChartComponent } from './learning-chart.component';

describe('LearningChartComponent', () => {
  let component: LearningChartComponent;
  let fixture: ComponentFixture<LearningChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

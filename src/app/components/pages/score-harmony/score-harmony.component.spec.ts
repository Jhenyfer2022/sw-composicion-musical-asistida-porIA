import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreHarmonyComponent } from './score-harmony.component';

describe('ScoreHarmonyComponent', () => {
  let component: ScoreHarmonyComponent;
  let fixture: ComponentFixture<ScoreHarmonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreHarmonyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreHarmonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

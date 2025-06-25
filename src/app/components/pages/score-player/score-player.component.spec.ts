import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePlayerComponent } from './score-player.component';

describe('ScorePlayerComponent', () => {
  let component: ScorePlayerComponent;
  let fixture: ComponentFixture<ScorePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorePlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

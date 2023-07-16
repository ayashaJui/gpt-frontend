import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundAnimationComponent } from './background-animation.component';

describe('BackgroundAnimationComponent', () => {
  let component: BackgroundAnimationComponent;
  let fixture: ComponentFixture<BackgroundAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundAnimationComponent]
    });
    fixture = TestBed.createComponent(BackgroundAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

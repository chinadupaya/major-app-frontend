import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReview2Component } from './post-review2.component';

describe('PostReview2Component', () => {
  let component: PostReview2Component;
  let fixture: ComponentFixture<PostReview2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostReview2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

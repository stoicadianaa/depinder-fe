import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyRecursiveComponent } from './dependency-recursive.component';

describe('DependencyRecursiveComponent', () => {
  let component: DependencyRecursiveComponent;
  let fixture: ComponentFixture<DependencyRecursiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependencyRecursiveComponent]
    });
    fixture = TestBed.createComponent(DependencyRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

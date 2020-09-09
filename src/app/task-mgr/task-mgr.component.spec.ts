import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMgrComponent } from './task-mgr.component';

describe('TaskMgrComponent', () => {
  let component: TaskMgrComponent;
  let fixture: ComponentFixture<TaskMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

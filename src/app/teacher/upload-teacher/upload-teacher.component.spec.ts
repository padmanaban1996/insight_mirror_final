import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTeacherComponent } from './upload-teacher.component';

describe('UploadTeacherComponent', () => {
  let component: UploadTeacherComponent;
  let fixture: ComponentFixture<UploadTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

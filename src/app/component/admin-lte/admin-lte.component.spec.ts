import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLteComponent } from './admin-lte.component';

describe('AdminLteComponent', () => {
  let component: AdminLteComponent;
  let fixture: ComponentFixture<AdminLteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

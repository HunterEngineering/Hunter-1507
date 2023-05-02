import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserProjectsComponent } from './admin-user-projects.component';

describe('AdminUserProjectsComponent', () => {
  let component: AdminUserProjectsComponent;
  let fixture: ComponentFixture<AdminUserProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

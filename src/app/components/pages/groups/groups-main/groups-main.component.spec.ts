import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsMainComponent } from './groups-main.component';

describe('GroupsMainComponent', () => {
  let component: GroupsMainComponent;
  let fixture: ComponentFixture<GroupsMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsMainComponent]
    });
    fixture = TestBed.createComponent(GroupsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

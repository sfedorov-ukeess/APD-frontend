import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByInvitationComponent } from './by-invitation.component';

describe('ByInvitationComponent', () => {
  let component: ByInvitationComponent;
  let fixture: ComponentFixture<ByInvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ByInvitationComponent]
    });
    fixture = TestBed.createComponent(ByInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

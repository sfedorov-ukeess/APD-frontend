import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVerifyComponent } from './data-verify.component';

describe('CodeVerifyComponent', () => {
  let component: DataVerifyComponent;
  let fixture: ComponentFixture<DataVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataVerifyComponent]
    });
    fixture = TestBed.createComponent(DataVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

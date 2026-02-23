import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCreationComponent } from './pin-creation.component';

describe('PinCreationComponent', () => {
  let component: PinCreationComponent;
  let fixture: ComponentFixture<PinCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PinCreationComponent]
    });
    fixture = TestBed.createComponent(PinCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

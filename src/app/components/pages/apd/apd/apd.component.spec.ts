import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApdComponent } from './apd.component';

describe('ApdComponent', () => {
  let component: ApdComponent;
  let fixture: ComponentFixture<ApdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApdComponent]
    });
    fixture = TestBed.createComponent(ApdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApdBlockComponent } from './apd-block.component';

describe('ApdBlockComponent', () => {
  let component: ApdBlockComponent;
  let fixture: ComponentFixture<ApdBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApdBlockComponent]
    });
    fixture = TestBed.createComponent(ApdBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

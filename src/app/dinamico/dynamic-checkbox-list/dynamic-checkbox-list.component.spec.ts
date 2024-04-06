import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCheckboxListComponent } from './dynamic-checkbox-list.component';

describe('DynamicCheckboxListComponent', () => {
  let component: DynamicCheckboxListComponent;
  let fixture: ComponentFixture<DynamicCheckboxListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicCheckboxListComponent]
    });
    fixture = TestBed.createComponent(DynamicCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

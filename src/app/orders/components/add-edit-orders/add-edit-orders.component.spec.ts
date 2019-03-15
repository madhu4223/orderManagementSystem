import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrdersComponent } from './add-edit-orders.component';

describe('AddEditOrdersComponent', () => {
  let component: AddEditOrdersComponent;
  let fixture: ComponentFixture<AddEditOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

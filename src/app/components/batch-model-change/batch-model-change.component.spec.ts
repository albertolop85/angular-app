import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchModelChangeComponent } from './batch-model-change.component';

describe('BatchModelChangeComponent', () => {
  let component: BatchModelChangeComponent;
  let fixture: ComponentFixture<BatchModelChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchModelChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchModelChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

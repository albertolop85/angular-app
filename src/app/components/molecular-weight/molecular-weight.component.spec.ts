import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolecularWeightComponent } from './molecular-weight.component';

describe('MolecularWeightComponent', () => {
  let component: MolecularWeightComponent;
  let fixture: ComponentFixture<MolecularWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MolecularWeightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MolecularWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

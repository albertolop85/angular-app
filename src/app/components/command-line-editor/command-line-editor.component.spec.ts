import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandLineEditorComponent } from './command-line-editor.component';

describe('CommandLineEditorComponent', () => {
  let component: CommandLineEditorComponent;
  let fixture: ComponentFixture<CommandLineEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandLineEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandLineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

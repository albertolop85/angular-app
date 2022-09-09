import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-line-editor',
  templateUrl: './command-line-editor.component.html',
  styleUrls: ['./command-line-editor.component.css']
})
export class CommandLineEditorComponent implements OnInit {

  constructor() {
    // @ts-ignore
    if (window.Cypress) {
      // @ts-ignore
      window.CommandLineEditorComponent = this
    }
  }

  ngOnInit(): void {
  }

  applyCommand() {
    this.commandHistory.push(this.command)
    this.command = ""
    this.updateStatus("Command applied successfully")
  }

  undoCommand() {
    let cmd = this.commandHistory.pop()
    if (cmd) {
      this.undoCommandHistory.push(cmd)
      this.updateStatus("Undo applied successfully")
    } else {
      this.error = "There are no more commands to undo"
    }
  }

  redoCommand() {
    let cmd = this.undoCommandHistory.pop()
    if (cmd) {
      this.commandHistory.push(cmd)
      this.updateStatus("Redo applied successfully")
    } else {
      this.error = "There are no more commands to redo"
    }
  }

  private updateStatus(status: string) {
    this.status = status
    this.error = ""
    this.setImagePath();
  }

  private setImagePath() {
    if (this.commandHistory.length > 0) {
      this.imagePath = this.getImagePath(this.commandHistory[this.commandHistory.length-1])
    } else {
      this.imagePath = ""
    }
  }

  private getImagePath(name: string): string {
    if (name) {
      return "assets/images/mock/" + name.trim().replaceAll(" ", "_") + ".PNG"
    }
    return ""
  }

  public command = ""
  public commandHistory: Array<string> = []
  public undoCommandHistory: Array<string> = []
  public imagePath = ""

  public status = ""
  public error = ""
}

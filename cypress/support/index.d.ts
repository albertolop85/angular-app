/// <reference types="cypress" />

declare namespace Cypress {

  interface Chainable<Subject = any> {
      /**
       * Custom command to execute an array of commands sequentially
       */
      goToChainCommands(commands: Array<string>): Chainable<null>;

       /**
       * Custom command to get CommandLineEditorComponent
       */
      getCommandLineEditor(): Chainable<any>;

      /**
       * Custom command to apply a given command
       */
       applyCommand(cmd: string): Chainable<any>;
  }
}

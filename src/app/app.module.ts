import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CommandLineEditorComponent } from './components/command-line-editor/command-line-editor.component';
import { BatchModelChangeComponent } from './components/batch-model-change/batch-model-change.component';
import { MolecularWeightComponent } from './components/molecular-weight/molecular-weight.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'commandLineEditor', component: CommandLineEditorComponent },
  { path: 'batchModelChange', component: BatchModelChangeComponent },
  { path: 'molecularWeight', component: MolecularWeightComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommandLineEditorComponent,
    BatchModelChangeComponent,
    MolecularWeightComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  entryComponents: [AppComponent]
  //bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {

  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(AppComponent)
    // @ts-ignore
    if (window.Cypress) {
      // @ts-ignore
      window.appRef = appRef
    }
  }
}

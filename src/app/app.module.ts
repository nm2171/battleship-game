import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { FirstStagePage } from './pages/first-stage/first-stage.page';
import { GridComponent } from './components/grid/grid.component';
import { GamePage } from './pages/game/game.page';
import { StartPage } from './pages/start/start.page';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FirstStagePage,
    GridComponent,
    GamePage,
    StartPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

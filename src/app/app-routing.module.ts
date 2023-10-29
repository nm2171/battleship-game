import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePage } from './pages/game/game.page';
import { StartPage } from './pages/start/start.page';
import { FirstStagePage } from './pages/first-stage/first-stage.page';

const routes: Routes = [
  { path: '', component: StartPage },
  { path: 'first-stage', component: FirstStagePage },
  { path: 'game', component: GamePage }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

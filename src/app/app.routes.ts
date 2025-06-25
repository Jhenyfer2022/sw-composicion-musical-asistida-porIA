import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScoreListComponent } from './components/pages/score-list/score-list.component';
import { ScoreEditorComponent } from './components/pages/score-editor/score-editor.component';
import { ScoreHarmonyComponent } from './components/pages/score-harmony/score-harmony.component';
import { ScorePlayerComponent } from './components/pages/score-player/score-player.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'scores', component: ScoreListComponent },
  { path: 'editor', component: ScoreEditorComponent },
  { path: 'ai/harmony', component: ScoreHarmonyComponent },
  { path: 'player', component: ScorePlayerComponent },
  { path: '**', redirectTo: 'login' }             
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainPageComponent} from "./modules/game/pages/main-page/main-page.component";
import { JoinGamePageComponent } from "./pages/join-game-page/join-game-page.component";
import { CreateGamePageComponent } from "./pages/create-game-page/create-game-page.component";
import { GameWheelPageComponent } from "./pages/game-wheel-page/game-wheel-page.component";


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'join',
    component: JoinGamePageComponent
  },
  {
    path: 'create',
    component: CreateGamePageComponent
  },
  {
    path: 'game',
    component: GameWheelPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainPageComponent} from "./modules/game/pages/main-page/main-page.component";
import { JoinGamePageComponent } from "./modules/game/pages/join-game-page/join-game-page.component";
import { CreateGamePageComponent } from "./modules/game/pages/create-game-page/create-game-page.component";
import { GameWheelPageComponent } from "./modules/game/pages/game-wheel-page/game-wheel-page.component";
import { WheelComponent } from "./modules/game/wheel/wheel.component";


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
    path: 'wheel', // for testing
    component: WheelComponent 
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

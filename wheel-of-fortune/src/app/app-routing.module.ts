import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainPageComponent } from "./modules/game/pages/main-page/main-page.component";
import { JoinGamePageComponent } from "./modules/game/pages/join-game-page/join-game-page.component";
import { CreateGamePageComponent } from "./modules/game/pages/create-game-page/create-game-page.component";
import { GameWheelPageComponent } from "./modules/game/pages/game-wheel-page/game-wheel-page.component";
import { GameDataResolverResolver } from "./modules/game/services/resolvers/game-data-resolver.resolver";
import { WheelComponent } from "./modules/game/wheel/wheel.component";
import { VacuumPageComponent } from "./modules/game/pages/vacuum-page/vacuum-page.component";
import { UserPageComponent } from "./modules/game/pages/user-page/user-page.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: 'home',
    data: { breadcrumb: { alias: 'home1' } },
    component: VacuumPageComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
        data: { breadcrumb: { alias: 'home' } },
      },
      {
        path: 'join',
        component: JoinGamePageComponent,
        data: { breadcrumb: { alias: 'join' } },
      },
      {
        path: 'create',
        component: CreateGamePageComponent,
        data: { breadcrumb: { alias: 'create' } },
      },
      {
        path: 'game/:gameId',
        component: GameWheelPageComponent,
        resolve: { game: GameDataResolverResolver },
        data: { breadcrumb: { alias: 'game' } },
      },
      {
        path: 'wheel', // for testing
        component: WheelComponent
      },
      {
        path: 'user',
        component: UserPageComponent,
        data: { breadcrumb: { alias: 'userProfile' } },
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './modules/core/header/header.component';
import {FooterComponent} from './modules/core/footer/footer.component';
import {RouterOutlet} from "@angular/router";
import {MainPageComponent} from './modules/game/pages/main-page/main-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {GameWheelPageComponent} from './modules/game/pages/game-wheel-page/game-wheel-page.component';
import {JoinGamePageComponent} from './modules/game/pages/join-game-page/join-game-page.component';
import {CreateGamePageComponent} from './modules/game/pages/create-game-page/create-game-page.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "./modules/shared/shared.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {MatDividerModule} from "@angular/material/divider";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {NgxsModule} from "@ngxs/store";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatGridList, MatGridListModule} from '@angular/material/grid-list';
import {AngularFirestoreModule, SETTINGS as FIRESTORE_SETTINGS} from "@angular/fire/compat/firestore";
import {GameState} from "./modules/game/stores/game/game.state";
import {AuthState} from "./modules/core/stores/auth/auth.state";
import {MatMenuModule} from "@angular/material/menu";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {JoinGameState} from "./modules/game/stores/join-game/join-game.state";
import { WheelComponent } from './modules/game/wheel/wheel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    GameWheelPageComponent,
    JoinGamePageComponent,
    CreateGamePageComponent,
    WheelComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatDividerModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxsModule.forRoot([
      GameState,
      AuthState,
      JoinGameState
    ], {developmentMode: !environment.production,}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({disabled: environment.production,}),
    NgxsRouterPluginModule.forRoot(),
    MatMenuModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    {
      provide: FIRESTORE_SETTINGS,
      useValue: environment.emulator ? {
        host: 'localhost:7200',
        ssl: false
      } : undefined
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

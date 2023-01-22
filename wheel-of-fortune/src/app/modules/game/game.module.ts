import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameResultComponent } from './pages/game-result/game-result.component';
import { WheelComponent } from './wheel/wheel.component';



@NgModule({
  declarations: [
    GameResultComponent,
    WheelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }

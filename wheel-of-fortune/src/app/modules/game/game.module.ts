import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameResultComponent} from './pages/game-result/game-result.component';
import {WheelComponent} from './wheel/wheel.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    GameResultComponent,
    WheelComponent
  ],
  exports: [
    WheelComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class GameModule {
}

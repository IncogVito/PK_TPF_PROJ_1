import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { TilePrimaryComponent } from './components/tile-primary/tile-primary.component';
import { ProfileAvatarComponent } from './components/profile-avatar/profile-avatar.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    ButtonPrimaryComponent,
    TilePrimaryComponent,
    ProfileAvatarComponent
  ],
  exports: [
    TilePrimaryComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModule { }

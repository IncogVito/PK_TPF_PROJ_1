import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { TilePrimaryComponent } from './components/tile-primary/tile-primary.component';
import { ProfileAvatarComponent } from './components/profile-avatar/profile-avatar.component';



@NgModule({
  declarations: [
    ButtonPrimaryComponent,
    TilePrimaryComponent,
    ProfileAvatarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

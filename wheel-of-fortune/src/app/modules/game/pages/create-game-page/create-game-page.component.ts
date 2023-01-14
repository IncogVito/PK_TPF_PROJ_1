import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-game-page',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.scss']
})
export class CreateGamePageComponent {

  public createFameForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl(1, Validators.required),
      singleGameTime: new FormControl(5)
    }
  )

}


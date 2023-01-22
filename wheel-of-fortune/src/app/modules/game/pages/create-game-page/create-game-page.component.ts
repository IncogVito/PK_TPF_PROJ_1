import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {GameActions} from "../../stores/game/game.actions";
import CreateNewGame = GameActions.CreateNewGame;
import {GameFormModel} from "../../model/game-form.model";

@Component({
  selector: 'app-create-game-page',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.scss']
})
export class CreateGamePageComponent {

  public createGameForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      type: new FormControl('single', Validators.required),
      singleGameTime: new FormControl(5)
    }
  )


  constructor(private readonly store: Store) {
  }

  createGame() {
    if (this.createGameForm.valid) {
      this.store.dispatch(new CreateNewGame(this.createGameForm.getRawValue() as any as GameFormModel));
    }
  }
}


import {GameFormModel} from "../../model/game-form.model";

export namespace GameActions {
  export class CreateNewGame {
    static readonly type = '[Game] CreateNewGame';
    constructor(public payload: GameFormModel) {
    }
  }
}

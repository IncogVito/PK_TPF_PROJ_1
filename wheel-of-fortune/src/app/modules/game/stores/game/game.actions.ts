import {GameFormModel, GameSearchModel} from "../../model/game-form.model";
import {GameModel} from "../../model/game.model";
import {JoinUserToGamePayload, SingleDrawResult, UpdateParticipantsPayload} from "./game.actions-payload";

export namespace GameActions {
  export class CreateNewGame {
    static readonly type = '[Game] CreateNewGame';

    constructor(public payload: GameFormModel) {
    }
  }

  export class LoadGameById {
    static readonly type = '[Game] LoadGameById';

    constructor(public payload: GameSearchModel) {
    }
  }

  export class UpdateGame {
    static readonly type = '[Game] UpdateGame';

    constructor(public payload: GameModel) {
    }
  }

  export class UpdateGameWithPropagation {
    static readonly type = '[Game] UpdateGameWithPropagation';

    constructor(public payload: Partial<GameModel>) {
    }
  }

  export class UpdateParticipants {
    static readonly type = '[Game] UpdateParticipants';

    constructor(public payload: UpdateParticipantsPayload) {
    }
  }

  export class UpdateParticipantsInCurrentGameWithPropagation {
    static readonly type = '[Game] UpdateParticipantsInCurrentGameWithPropagation';

    constructor(public payload: UpdateParticipantsPayload) {
    }
  }

  export class AddToHistory {
    static readonly type = '[Game] AddToHistory';

    constructor(public payload: SingleDrawResult) {
    }
  }

  export class JoinUserToGame {
    static readonly type = '[Game] Join user to game';

    constructor(public payload: JoinUserToGamePayload) {
    }
  }
}

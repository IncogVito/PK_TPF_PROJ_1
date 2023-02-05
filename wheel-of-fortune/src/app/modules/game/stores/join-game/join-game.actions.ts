import {JoinGameRequestPayload} from "./join-game.actions-payload";

export namespace JoinGameActions {
  export class JoinGameRequest {
    static readonly type = '[JoinGame] JoinGameRequest';
    constructor(public payload: JoinGameRequestPayload) {
    }
  }

  export class ResetJoinGameRequest {
    static readonly type = '[JoinGame] ResetJoinGameRequest';
  }
}

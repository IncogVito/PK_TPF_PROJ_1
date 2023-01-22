import {GameModel} from "../../model/game.model";

export interface GameStateModel {
  started: boolean;
  finished: boolean;
  game: GameModel;
}

export const getDefaultGameState: GameStateModel = {
  started: false,
  finished: false,
  game: undefined!
}

import {GameModel} from "../../model/game.model";

export interface GameStateModel {
  started: boolean;
  finished: boolean;
  fetched: boolean;
  game: GameModel;
}

export const getDefaultGameState: GameStateModel = {
  started: false,
  fetched: false,
  finished: false,
  game: undefined!
}

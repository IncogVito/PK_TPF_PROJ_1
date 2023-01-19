import {Injectable} from "@angular/core";
import {Action, State, StateContext, Store} from "@ngxs/store";
import {GameStateModel, getDefaultGameState} from "./game.state-model";
import {EMPTY, Observable} from "rxjs";
import {GameActions} from "./game.actions";

@State<GameStateModel>({
  name: 'game',
  defaults: getDefaultGameState
})
@Injectable()
export class GameState {

  public gameState$: Observable<GameStateModel> = EMPTY;

  constructor(private readonly store: Store) {
    this.gameState$ = store.select(state => state['game']);
  }


  @Action(GameActions.CreateNewGame)
  createGame(ctx: StateContext<GameStateModel>, action: GameActions.CreateNewGame) {
    const payload = action.payload;
    ctx.setState({
      finished: false,
      started: false,
      game: {
        ...action.payload,
        ownerId: 'sss',// TODO,
        creationDate: new Date(),
        participants: [],
        joiningCode: '',
        currentQuestion: '',
      }
    })
  }
}

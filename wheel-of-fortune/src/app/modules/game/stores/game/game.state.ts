import {Injectable} from "@angular/core";
import {Action, State, StateContext, Store} from "@ngxs/store";
import {GameStateModel, getDefaultGameState} from "./game.state-model";
import {EMPTY, Observable, tap} from "rxjs";
import {GameActions} from "./game.actions";
import {GameFirebaseService} from "../../services/game-firebase.service";

@State<GameStateModel>({
  name: 'game',
  defaults: getDefaultGameState
})
@Injectable()
export class GameState {

  public gameState$: Observable<GameStateModel> = EMPTY;

  constructor(private readonly store: Store,
              private readonly gameFirebaseService: GameFirebaseService) {
    this.gameState$ = store.select(state => state['game']);
  }

  @Action(GameActions.CreateNewGame)
  createGame(ctx: StateContext<GameStateModel>, action: GameActions.CreateNewGame) {
    return this.gameFirebaseService.createGame(action.payload)
      .pipe(tap(() =>
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
      ));
  }
}

import {Injectable} from "@angular/core";
import {Action, State, StateContext, Store} from "@ngxs/store";
import {GameStateModel, getDefaultGameState} from "./game.state-model";
import {EMPTY, filter, map, Observable, switchMap, take, tap} from "rxjs";
import {GameActions} from "./game.actions";
import {GameFirebaseService} from "../../services/game-firebase.service";
import {Navigate} from "@ngxs/router-plugin";
import {AuthStateModel} from "../../../core/stores/auth/auth.state-model";
import {GameUtil} from "../../services/util/game.util";

@State<GameStateModel>({
  name: 'game',
  defaults: getDefaultGameState
})
@Injectable()
export class GameState {

  public gameState$: Observable<GameStateModel> = EMPTY;
  public authState$: Observable<AuthStateModel> = EMPTY;

  constructor(private readonly store: Store,
              private readonly gameFirebaseService: GameFirebaseService) {
    this.gameState$ = store.select(state => state['game']);
    this.authState$ = store.select(state => state['auth']);
  }

  @Action(GameActions.CreateNewGame)
  createGame(ctx: StateContext<GameStateModel>, action: GameActions.CreateNewGame) {
    return this.authState$.pipe(
      take(1),
      filter(authState => authState.loggedIn),
      map(authState => GameUtil.combineGame(action.payload, authState)),
      switchMap(model => this.gameFirebaseService.createGame(model)),
      tap(fullGame =>
        ctx.setState({
          finished: false,
          fetched: true,
          started: true,
          game: fullGame
        })
      ),
      tap(fullGame => ctx.dispatch(new Navigate(['game', fullGame.id])))
    );
  }

  @Action(GameActions.LoadGameById)
  loadGameById(ctx: StateContext<GameStateModel>, action: GameActions.LoadGameById) {
    if (ctx.getState().fetched && ctx.getState().game && ctx.getState().game.id === action.payload.gameId) {
      return;
    }
    ctx.patchState({
      fetched: false
    })
    return this.gameFirebaseService.loadGameById(action.payload.gameId!)
      .pipe(
        tap(fullGame => console.log(fullGame)),
        tap(res => ctx.patchState({
          fetched: true,
          game: res
        }))
      )
  }

  @Action(GameActions.UpdateGame)
  updateGame(ctx: StateContext<GameStateModel>, action: GameActions.UpdateGame) {
    if (!ctx.getState().fetched || ctx.getState().game.id !== action.payload.id) {
      throw new Error("Illegal state exception - different ids between current and updated");
    }
    ctx.patchState({
      game: action.payload
    })
  }

  @Action(GameActions.UpdateParticipants)
  updateParticipants(ctx: StateContext<GameStateModel>, action: GameActions.UpdateParticipants) {
    if (!ctx.getState().fetched || ctx.getState().game.id !== action.payload.id) {
      throw new Error("Illegal state exception - different ids between current and updated");
    }
    ctx.patchState({
      game: {
        ...ctx.getState().game,
        participants: action.payload.participants
      }
    })
  }


  @Action(GameActions.JoinUserToGame)
  joinUserToGame(ctx: StateContext<GameStateModel>, action: GameActions.JoinUserToGame) {

    return this.gameState$.pipe(
      filter(state => state.fetched),
      switchMap(gameState => {
        const userUid = action.payload.userUid;
        const participants = gameState.game.participants;
        const alreadyIncluded = participants.some(singleParticipant => userUid === singleParticipant.id);

        if (alreadyIncluded) {
          console.log(`User with uid: ${userUid} already in the game`);
          return EMPTY;
        }

        return this.gameFirebaseService.addSingleParticipant(
          gameState.game.id,
          GameUtil.toParticipantFromPayload(action.payload)
        )
          .pipe(tap(() => console.log('DODAŁEM')));
      })
    )
  }
}

import {Injectable} from "@angular/core";
import {Action, State, StateContext, Store} from "@ngxs/store";
import {GameStateModel, getDefaultGameState} from "./game.state-model";
import {EMPTY, filter, map, Observable, switchMap, take, tap} from "rxjs";
import {GameActions} from "./game.actions";
import {GameFirebaseService} from "../../services/game-firebase.service";
import {Navigate} from "@ngxs/router-plugin";
import {AuthStateModel} from "../../../core/stores/auth/auth.state-model";
import {GameUtil} from "../../services/util/game.util";
import {ArrayUtilService} from "../../../shared/service/util/array-util.service";

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
      tap(fullGame => ctx.dispatch(new Navigate(['home', 'game', fullGame.id])))
    );
  }

  @Action(GameActions.LoadGameById)
  loadGameById(ctx: StateContext<GameStateModel>, action: GameActions.LoadGameById) {
    if (ctx.getState().fetched && ctx.getState().game && ctx.getState().game.id === action.payload.gameId) {
      return EMPTY;
    }
    ctx.patchState({
      fetched: false
    })
    return this.gameFirebaseService.loadGameById(action.payload.gameId!)
      .pipe(
        tap(fullGame => console.log(fullGame)),
        tap(res => ctx.patchState({
          fetched: true,
          game: {...res, participantsInCurrentGame: res.participants}
        }))
      )
  }

  @Action(GameActions.UpdateGame)
  updateGame(ctx: StateContext<GameStateModel>, action: GameActions.UpdateGame) {
    if (!ctx.getState().fetched || ctx.getState().game.id !== action.payload.id) {
      throw new Error("Illegal state exception - different ids between current and updated");
    }
    const participants = ctx.getState().game?.participants;

    const previousGame = ctx.getState().game;
    ctx.patchState({
      game: {...previousGame, ...action.payload, participants}
    })
  }

  @Action(GameActions.UpdateGameWithPropagation)
  updateGameWithPropagation(ctx: StateContext<GameStateModel>, action: GameActions.UpdateGameWithPropagation) {
    const ownerId = ctx.getState().game?.ownerId;
    const gameId = ctx.getState().game?.id;
    const participants = ctx.getState().game?.participants;

    const fullUpdatedGame = {...ctx.getState().game, ...action.payload, participants};

    if (!ctx.getState().fetched || !gameId || !ownerId) {
      throw new Error("Illegal state exception - not filled data");
    }
    return this.authState$.pipe(
      take(1),
      filter(authState => authState.loggedIn),
      map(authState => authState.loggedUser),
      filter(loggedUser => loggedUser.userUid === ownerId),
      switchMap(() => this.gameFirebaseService.updateGame(gameId, action.payload)),
      take(1),
      tap(() => ctx.patchState({game: fullUpdatedGame}))
    );
  }

  @Action(GameActions.UpdateParticipants)
  updateParticipants(ctx: StateContext<GameStateModel>, action: GameActions.UpdateParticipants) {
    if (!ctx.getState().fetched || ctx.getState().game.id !== action.payload.id) {
      throw new Error("Illegal state exception - different ids between current and updated");
    }
    const updateParticipantsInCurrentGame = ArrayUtilService.isEmpty(ctx.getState().game.participantsInCurrentGame) ||
      ArrayUtilService.lengthOf(ctx.getState().game.participants)
      === ArrayUtilService.lengthOf(ctx.getState().game.participantsInCurrentGame);

    ctx.patchState({
      game: {
        ...ctx.getState().game,
        participants: action.payload.participants,
        participantsInCurrentGame: updateParticipantsInCurrentGame ? action.payload.participants : ctx.getState().game.participantsInCurrentGame
      }
    })
  }


  @Action(GameActions.JoinUserToGame)
  joinUserToGame(ctx: StateContext<GameStateModel>, action: GameActions.JoinUserToGame) {

    return this.gameState$.pipe(
      filter(state => state.fetched),
      tap(gameState => ctx.dispatch(new Navigate(['home', 'game', gameState.game.id]))),
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
      })
    )
  }
}

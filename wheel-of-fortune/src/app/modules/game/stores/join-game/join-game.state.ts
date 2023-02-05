import {Injectable} from "@angular/core";
import {Action, State, StateContext, Store} from "@ngxs/store";
import {EMPTY, filter, map, Observable, switchMap, take, tap} from "rxjs";
import {GameFirebaseService} from "../../services/game-firebase.service";
import {Navigate} from "@ngxs/router-plugin";
import {GameUtil} from "../../services/util/game.util";
import {getDefaultJoinGameState, JoinGameStateModel} from "./join-game.state-model";
import {JoinGameActions} from "./join-game.actions";
import {GameActions} from "../game/game.actions";
import LoadGameById = GameActions.LoadGameById;
import {JoinGameRequestPayload} from "./join-game.actions-payload";
import {AuthStateModel} from "../../../core/stores/auth/auth.state-model";
import {generateUUIDWithMask} from "../../../shared/service/util/uuid.commons";

@State<JoinGameStateModel>({
  name: 'joinGame',
  defaults: getDefaultJoinGameState
})
@Injectable()
export class JoinGameState {

  public joinGameState$: Observable<JoinGameStateModel> = EMPTY;
  public authState$: Observable<AuthStateModel> = EMPTY;

  constructor(private readonly store: Store,
              private readonly gameFirebaseService: GameFirebaseService) {
    this.joinGameState$ = store.select(state => state['joinGame']);
    this.authState$ = store.select(state => state['auth']);
  }

  @Action(JoinGameActions.JoinGameRequest)
  joinGameRequest(ctx: StateContext<JoinGameStateModel>, action: JoinGameActions.JoinGameRequest) {
    ctx.patchState({
      loading: true,
      joiningCode: action.payload.joiningCode
    })

    return this.gameFirebaseService.loadGameByJoiningCode(action.payload.joiningCode)
      .pipe(
        tap(res => {
          if (res && res.creationDate) {
            ctx.patchState({
              loading: false,
              success: true
            })
            this.store.dispatch(new GameActions.LoadGameById({gameId: res.id}));
            this.dispatchJoinGame(action.payload, res.id);
          } else {
            ctx.patchState({
              loading: false,
              success: false,
              messageCode: 'NOT_FOUND'
            })
          }
        })
      )
  }

  private dispatchJoinGame(payload: JoinGameRequestPayload, gameId: string) {
    this.authState$.pipe(take(1))
      .subscribe(authState => {
        if (authState.loggedIn) {
          this.store.dispatch(new GameActions.JoinUserToGame({
            gameId,
            userUid: authState.loggedUser!.userUid,
            imageUrl: authState.loggedUser!.imageUrl,
            username: authState.loggedUser!.username,
            registeredUser: true
          }));
        } else {
          this.store.dispatch(new GameActions.JoinUserToGame({
            gameId,
            userUid: generateUUIDWithMask("ANON_xxxxxxxxxx"),
            imageUrl: "default", // TODO,
            username: payload.username!,
            registeredUser: false
          }));
        }
      })
  }
}

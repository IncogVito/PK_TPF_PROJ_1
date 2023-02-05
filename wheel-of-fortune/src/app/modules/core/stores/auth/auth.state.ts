import {Action, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {EMPTY, map, Observable, tap} from "rxjs";
import {AuthStateModel, getAuthenticationDefaultState} from "./auth.state-model";
import {AuthActions} from "./auth.actions";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {AuthUtilService} from "../../service/auth-util.service";

@State<AuthStateModel>({
  name: 'auth',
  defaults: getAuthenticationDefaultState
})
@Injectable()
export class AuthState {

  public authState$: Observable<AuthStateModel> = EMPTY;

  constructor(private readonly store: Store,
              private readonly afAuth: AngularFireAuth) {
    this.authState$ = store.select(state => state['auth']);
  }

  @Action(AuthActions.FetchUser)
  fetchUser(ctx: StateContext<AuthStateModel>, _: AuthActions.FetchUser) {
    return this.afAuth.authState.pipe(
      map(authData => {
        if (authData) {
          return ctx.dispatch(new AuthActions.UserAuthenticated({
            username: authData.displayName!,
            userUid: authData.uid,
            imageUrl: authData.photoURL!
          }));
        } else {
          return ctx.dispatch(new AuthActions.UserNonAuthenticated())
        }
      })
    );
  }

  @Action(AuthActions.SignInUser)
  signUp(ctx: StateContext<AuthStateModel>, _: AuthActions.SignInUser) {
    const provider = new firebase.auth.GoogleAuthProvider();
    return fromPromise(this.afAuth.signInWithPopup(provider))
      .pipe(
        map(userCredential => AuthUtilService.extractDataToLoggedUser(userCredential)),
        map(loggedUser => ctx.dispatch(new AuthActions.UserAuthenticated(loggedUser))
        )
      );
  }

  @Action(AuthActions.LogOutUser)
  logOut(ctx: StateContext<AuthStateModel>, _: AuthActions.LogOutUser) {
    return fromPromise(this.afAuth.signOut())
      .pipe(
        tap(() => ctx.setState({
          loggedIn: false,
          loggedUser: undefined
        })),
        map(() => ctx.dispatch(new AuthActions.UserNonAuthenticated())));
  }

  @Action(AuthActions.UserAuthenticated)
  userAuthenticated(ctx: StateContext<AuthStateModel>, action: AuthActions.UserAuthenticated) {
    ctx.patchState({
      loggedIn: true,
      loggedUser: action.payload
    })
  }

  @Action(AuthActions.UserNonAuthenticated)
  userNonAuthenticated(ctx: StateContext<AuthStateModel>, action: AuthActions.UserNonAuthenticated) {
    console.log("TU tez wi")
    ctx.setState({
      loggedIn: false,
      loggedUser: undefined
    })
  }
}

import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {filter, map, Observable, take, tap} from 'rxjs';
import {Store} from "@ngxs/store";
import {GameModel} from "../../model/game.model";
import {GameState} from "../../stores/game/game.state";
import {GameActions} from "../../stores/game/game.actions";
import {Navigate} from "@ngxs/router-plugin";

@Injectable({
  providedIn: 'root'
})
export class GameDataResolverResolver implements Resolve<GameModel> {

  constructor(private readonly store: Store,
              private readonly gameState: GameState) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GameModel> {
    const gameId: string = route.params['gameId'];
    this.store.dispatch(new GameActions.LoadGameById({gameId}));

    return this.gameState.gameState$.pipe(
      filter(state => state.fetched),
      take(1),
      tap(state => {
        if (!state.game.creationDate) {
          this.store.dispatch(new Navigate(['']))
        }
      }),
      map(state => state.game)
    );
  }
}

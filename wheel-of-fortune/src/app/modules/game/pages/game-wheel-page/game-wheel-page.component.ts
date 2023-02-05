import {Component, OnInit} from '@angular/core';
import {GameIntegrationService} from "../../services/game-integration.service";
import {ActivatedRoute} from "@angular/router";
import {EMPTY, Observable, take} from "rxjs";
import {GameModel} from "../../model/game.model";
import {GameState} from "../../stores/game/game.state";
import {GameStateModel} from "../../stores/game/game.state-model";

@Component({
  selector: 'app-game-wheel-page',
  templateUrl: './game-wheel-page.component.html',
  styleUrls: ['./game-wheel-page.component.scss'],
  providers: [GameIntegrationService]
})
export class GameWheelPageComponent implements OnInit {

  public gameState$: Observable<GameStateModel> = EMPTY;

  constructor(private readonly gameStateService: GameState,
              private activatedRoute: ActivatedRoute,
              private readonly gameIntegrationService: GameIntegrationService) {
  }

  ngOnInit(): void {
    this.gameState$ = this.gameStateService.gameState$;
    this.listenChanges();
  }

  private listenChanges() {
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(data => {
        const game: GameModel = data['game'];
        this.gameIntegrationService.listenOnGameChanges(game.id);
      });
  }
}

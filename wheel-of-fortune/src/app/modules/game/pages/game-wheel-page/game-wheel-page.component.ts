import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameIntegrationService} from "../../services/game-integration.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, EMPTY, filter, map, Observable, Subject, take, takeUntil} from "rxjs";
import {GameModel, ParticipantModel} from "../../model/game.model";
import {GameState} from "../../stores/game/game.state";
import {GameStateModel} from "../../stores/game/game.state-model";
import {WheelComponent} from "../../wheel/wheel.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GameResultComponent} from "../game-result/game-result.component";
import {ChangeQuestionModalComponent} from "../change-question-modal/change-question-modal.component";
import {Store} from "@ngxs/store";
import {GameActions} from "../../stores/game/game.actions";
import {AuthStateModel} from "../../../core/stores/auth/auth.state-model";
import {AuthState} from "../../../core/stores/auth/auth.state";
import {DrawingInProgressComponent} from "../drawing-in-progress/drawing-in-progress.component";

@Component({
  selector: 'app-game-wheel-page',
  templateUrl: './game-wheel-page.component.html',
  styleUrls: ['./game-wheel-page.component.scss'],
  providers: [GameIntegrationService]
})
export class GameWheelPageComponent implements OnInit, OnDestroy {

  @ViewChild(WheelComponent)
  public wheelComponent: WheelComponent;

  public gameState$: Observable<GameStateModel> = EMPTY;
  public authState$: Observable<AuthStateModel> = EMPTY;
  joiningCode: string = "";
  private ngDestroy$ = new Subject<void>();
  private drawInProgress = false;
  private drawInProgressDialogRef: MatDialogRef<any> | undefined;
  private gameResultDialogRef: MatDialogRef<any> | undefined;

  constructor(private dialog: MatDialog,
              private readonly store: Store,
              private readonly authState: AuthState,
              private activatedRoute: ActivatedRoute,
              private readonly gameStateService: GameState,
              private readonly gameIntegrationService: GameIntegrationService) {
  }

  ngOnInit(): void {
    this.gameState$ = this.gameStateService.gameState$;
    this.authState$ = this.authState.authState$;
    this.listenChanges();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }

  private listenChanges() {
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(data => {
        const game: GameModel = data['game'];
        this.gameIntegrationService.listenOnGameChanges(game.id);
        this.joiningCode = game.joiningCode;

        this.listenNonAdminChanges();
      });
  }

  triggerWheel() {
    console.log(this.wheelComponent);
    if (this.wheelComponent) {
      this.wheelComponent.triggerWheel();
      this.store.dispatch(new GameActions.UpdateGameWithPropagation({drawInProgress: true}));
    }
  }

  onDrawFinished($event: ParticipantModel, question: string) {
    console.log('Draw finished');
    this.store.dispatch(
      new GameActions.UpdateGameWithPropagation({
          drawInProgress: false,
          chosenParticipant: $event
        }
      ));
    this.dialog.open(GameResultComponent, {
      data: {pickedParticipant: $event, question: question}
    });
  }

  openChangeQuestionModal(question: string) {
    this.dialog.open(ChangeQuestionModalComponent, {
      data: {question: question}
    })
      .afterClosed()
      .pipe(take(1))
      .subscribe(question => {
        if (question) {
          this.store.dispatch(new GameActions.UpdateGameWithPropagation({currentQuestion: question}));
        }
      });
  }

  private listenNonAdminChanges() {
    const gameObs$ = this.gameState$.pipe(takeUntil(this.ngDestroy$));
    const authObs$ = this.authState$.pipe(takeUntil(this.ngDestroy$));

    combineLatest([gameObs$, authObs$])
      .pipe(takeUntil(this.ngDestroy$),
        filter(([gameState, authState]) => gameState.game && authState.loggedIn),
        filter(([gameState, authState]) => gameState.game.ownerId !== authState.loggedUser.userUid),
        map(([gameState, _]) => gameState.game)
      ).subscribe(game => {
      if (!this.drawInProgress && game.drawInProgress) {
        if (this.gameResultDialogRef) {
          this.gameResultDialogRef.close();
        }

        this.drawInProgress = true;
        this.drawInProgressDialogRef = this.dialog.open(DrawingInProgressComponent);
      }

      if (this.drawInProgress && !game.drawInProgress) {
        this.drawInProgress = false;
        if (this.drawInProgressDialogRef) {
          this.drawInProgressDialogRef.close();
        }

        this.dialog.open(GameResultComponent, {
          data: {pickedParticipant: game.chosenParticipant, question: game.currentQuestion}
        });
      }
    });
  }
}

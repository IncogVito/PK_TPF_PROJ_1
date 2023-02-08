import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameIntegrationService} from "../../services/game-integration.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, EMPTY, filter, map, Observable, Subject, take, takeUntil} from "rxjs";
import {GameDecisionMode, GameModel, ParticipantModel} from "../../model/game.model";
import {GameState} from "../../stores/game/game.state";
import {GameStateModel} from "../../stores/game/game.state-model";
import {WheelComponent} from "../../wheel/wheel.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GameResultComponent} from "../game-result/game-result.component";
import {ChangeQuestionModalComponent} from "../change-question-modal/change-question-modal.component";
import {BreadcrumbService} from 'xng-breadcrumb';
import {Store} from "@ngxs/store";
import {GameActions} from "../../stores/game/game.actions";
import {AuthStateModel} from "../../../core/stores/auth/auth.state-model";
import {AuthState} from "../../../core/stores/auth/auth.state";
import {DrawingInProgressComponent} from "../drawing-in-progress/drawing-in-progress.component";
import {GameUtil} from "../../services/util/game.util";
import {ArrayUtilService} from "../../../shared/service/util/array-util.service";
import {FinishedGameResultComponent} from "../finished-game-result/finished-game-result.component";

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
              private breadcrumbService: BreadcrumbService,
              private readonly gameIntegrationService: GameIntegrationService) {
  }

  ngOnInit(): void {
    this.gameState$ = this.gameStateService.gameState$
      .pipe(map(state => GameUtil.markParticipantsAsActive(state)));

    this.breadcrumbService.set('@game', 'Losowanie');
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
        this.listenNonAdminGameFinished();
      });
  }

  triggerWheel() {
    if (this.wheelComponent) {
      this.wheelComponent.triggerWheel();
      this.store.dispatch(new GameActions.UpdateGameWithPropagation({drawInProgress: true}));
    }
  }

  onDrawFinished(pickedParticipant: ParticipantModel, question: string, adminMode: boolean, game: GameModel) {
    this.store.dispatch(
      new GameActions.UpdateGameWithPropagation({
          drawInProgress: false,
          chosenParticipant: pickedParticipant
        }
      ));

    this.store.dispatch(new GameActions.AddToHistory({
      gameId: game.id,
      question: game.currentQuestion,
      winnerName: pickedParticipant.name
    }));

    this.dialog.open(GameResultComponent, {
      data: {pickedParticipant: pickedParticipant, question: question, adminMode}
    }).afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        if (GameDecisionMode.ALL === res) {
          this.store.dispatch(new GameActions.UpdateParticipantsInCurrentGameWithPropagation({
            participants: game.participants,
            id: game.id
          }));
        }
        if (GameDecisionMode.WITHOUT_LAST_ONE === res) {
          let currentActivesParticipantsWithoutPicked = ArrayUtilService.emptyIfNull(game.participantsInCurrentGame)
            .filter(single => single.id !== pickedParticipant.id);

          if (ArrayUtilService.isEmpty(currentActivesParticipantsWithoutPicked)) {
            currentActivesParticipantsWithoutPicked = [...game.participants];
          }
          this.store.dispatch(new GameActions.UpdateParticipantsInCurrentGameWithPropagation({
            participants: currentActivesParticipantsWithoutPicked,
            id: game.id
          }));
        }

        if (GameDecisionMode.FINISH === res) {
          this.store.dispatch(new GameActions.UpdateGameWithPropagation({gameFinished: true}));
          this.dialog.open(FinishedGameResultComponent, {data: {gameId: game.id}});
        }
      });
    this.wheelComponent.drawNewWheel()
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
          data: {pickedParticipant: game.chosenParticipant, question: game.currentQuestion, adminMode: false}
        });
      }
    });
  }

  private listenNonAdminGameFinished() {
    const gameObs$ = this.gameState$.pipe(takeUntil(this.ngDestroy$));
    const authObs$ = this.authState$.pipe(takeUntil(this.ngDestroy$));

    combineLatest([gameObs$, authObs$])
      .pipe(takeUntil(this.ngDestroy$),
        filter(([gameState, authState]) => gameState.game && authState.loggedIn),
        filter(([gameState, authState]) => gameState.game.ownerId !== authState.loggedUser.userUid),
        map(([gameState, _]) => gameState.game),
        filter(game => game.gameFinished),
        take(1)
      ).subscribe(game => {
      this.dialog.open(FinishedGameResultComponent, {data: {gameId: game.id}});
    });
  }
}

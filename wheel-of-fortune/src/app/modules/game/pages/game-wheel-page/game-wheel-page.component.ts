import {Component, OnInit, ViewChild} from '@angular/core';
import {GameIntegrationService} from "../../services/game-integration.service";
import {ActivatedRoute} from "@angular/router";
import {EMPTY, Observable, take} from "rxjs";
import {GameModel, ParticipantModel} from "../../model/game.model";
import {GameState} from "../../stores/game/game.state";
import {GameStateModel} from "../../stores/game/game.state-model";
import {WheelComponent} from "../../wheel/wheel.component";
import {MatDialog} from "@angular/material/dialog";
import {GameResultComponent} from "../game-result/game-result.component";
import {ChangeQuestionModalComponent} from "../change-question-modal/change-question-modal.component";
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-game-wheel-page',
  templateUrl: './game-wheel-page.component.html',
  styleUrls: ['./game-wheel-page.component.scss'],
  providers: [GameIntegrationService]
})
export class GameWheelPageComponent implements OnInit {

  @ViewChild(WheelComponent)
  public wheelComponent: WheelComponent;

  public gameState$: Observable<GameStateModel> = EMPTY;
  joiningCode: string = "";

  constructor(private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private readonly gameStateService: GameState,
              private breadcrumbService: BreadcrumbService,
              private readonly gameIntegrationService: GameIntegrationService) {
  }

  ngOnInit(): void {
    this.gameState$ = this.gameStateService.gameState$;
    this.breadcrumbService.set('@game', 'Game');
    this.listenChanges();
  }

  private listenChanges() {
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe(data => {
        const game: GameModel = data['game'];
        this.gameIntegrationService.listenOnGameChanges(game.id);
        this.joiningCode = game.joiningCode;
      });
  }

  triggerWheel() {
    if (this.wheelComponent) {
      this.wheelComponent.triggerWheel();
    }
  }

  onDrawFinished($event: ParticipantModel, question: string) {
    this.dialog.open(GameResultComponent, {
      data: {pickedParticipant: $event, question: question}
    })
    this.wheelComponent.drawNewWheel()
  }

  openChangeQuestionModal(question: string) {
    this.dialog.open(ChangeQuestionModalComponent, {
      data: {question: question}
    })
      .afterClosed()
      .pipe(take(1))
      .subscribe(res => {
        console.log(res)
      });
  }
}

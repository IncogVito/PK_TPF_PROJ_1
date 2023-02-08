import {Component, Inject, OnInit} from '@angular/core';
import {GameFirebaseService} from "../../services/game-firebase.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {EMPTY, Observable} from "rxjs";
import {SingleDrawResult} from "../../stores/game/game.actions-payload";

@Component({
  selector: 'app-finished-game-result',
  templateUrl: './finished-game-result.component.html',
  styleUrls: ['./finished-game-result.component.scss']
})
export class FinishedGameResultComponent implements OnInit {

  public gameResults$: Observable<SingleDrawResult[]> = EMPTY;
  private gameId: string;

  constructor(private readonly store: Store,
              private readonly gameFirebaseService: GameFirebaseService,
              @Inject(MAT_DIALOG_DATA) public readonly data: any,
              public readonly dialogRef: MatDialogRef<any, any>) {
  }

  ngOnInit(): void {
    this.gameId = this.data.gameId;
    this.gameResults$ = this.gameFirebaseService.loadResultDataOfGame(this.gameId);
  }

  close() {
    this.store.dispatch(new Navigate(['home']));
    this.dialogRef.close();
  }
}

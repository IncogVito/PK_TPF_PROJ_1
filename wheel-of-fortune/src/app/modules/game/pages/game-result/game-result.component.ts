import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GameDecisionMode, ParticipantModel} from "../../model/game.model";

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {

  public pickedParticipant: ParticipantModel;
  public question: string = "";
  public adminMode: boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: any,
              public readonly dialogRef: MatDialogRef<any, any>) {
  }

  ngOnInit(): void {
    this.pickedParticipant = this.data.pickedParticipant;
    this.question = this.data.question;
    this.adminMode = this.data.adminMode;
  }

  continueWithAll() {
    this.dialogRef.close(GameDecisionMode.ALL);
  }

  continueWithoutPickedOne() {
    this.dialogRef.close(GameDecisionMode.WITHOUT_LAST_ONE);
  }

  close() {
    this.dialogRef.close();
  }
}

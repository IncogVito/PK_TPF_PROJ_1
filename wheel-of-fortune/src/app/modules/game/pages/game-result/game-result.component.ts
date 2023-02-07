import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ParticipantModel} from "../../model/game.model";

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {

  public pickedParticipant: ParticipantModel;
  public question: string = "";


  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: any,
              public readonly dialogRef: MatDialogRef<any, any>) {
  }

  ngOnInit(): void {
    this.pickedParticipant = this.data.pickedParticipant;
    this.question = this.data.question;
  }

  continueWithAll() {

  }

  continueWithoutPickedOne() {

  }

}

import { Component } from '@angular/core';
import * as WheelCanvas from './winwheel';
import { GameModel, ParticipantModel } from "../model/game.model";
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent {
  theWheel: any
  participants: ParticipantModel[] = [
    {
      name: "Karol",
      id: "0",
      photoUrl: "aaa"
    },
    {
      name: "Johnny",
      id: "1",
      photoUrl: "aaa"
    }
  ];
  wheelClick(){
    console.log("wheel clicked");
    this.theWheel.startAnimation();
  }
  ngAfterContentInit() {
    this.theWheel = new WheelCanvas({
      'canvasId': 'wheelCanvas',
      'textFontSize': '30',
      'numSegments': this.participants.length,
      'lineWidth': 1,
      'segments': participantsToSegments(this.participants),
      'animation': {
        'type': 'spinToStop',
        'duration': 3,
        'spins': 8
      }
    });
  }


}


function participantsToSegments(partcipants: ParticipantModel[]) {
  return partcipants.map(p => { return { "text": p.name, "fillStyle": "#7de6ef" } })
}
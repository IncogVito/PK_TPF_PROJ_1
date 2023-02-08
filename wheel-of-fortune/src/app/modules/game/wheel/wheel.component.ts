import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import * as WheelCanvas from './winwheel';
import {GameModel, ParticipantModel} from "../model/game.model";
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent {

  @ViewChild('winnerSwal')
  public readonly winnerSwal!: SwalComponent;

  @Input()
  public game: GameModel;

  @Output()
  public drawFinished = new EventEmitter<ParticipantModel>();

  width: number = 350
  height: number = 350
  pointerHeight = 30;
  working: boolean = false
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
  winner: ParticipantModel = null

  wheelFinished(winningSegment: any) {

    console.log('SASASSA');
    this.working = false;
    this.winner = this.participants.find(f => f.name == winningSegment.text)
    if (this.winner) {
      this.drawFinished.emit(this.winner);
    }
  }

  resetWheel() {
    this.drawNewWheel()
  }

  removeWinnerAndReset() {
    this.drawNewWheel()
  }

  triggerWheel() {
    // this.drawNewWheel()
    this.theWheel.startAnimation();
  }

  ngOnChanges() {
    this.participants = this.game.participantsInCurrentGame
    this.drawNewWheel()
  }

  drawNewWheel() {
    this.theWheel = new WheelCanvas({
      'canvasId': 'wheelCanvas',
      'textFontSize': '20',
      'numSegments': this.participants.length,
      'outerRadius': this.width / 2,
      'lineWidth': 1,
      'segments': participantsToSegments(this.participants),
      'animation': {
        'type': 'spinToStop',
        'duration': this.game.singleGameTime,
        'spins': this.game.singleGameTime,
        'callbackFinished': (seg) => {
          this.wheelFinished(seg)
        }
      },
      'pins': {
        'number': this.participants.length,
        'fillStyle': 'silver',
        'outerRadius': 10,
      }
    });
    let pointerCanvas = document.getElementById("pointerCanvas") as HTMLCanvasElement;
    drawPointer(pointerCanvas.getContext('2d'), this.width, this.pointerHeight);

  }
}


function drawPointer(c: CanvasRenderingContext2D, width: number, pointerHeight: number) {
  let xStart = width / 2 - (pointerHeight / 2);
  c.save();
  c.lineWidth = 2;
  c.strokeStyle = '#415994';
  c.fillStyle = '#415994';
  c.beginPath();
  c.moveTo(xStart, 10);
  c.lineTo(xStart + pointerHeight, 10);
  c.lineTo(xStart + (pointerHeight / 2), 32);
  c.lineTo(xStart, 10);
  c.stroke();
  c.fill();
  c.restore();
}

function participantsToSegments(partcipants: ParticipantModel[]) {
  let colorArray = ["#bbafff", "#7861a5", "#7354ac", "#e8eaf6",
    '#673ab7', '#382a82', '#7354ac'
  ];
  return partcipants.map((p, idx) => {
    return {"text": p.name, "fillStyle": colorArray[idx % colorArray.length]}
  })
}

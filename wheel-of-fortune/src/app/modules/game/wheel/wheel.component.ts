import { Component, Input, ViewChild } from '@angular/core';
import * as WheelCanvas from './winwheel';
import { GameModel, ParticipantModel } from "../model/game.model";
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent {
  width: number = 450
  height: number = 450
  pointerHeight = 30;
  working: boolean = false
  theWheel: any
  @ViewChild('winnerSwal') public readonly winnerSwal!: SwalComponent;
  @Input() participants: ParticipantModel[] = [
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
    console.log(winningSegment)
    this.working = false;
    console.log("wheel finished")
    this.winner = this.participants.find(f => f.name == winningSegment.text)
    console.log(this.winner)
    // this.winnerSwal.text = `Winner is: ${winningSegment.name}`
    this.winnerSwal.update({"title": `${this.winner.name}`})
    this.winnerSwal.fire().then((p) => this.drawNewWheel())

  }
  resetWheel(){

  }
  wheelClick() {
    console.log("wheel clicked");
    if (this.working) {
      this.theWheel.stopAnimation();
      this.working = false;
    } else {
      this.theWheel.startAnimation();
      this.working = true;
    }
  }
  ngOnChanges() {
    // console.log("participants: ", this.participants)
    this.drawNewWheel()
  }

  drawNewWheel(){
    this.theWheel = new WheelCanvas({
      'canvasId': 'wheelCanvas',
      'textFontSize': '20',
      'numSegments': this.participants.length,
      'outerRadius': this.width / 2,
      'lineWidth': 1,
      'segments': participantsToSegments(this.participants),
      'animation': {
        'type': 'spinToStop',
        'duration': 1,
        'spins': 3,
        'callbackFinished': (seg) =>{this.wheelFinished(seg)}
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
  c.strokeStyle = 'black';
  c.fillStyle = 'black';
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
  let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  return partcipants.map((p, idx) => { return { "text": p.name, "fillStyle": colorArray[idx % colorArray.length] } })
}

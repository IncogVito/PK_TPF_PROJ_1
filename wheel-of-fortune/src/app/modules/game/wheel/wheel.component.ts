import { Component } from '@angular/core';
import * as WheelCanvas  from './winwheel';
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent {
    ngAfterContentInit() {
        console.log(WheelCanvas)
        let theWheel = new WheelCanvas({
                    'canvasId'    : 'drawing_canvas',
                    'numSegments' : 12,
                    'fillStyle'   : '#e7706f',
                    'lineWidth'   : 3
                });
      }
    
}

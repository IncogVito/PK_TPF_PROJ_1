import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tile-primary',
  templateUrl: './tile-primary.component.html',
  styleUrls: ['./tile-primary.component.scss']
})
export class TilePrimaryComponent {

  @Input()
  public icon: string = 'build'

  @Input()
  public text: string = '';

  @Input()
  public disabled: boolean = false;
}

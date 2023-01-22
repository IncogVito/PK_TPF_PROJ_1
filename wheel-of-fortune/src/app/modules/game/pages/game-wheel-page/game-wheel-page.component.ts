import {Component, OnInit} from '@angular/core';
import {GameIntegrationService} from "../../services/game-integration.service";
import { WheelComponent } from '../../wheel/wheel.component'
@Component({
  selector: 'app-game-wheel-page',
  templateUrl: './game-wheel-page.component.html',
  styleUrls: ['./game-wheel-page.component.scss']
})
export class GameWheelPageComponent implements OnInit {

  constructor(private readonly gameIntegrationService: GameIntegrationService) {
  }

  ngOnInit(): void {
    this.gameIntegrationService.listenOnGameChanges("test1");
  }
}

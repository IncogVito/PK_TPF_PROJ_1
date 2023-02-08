import { Component } from '@angular/core';
import { Store } from "@ngxs/store";
import { BreadcrumbService } from 'xng-breadcrumb';
import { JoinGameActions } from "../../stores/join-game/join-game.actions";

@Component({
  selector: 'app-join-game-page',
  templateUrl: './join-game-page.component.html',
  styleUrls: ['./join-game-page.component.scss']
})
export class JoinGamePageComponent {
  codeInputValue = "";

  constructor(private readonly store: Store, private breadcrumbService: BreadcrumbService,
  ) {}

  joinGame() {
    this.store.dispatch(new JoinGameActions.JoinGameRequest({ joiningCode: this.codeInputValue }));
  }

  ngOnInit(){
    this.breadcrumbService.set('@join', 'Dołącz');
  }
}

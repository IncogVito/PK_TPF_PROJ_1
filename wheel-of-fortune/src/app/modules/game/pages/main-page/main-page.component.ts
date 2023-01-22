import {Component} from '@angular/core';
import {EMPTY, map, Observable} from "rxjs";
import {AuthState} from "../../../core/stores/auth/auth.state";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  public userLoggedIn$: Observable<boolean> = EMPTY;

  constructor(private readonly authState: AuthState) {
    this.userLoggedIn$ = this.authState.authState$.pipe(map(state => state.loggedIn));
  }
}

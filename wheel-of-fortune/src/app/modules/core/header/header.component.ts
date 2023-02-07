import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {AuthActions} from "../stores/auth/auth.actions";
import {AuthState} from "../stores/auth/auth.state";
import {AuthStateModel} from "../stores/auth/auth.state-model";
import {Navigate} from "@ngxs/router-plugin";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public authState$: Observable<AuthStateModel> = EMPTY;

  constructor(private readonly store: Store,
              private readonly authState: AuthState) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.FetchUser());
    this.authState$ = this.authState.authState$;
  }

  login() {
    this.store.dispatch(new AuthActions.SignInUser());
  }

  logout() {
    this.store.dispatch(new AuthActions.LogOutUser());
    this.store.dispatch(new Navigate(['']));
  }
}

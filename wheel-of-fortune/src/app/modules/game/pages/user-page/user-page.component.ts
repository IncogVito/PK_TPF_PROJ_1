import {Component, OnInit} from '@angular/core';
import {EMPTY, map, Observable} from "rxjs";
import {AuthState} from "../../../core/stores/auth/auth.state";
import {AuthStateModel, LoggedUser} from 'src/app/modules/core/stores/auth/auth.state-model';
import {AuthActions} from 'src/app/modules/core/stores/auth/auth.actions';
import {Store} from '@ngxs/store';
import {BreadcrumbService} from 'xng-breadcrumb';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public authState$: Observable<AuthStateModel> = EMPTY;

  constructor(private readonly authState: AuthState,
              private readonly store: Store,
              private breadcrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@userProfile', 'Profil');
    this.store.dispatch(new AuthActions.FetchUser());
    this.authState$ = this.authState.authState$;
  }

}

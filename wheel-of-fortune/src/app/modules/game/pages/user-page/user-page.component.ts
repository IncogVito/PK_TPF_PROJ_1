import {Component} from '@angular/core';
import {EMPTY, map, Observable} from "rxjs";
import {AuthState} from "../../../core/stores/auth/auth.state";
import { AuthStateModel, LoggedUser } from 'src/app/modules/core/stores/auth/auth.state-model';
import { AuthActions } from 'src/app/modules/core/stores/auth/auth.actions';
import { Store } from '@ngxs/store';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  public userLoggedIn$: Observable<boolean> = EMPTY;
  public authState$: Observable<AuthStateModel> = EMPTY;
  public dupa: string = null;
  public dupaa: string = null;
  store: any;


  constructor(private readonly authState: AuthState,
              private breadcrumbService: BreadcrumbService,
    ) {
    this.userLoggedIn$ = this.authState.authState$.pipe(map(state => state.loggedIn));
    this.authState.authState$.subscribe(event => this.dupa = event.loggedUser.imageUrl);
    this.authState.authState$.subscribe(event => this.dupaa = event.loggedUser.username);
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@userProfile', 'Profil');
    this.store.dispatch(new AuthActions.FetchUser());
    this.authState$ = this.authState.authState$;
    console.log(this.authState$,"dupa")
  }

}

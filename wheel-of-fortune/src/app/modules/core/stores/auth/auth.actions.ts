import {LoggedUser} from "./auth.state-model";

export namespace AuthActions {
  export class FetchUser {
    static readonly type = '[Auth] FetchUser';

    constructor() {
    }
  }

  export class SignInUser {
    static readonly type = '[Auth] SignInUser';

    constructor() {
    }
  }

  export class UserAuthenticated {
    static readonly type = '[Auth] UserAuthenticated';

    constructor(public payload: LoggedUser) {
    }
  }

  export class UserNonAuthenticated {
    static readonly type = '[Auth] UserNonAuthenticated';

    constructor() {
    }
  }

  export class LogOutUser {
    static readonly type = '[Auth] LogOut';

    constructor() {
    }
  }
}

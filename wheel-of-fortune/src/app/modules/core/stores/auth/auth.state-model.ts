export interface AuthStateModel {
  loggedIn: boolean;
  loggedUser: LoggedUser | undefined;
}

export interface LoggedUser {
  username: string;
  imageUrl: string;
  userUid: string;
}

export const getAuthenticationDefaultState: AuthStateModel = {
  loggedIn: false,
  loggedUser: undefined
}

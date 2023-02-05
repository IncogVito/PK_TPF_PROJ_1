export interface JoinGameStateModel {
  joiningCode: string;
  success: boolean;
  loading: boolean;
  messageCode: string | undefined;
}

export const getDefaultJoinGameState: JoinGameStateModel = {
  joiningCode: undefined!,
  success: false,
  loading: false,
  messageCode: undefined
}

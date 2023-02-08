export interface GameModel {
  id: string,
  name: string;
  ownerId: string;
  type: 'single' | 'multiple'
  creationDate: Date,
  participants: ParticipantModel[],
  participantsInCurrentGame: ParticipantModel[]
  joiningCode: string;
  singleGameTime: number;
  currentQuestion: string;
  gameFinished: boolean;

  drawInProgress: boolean;
  chosenParticipant: ParticipantModel | undefined;
}

export interface ParticipantModel {
  name: string;
  id: string;
  photoUrl: string;
  activeInCurrentGame?: boolean;
}

export enum GameDecisionMode {
  ALL = 'ALL',
  WITHOUT_LAST_ONE = 'WITHOUT_LAST_ONE',
  FINISH = 'FINISH'
}

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

  drawInProgress: boolean;
  chosenParticipant: ParticipantModel | undefined;
}

export interface ParticipantModel {
  name: string;
  id: string;
  photoUrl: string;
}

export enum GameDecisionMode {
  ALL = 'ALL',
  WITHOUT_LAST_ONE = 'WITHOUT_LAST_ONE'
}

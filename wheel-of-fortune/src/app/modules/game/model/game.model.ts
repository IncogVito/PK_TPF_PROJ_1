export interface GameModel {
  ownerId: string;
  type: 'single' | 'multiple'
  creationDate: Date,
  participants: ParticipantModel[],
  joiningCode: string;
  currentQuestion: string;
}

export interface ParticipantModel {
  name: string;
  id: string;
  photoUrl: string;
}

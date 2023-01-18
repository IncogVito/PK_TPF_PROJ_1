export interface GameModel {
  ownerId: string;
  type: 'single' | 'multiple'
  creation_date: Date,
  current_question: string,
  participants: ParticipantModel[],
  joiningCode: string;
}

export interface ParticipantModel {
  name: string;
  id: string;
  photoUrl: string;
}

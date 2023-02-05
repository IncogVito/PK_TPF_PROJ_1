import {ParticipantModel} from "../../model/game.model";

export interface JoinUserToGamePayload {
  gameId: string;
  username: string;
  imageUrl: string;
  userUid: string;

  registeredUser: boolean;
}

export interface UpdateParticipantsPayload {
  id: string;
  participants: ParticipantModel[];
}

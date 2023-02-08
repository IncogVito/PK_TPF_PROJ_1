import {GameFormModel} from "../../model/game-form.model";
import {AuthStateModel, LoggedUser} from "../../../core/stores/auth/auth.state-model";
import {GameModel, ParticipantModel} from "../../model/game.model";
import {generateUUIDWithMask} from "../../../shared/service/util/uuid.commons";
import {ArrayUtilService} from "../../../shared/service/util/array-util.service";
import {StringUtilService} from "../../../shared/service/util/string-util.service";
import {ObjectUtilService} from "../../../shared/service/util/object-utils.service";
import {JoinUserToGamePayload} from "../../stores/game/game.actions-payload";
import {GameState} from "../../stores/game/game.state";
import {GameStateModel} from "../../stores/game/game.state-model";

export class GameUtil {

  public static combineGame(gameFormModel: GameFormModel, authState: AuthStateModel): GameModel {
    const initials = this.getGameInitials(gameFormModel.name);
    const generatedCode = generateUUIDWithMask(initials + '_xxxx').toUpperCase();

    if (!authState.loggedUser) {
      throw new Error("User not authenticated!");
    }

    return {
      id: "",
      name: gameFormModel.name,
      creationDate: new Date(),
      currentQuestion: "Dodaj pytanie", // TODO constants
      joiningCode: generatedCode,
      ownerId: authState.loggedUser.userUid,
      participants: [this.toParticipant(authState.loggedUser)],
      participantsInCurrentGame: [],
      type: gameFormModel.type,
      singleGameTime: Number(gameFormModel.singleGameTime),
      drawInProgress: false,
      chosenParticipant: {} as any,
      gameFinished: false
    }
  }

  public static markParticipantsAsActive(gameState: GameStateModel): GameStateModel {
    if (!gameState.fetched) {
      return gameState;
    }

    const activeParticipantsIds = ArrayUtilService.emptyIfNull(gameState.game.participantsInCurrentGame)
      .map(single => single.id);

    const markedAllParticipants = ArrayUtilService.emptyIfNull(gameState.game.participants)
      .map(single => {
        return {
          ...single,
          activeInCurrentGame: activeParticipantsIds.includes(single.id)
        }
      });

    return {
      ...gameState,
      game: {
        ...gameState.game,
        participants: markedAllParticipants
      }
    }
  }

  public static toParticipant(loggedUser: LoggedUser): ParticipantModel {
    return {
      id: loggedUser.userUid,
      name: loggedUser.username,
      photoUrl: loggedUser.imageUrl
    }
  }

  public static toParticipantFromPayload(joinUserPayload: JoinUserToGamePayload): ParticipantModel {
    return {
      id: joinUserPayload.userUid,
      name: joinUserPayload.username,
      photoUrl: joinUserPayload.imageUrl
    }
  }

  public static getGameInitials(name: string) {

    const names = name.trim().split(' ');
    if (ArrayUtilService.lengthOf(names) >= 2) {
      const firstWord = ArrayUtilService.getFirst<string>(names, '')!.trim();
      const lastWord = ArrayUtilService.getLast<string>(names, '')!.trim();
      let initials = StringUtilService.getFirstChars(firstWord, 1) + StringUtilService.getFirstChars(lastWord, 2);
      if (!ObjectUtilService.isValueDefined(initials)) {
        initials = 'ANON';
      }
      return initials;
    }

    if (ArrayUtilService.isEmpty(names)) {
      return 'ANON';
    }
    return StringUtilService.getFirstChars(name, 3);
  }
}

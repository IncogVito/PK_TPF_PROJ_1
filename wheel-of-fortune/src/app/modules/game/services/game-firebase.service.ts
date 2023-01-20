import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {GameFormModel} from "../model/game-form.model";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class GameFirebaseService {

  private static COLLECTION_NAME = 'games';

  constructor(private readonly firestore: AngularFirestore) {
  }

  public createGame(gameForm: GameFormModel) {
    return fromPromise(
      this.firestore.collection(GameFirebaseService.COLLECTION_NAME).add(gameForm)
    );
  }
}

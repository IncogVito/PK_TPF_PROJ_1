import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {catchError, map, Observable, of, take, tap} from "rxjs";
import {GameModel, ParticipantModel} from "../model/game.model";
import {DocumentReference} from "@angular/fire/compat/firestore/interfaces";
import {ArrayUtilService} from "../../shared/service/util/array-util.service";

@Injectable({
  providedIn: 'root'
})
export class GameFirebaseService {

  public static readonly COLLECTION_NAME = 'games';

  constructor(private readonly firestore: AngularFirestore) {
  }

  public createGame(gameForm: GameModel): Observable<GameModel> {
    return fromPromise(this.firestore.collection(GameFirebaseService.COLLECTION_NAME).add(gameForm))
      .pipe(
        map(res => this.combineWithId<GameModel>(gameForm, res)),
        tap(res => this.addSingleParticipant(res.id, ArrayUtilService.getFirstRequired(res.participants)))
      );
  }

  public updateGame(gameId: string, gameForm: Partial<GameModel>): Observable<void> {
    return fromPromise(this.firestore.collection(GameFirebaseService.COLLECTION_NAME).doc(gameId).update(gameForm))
      .pipe(take(1));
  }

  public loadGameById(gameId: string): Observable<GameModel | undefined> {
    return this.firestore.collection<GameModel>(GameFirebaseService.COLLECTION_NAME)
      .doc(gameId)
      .valueChanges({idField: 'id'})
      .pipe(
        take(1),
        map((elem) => elem),
        catchError(() => of(undefined))
      );
  }

  public loadGameByJoiningCode(joiningCode: string): Observable<GameModel | undefined> {
    return this.firestore.collection<GameModel>(GameFirebaseService.COLLECTION_NAME,
      ref => ref.where('joiningCode', '==', joiningCode)
    ).valueChanges({idField: 'id'})
      .pipe(
        take(1),
        map(elems => ArrayUtilService.getFirst(elems, undefined)),
        map((elem) => elem),
        catchError(() => of(undefined))
      );
  }

  public addSingleParticipant(gameId: string, participantModel: ParticipantModel): Observable<any> {
    console.log(participantModel);
    return fromPromise(this.firestore.collection(GameFirebaseService.COLLECTION_NAME)
      .doc(gameId)
      .collection("participants")
      .add(participantModel)
    );
  }

  private combineWithId<T>(entity: T, dr: DocumentReference<any>): T {
    return {
      ...entity,
      id: dr.id
    }
  }
}

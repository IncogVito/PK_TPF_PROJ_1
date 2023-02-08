import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {catchError, EMPTY, map, Observable, of, switchMap, take, takeUntil, tap} from "rxjs";
import {GameModel, ParticipantModel} from "../model/game.model";
import {DocumentReference} from "@angular/fire/compat/firestore/interfaces";
import {ArrayUtilService} from "../../shared/service/util/array-util.service";
import {GameActions} from "../stores/game/game.actions";
import {SingleDrawResult} from "../stores/game/game.actions-payload";

@Injectable({
  providedIn: 'root'
})
export class GameFirebaseService {

  public static readonly COLLECTION_NAME = 'games';
  public static readonly COLLECTION_HISTORY_NAME = 'games-history';

  constructor(private readonly firestore: AngularFirestore) {
  }

  public createGame(gameForm: GameModel): Observable<GameModel> {
    return fromPromise(this.firestore.collection(GameFirebaseService.COLLECTION_NAME).add(gameForm))
      .pipe(
        map(res => this.combineWithId<GameModel>(gameForm, res)),
        tap(res => this.addSingleParticipant(res.id, ArrayUtilService.getFirstRequired(res.participants))
          .pipe(take(1))
          .subscribe()
        )
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
    const doc = this.firestore.collection<GameModel>(GameFirebaseService.COLLECTION_NAME)
      .doc(gameId)
      .collection<ParticipantModel>('participants');

    return doc.snapshotChanges()
      .pipe(take(1),
        switchMap(snapshots => {
          if (snapshots) {
            const participants = ArrayUtilService.emptyIfNull(snapshots)
              .map(singleSnapshot => singleSnapshot.payload.doc.data()) as ParticipantModel[];
            const alreadyIncluded = participants.some(single => single.id === participantModel.id);
            if (alreadyIncluded) {
              console.warn("ALREADY INCLUDED");
              return of({});
            } else {
              return fromPromise(this.firestore.collection(GameFirebaseService.COLLECTION_NAME)
                .doc(gameId)
                .collection("participants")
                .add(participantModel)
              );
            }

          } else {
            console.error('No such document!');
            return of({});
          }
        })
      );
  }

  public addResultToHistoryData(singleDrawResult: SingleDrawResult): void {
    fromPromise(this.firestore.collection(GameFirebaseService.COLLECTION_HISTORY_NAME).add(singleDrawResult))
      .pipe(take(1))
      .subscribe();
  }

  public loadResultDataOfGame(gameId: string): Observable<SingleDrawResult[]> {
    return this.firestore.collection<SingleDrawResult>(GameFirebaseService.COLLECTION_HISTORY_NAME,
      ref => ref.where('gameId', '==', gameId)
    ).valueChanges()
      .pipe(
        take(1),
        catchError(() => of([]))
      );
  }

  private combineWithId<T>(entity: T, dr: DocumentReference<any>): T {
    return {
      ...entity,
      id: dr.id
    }
  }
}

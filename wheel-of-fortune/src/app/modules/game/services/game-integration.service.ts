import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {GameActions} from "../stores/game/game.actions";
import {GameModel, ParticipantModel} from "../model/game.model";
import {GameFirebaseService} from "./game-firebase.service";
import {ArrayUtilService} from "../../shared/service/util/array-util.service";

@Injectable()
export class GameIntegrationService implements OnDestroy {

  private ngDestroy$ = new Subject<void>();

  constructor(private readonly firestore: AngularFirestore,
              private readonly store: Store) {
  }

  public listenOnGameChanges(gameId: string) {
    console.log(`Listening on game: ${gameId}`)
    const doc = this.firestore.collection<GameModel>(GameFirebaseService.COLLECTION_NAME).doc(gameId);

    doc.snapshotChanges()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(snapshot => {
        if (snapshot.payload.exists) {
          const id = snapshot.payload.id;
          const data = snapshot.payload.data();

          this.store.dispatch(new GameActions.UpdateGame({...data, id}))
        } else {
          console.error('No such document!');
        }
      });
    this.listenOnParticipantsChanges(gameId);
  }

  public listenOnParticipantsChanges(gameId: string) {
    const doc = this.firestore.collection<GameModel>(GameFirebaseService.COLLECTION_NAME)
      .doc(gameId)
      .collection<ParticipantModel>('participants');

    doc.snapshotChanges()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(snapshots => {
        if (snapshots) {
          const participants = ArrayUtilService.emptyIfNull(snapshots)
            .map(singleSnapshot => singleSnapshot.payload.doc.data());
          this.store.dispatch(new GameActions.UpdateParticipants({participants: participants, id: gameId}))
        } else {
          console.error('No such document!');
        }
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}

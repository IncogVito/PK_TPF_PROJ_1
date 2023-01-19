import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameIntegrationService {

  constructor(private readonly firestore: AngularFirestore) {
  }

  public listenOnGameChanges(gameId: string) {
    console.log(`Listening on game: ${gameId}`)
    const doc = this.firestore.collection('games').doc(gameId);

    doc.snapshotChanges()
      .pipe(take(5))
      .subscribe(snapshot => {
        if (snapshot.payload.exists) {
          const data = snapshot.payload.data();
          console.log(data);
        } else {
          console.log('No such document!');
        }
      });
  }
}

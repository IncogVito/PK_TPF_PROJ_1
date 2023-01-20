import {Injectable} from '@angular/core';
import {LoggedUser} from "../stores/auth/auth.state-model";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthUtilService {

  constructor() {
  }

  public static extractDataToLoggedUser(userCredential: UserCredential): LoggedUser {
    let username = '';
    let imageUrl = '';
    let userUid = '';

    if (userCredential.additionalUserInfo && userCredential.additionalUserInfo.profile) {
      if ('name' in userCredential.additionalUserInfo.profile) {
        username = userCredential.additionalUserInfo.profile['name']
      }
      if ('picture' in userCredential.additionalUserInfo.profile) {
        imageUrl = userCredential.additionalUserInfo.profile['picture']
      }
      userUid = userCredential.user?.uid!;
    }
    return {
      userUid,
      username,
      imageUrl
    }
  }

}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

const firebaseConfig = {
  apiKey: "AIzaSyCE1idmzO4u8Ggr4Gf0HBYhN0CoghVNIHo",
  authDomain: "tpf-pk-proj3.firebaseapp.com",
  projectId: "tpf-pk-proj3",
  storageBucket: "tpf-pk-proj3.appspot.com",
  messagingSenderId: "613049040896",
  appId: "1:613049040896:web:5fd27c96c0d0b67d8958e5"
};

export const environment = {
  production: false,
  firebase: firebaseConfig,
  emulator: true
};

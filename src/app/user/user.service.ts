import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  get user() {
    return this.afAuth.authState;
  }
  createUser(email, password, name) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user.updateProfile({ displayName: name });
      });
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  logInUser(name, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(name, password);
  }
}

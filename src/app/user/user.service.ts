import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { take } from "rxjs/operators";

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

  async checkIfClassroomExists(classroomId) {
    let ref = this.afs.collection("classrooms").doc(classroomId.toString());
    let doc = await this.checkIfDocExists(ref);
    return doc;
  }

  private checkIfDocExists(doc: AngularFirestoreDocument) {
    return doc
      .get()
      .pipe(take(1))
      .toPromise();
  }
}

import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { take, switchMap, first } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uid;
  user$;
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

  anonymousSignIn(name, classroom) {
    return this.afAuth.auth
      .signInAnonymously()
      .then(user => {
        //console.log(user.user.uid);
        this.uid = user.user.uid;
        user.user.updateProfile({ displayName: name });
      })
      .then(() => {
        this.addUserToClassroom(name, classroom, this.uid);
      });
  }

  addUserToClassroom(name, classroom, uid) {
    console.log(name, classroom);
    this.afs
      .collection("classrooms")
      .doc(classroom)
      .collection("users")
      .doc(uid)
      .set({ name: name });
  }
}

import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class LoungeService {
  constructor(private afs: AngularFirestore) {}

  getClassMembers(classroomId) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId.toString())
      .collection("users")
      .valueChanges({ idField: "uid" });
  }

  pickPartner(classroomId, myUid, user) {
    const gameId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return this.afs
      .collection("classrooms")
      .doc(classroomId.toString())
      .collection("users")
      .doc(myUid)
      .update({ myPick: { uid: user.uid, name: user.name, gameId: gameId } });
  }

  deletePartnerPick(classroomId, uid) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId.toString())
      .collection("users")
      .doc(uid)
      .update({
        myPick: firebase.firestore.FieldValue.delete()
      });
  }
}

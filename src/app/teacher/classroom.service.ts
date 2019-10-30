import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ClassroomService {
  constructor(private afs: AngularFirestore) {}

  async createClassroom() {
    const id = this.createClassroomId();
    const ref = this.afs.collection("classrooms").doc(id.toString());

    let doc = await this.checkIfDocExists(ref);

    if (doc.exists) return this.createClassroom();
    else ref.set({ startedAt: Date.now() });
    return id;
  }

  private createClassroomId() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  private async checkIfDocExists(doc: AngularFirestoreDocument) {
    return doc
      .get()
      .pipe(take(1))
      .toPromise();
  }
}

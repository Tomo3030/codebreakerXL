import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GameroomService {
  constructor(private afs: AngularFirestore) {}

  sendScoreToDb(gameId, score) {
    return this.afs
      .collection("games")
      .doc(gameId)
      .update({ score: score });
  }
}

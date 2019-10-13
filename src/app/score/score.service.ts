import { AngularFirestore } from "@angular/fire/firestore";
import { gameData } from "./../shared/gameData";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ScoreService {
  constructor(private afs: AngularFirestore) {}

  getScores(scoreboardId) {
    return this.afs
      .collection("scores")
      .doc(scoreboardId)
      .collection("scores")
      .snapshotChanges();
  }

  deleteSingleScore(routeId, scoreId) {
    return this.afs
      .collection("scores")
      .doc(routeId)
      .collection("scores")
      .doc(scoreId)
      .delete();
  }
}

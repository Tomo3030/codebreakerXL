import { AngularFirestore } from "@angular/fire/firestore";
import { gameData } from "../shared/gameData";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ScoreService {
  constructor(private afs: AngularFirestore) {}

  getScores(scoreboardId) {
    return this.afs
      .collection("classrooms")
      .doc(scoreboardId)
      .collection("scores")
      .snapshotChanges();
  }

  deleteSingleScore(classroomId, scoreId) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId.toString())
      .collection("scores")
      .doc(scoreId)
      .delete();
  }
}

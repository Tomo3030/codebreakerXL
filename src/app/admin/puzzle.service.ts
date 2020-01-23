import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class PuzzleService {
  constructor(private db: AngularFirestore) {}

  public savePuzzle(id, tags, difficulty, puzzle) {
    return this.db
      .collection("puzzles")
      .doc(id.toString())
      .set({ puzzle: puzzle, difficuly: difficulty, tags: tags });
  }

  public incrementPuzzleId() {
    this.db
      .collection("puzzles")
      .doc("details")
      .update({ nextPuzzleId: firebase.firestore.FieldValue.increment(1) });
  }

  getCardInfo() {
    return this.db
      .collection("puzzles")
      .doc("details")
      .valueChanges();
  }
}

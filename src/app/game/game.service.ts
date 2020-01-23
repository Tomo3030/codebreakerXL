import * as firebase from "firebase/app";
import { Observable, of } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(private afs: AngularFirestore) {}
  sendScoreToDb(classroomId, gameId, puzzleId, score) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .collection("games")
      .doc(puzzleId)
      .update({ score: score });
  }

  playerReady(classroomId, gameId, puzzleId, role) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .collection("games")
      .doc(puzzleId)
      .update({ [role]: true });
  }

  playerNotReady(classroomId, gameId, puzzleId, role) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .collection("games")
      .doc(puzzleId)
      .update({ [role]: false });
  }

  postHighScore(classroomId, names, score) {
    console.log(classroomId, names, score);
    this.afs
      .collection("classrooms")
      .doc(classroomId.toString())
      .collection("scores")
      .add({ names: names, score: score });
  }

  goToRound2(classroomId, gameId) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .update({ round: 2 });
  }

  resetGame(classroomId, gameId, puzzleId, emojiList) {
    console.log();
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .update({ round: 1, emojiList: emojiList, score: 0 });
  }

  ////////// DELETE

  getPuzzle(id: string): Observable<any> {
    console.log("aa");
    return this.afs
      .collection("puzzles")
      .doc(id)
      .valueChanges();
  }

  getScore(classroom, game, id) {
    return this.afs
      .collection("classrooms")
      .doc(classroom)
      .collection("games")
      .doc(game)
      .collection("games")
      .doc(id)
      .valueChanges();
  }

  playNextGame(classroomId, gameId) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .update({ playCount: firebase.firestore.FieldValue.increment(1) });
  }

  async makeGameRoom(classroomId, gameId, puzzleId) {
    let ref = this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .collection("games")
      .doc(puzzleId);

    let doc = await this.checkIfDocExists(ref);
    if (doc.exists) {
      return of(null);
    } else {
      return ref.set({ score: 0 });
    }
  }

  private async checkIfDocExists(doc: AngularFirestoreDocument) {
    return doc
      .get()
      .pipe(take(1))
      .toPromise();
  }
}

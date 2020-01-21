import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(private afs: AngularFirestore) {}
  sendScoreToDb(classroomId, gameId, score) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .update({ score: score });
  }

  playerReady(classroomId, gameId, role) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .update({ [role]: true });
  }

  playerNotReady(classroomId, gameId, role) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
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

  resetGame(classroomId, gameId, emojiList) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .update({ round: 1, emojiList: emojiList, score: 0 });
  }
}

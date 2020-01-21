import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { EmojiService } from "../shared/emoji.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { gameData } from "../shared/gameData";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(
    private afs: AngularFirestore,
    private emojiService: EmojiService,
    private afAuth: AngularFireAuth
  ) {}

  async createGame(gameId, classroomId) {
    console.log("createGame was called");
    let ref = this.afs
      .collection("classrooms")
      .doc(classroomId.toString())
      .collection("games")
      .doc(gameId.toString());

    const emojiList = this.emojiService.getEmojis(150);
    //const ref = this.afs.collection("games").doc(gameId.toString());
    const user = this.afAuth.auth.currentUser;
    let creator = { email: user.email, uid: user.uid, name: user.displayName };

    //let doc = await this.checkIfDocExists(ref);
    //if (doc.exists) return this.createGame(gameId, classroomId);

    ref.set(
      {
        creator: creator,
        emojiList: emojiList,
        score: 0,
        round: 1
      },
      { merge: true }
    );

    return gameId;
  }

  createGameId() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  private async checkIfDocExists(doc: AngularFirestoreDocument) {
    return doc
      .get()
      .pipe(take(1))
      .toPromise();
  }

  getGame(gameId): Observable<gameData> {
    return this.afs
      .collection("classrooms")
      .doc("none")
      .collection("games")
      .doc(gameId)
      .valueChanges();
  }

  joinGame(gameId, classroomId) {
    const user = this.afAuth.auth.currentUser;
    const joiner = { email: user.email, uid: user.uid, name: user.displayName };
    // need to try this like x times.
    return this.afs
      .collection("classrooms")
      .doc(classroomId.toString())
      .collection("games")
      .doc(gameId.toString())
      .set({ joiner: joiner }, { merge: true });
  }

  async noClassroomCreateGame() {
    const emojiList = this.emojiService.getEmojis(150);
    const gameId = this.createGameId();
    const ref = this.afs
      .collection("classrooms")
      .doc("none")
      .collection("games")
      .doc(gameId.toString());
    const user = this.afAuth.auth.currentUser;
    let creator = { email: user.email, uid: user.uid, name: user.displayName };

    let doc = await this.checkIfDocExists(ref);
    if (doc.exists) return this.noClassroomCreateGame();
    else {
      ref.set({
        creator: creator,
        emojiList: emojiList,
        score: 0,
        round: 1
      });
    }
    return gameId;
  }

  noClassroomJoinGame(gameId) {
    const user = this.afAuth.auth.currentUser;
    const joiner = { email: user.email, uid: user.uid, name: user.displayName };
    return this.afs
      .collection("classrooms")
      .doc("none")
      .collection("games")
      .doc(gameId)
      .update({ joiner: joiner });
  }
}

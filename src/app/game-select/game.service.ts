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

  async createGame() {
    const emojiList = this.emojiService.makeEmojiList(100);
    const gameId = this.createGameId();
    const ref = this.afs.collection("games").doc(gameId.toString());
    const user = this.afAuth.auth.currentUser;
    let creator = { email: user.email, uid: user.uid, name: user.displayName };

    let doc = await this.checkIfDocExists(ref);
    if (doc.exists) return this.createGame();
    else {
      ref.set({
        creator: creator,
        emojiList: emojiList,
        score: 0
      });
    }
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
      .collection("games")
      .doc(gameId)
      .valueChanges();
  }

  joinGame(gameId) {
    const user = this.afAuth.auth.currentUser;
    const joiner = { email: user.email, uid: user.uid, name: user.displayName };
    return this.afs
      .collection("games")
      .doc(gameId)
      .update({ joiner: joiner });
  }
}

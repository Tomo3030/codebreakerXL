import firebase from "firebase";
import { gameData } from "./gameData";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import emoji from "../../app/shared/emoji.json";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EmojiService {
  public emojiList: string[] = [];
  constructor(private afs: AngularFirestore) {}

  makeEmojiList(number) {
    const fullEmojiList = emoji;
    do {
      let x =
        fullEmojiList.emojis[
          Math.floor(Math.random() * fullEmojiList.emojis.length)
        ].emoji;
      this.emojiList.push(x);
    } while (this.emojiList.length < number);
    return this.emojiList;
  }

  getEmojiListFromServer(gameId) {
    this.getGame(gameId)
      .pipe(take(1))
      .subscribe(gameDetails => {
        this.emojiList = gameDetails.emojiList;
      });
  }

  getGame(gameId): Observable<gameData> {
    return this.afs
      .collection("games")
      .doc(gameId)
      .valueChanges();
  }

  postDataToDb(emojiList, round, gameId) {
    let emojiRound = round === "round 1" ? "emojiList" : "emojiList2";
    console.log(emojiRound);
    return this.afs
      .collection("games")
      .doc(gameId)
      .update({
        [emojiRound]: emojiList
      });
  }

  clearEmojiList(gameId) {
    return this.afs
      .collection("games")
      .doc(gameId)
      .update({
        emojiList: firebase.firestore.FieldValue.delete(),
        emojiList2: firebase.firestore.FieldValue.delete()
      });
  }
}

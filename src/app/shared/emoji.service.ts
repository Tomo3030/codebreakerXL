import { gameData } from "./gameData";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import emoji from "../../app/shared/emoji.json";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EmojiService {
  //public emojiList: string[] = [];
  constructor(private afs: AngularFirestore) {}

  getEmojis(number) {
    const fullEmojiList = emoji;
    const emojiList = [];
    do {
      let x =
        fullEmojiList.emojis[
          Math.floor(Math.random() * fullEmojiList.emojis.length)
        ].emoji;
      emojiList.push(x);
    } while (emojiList.length < number);
    return emojiList;
  }

  // getEmojiListFromServer(gameId) {
  //   this.getGame(gameId)
  //     .pipe(take(1))
  //     .subscribe(gameDetails => {
  //       this.emojiList = gameDetails.emojiList;
  //     });
  // }

  getGame(classroomId, gameId): Observable<gameData> {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .valueChanges();
  }

  postDataToDb(classroomId, emojiList, gameId) {
    return this.afs
      .collection("classrooms")
      .doc(classroomId)
      .collection("games")
      .doc(gameId)
      .update({
        emojiList: emojiList
      });
  }

  deleteScore(gameId) {
    return this.afs
      .collection("games")
      .doc(gameId)
      .update({ score: 0 });
  }
}

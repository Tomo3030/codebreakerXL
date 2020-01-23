import { PuzzleService } from "./../puzzle.service";
import { EmojiService } from "./../../shared/emoji.service";
import { Component, OnInit } from "@angular/core";
import { moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-make-puzzle",
  templateUrl: "./make-puzzle.component.html",
  styleUrls: ["./make-puzzle.component.scss"]
})
export class MakePuzzleComponent implements OnInit {
  emojiList = [];
  replacementEmoji = [];
  moving = [];
  items;
  replace = null;
  cardDetails$;
  constructor(
    private emojiSevice: EmojiService,
    private puzzleService: PuzzleService
  ) {}

  ngOnInit() {
    this.emojiList = this.emojiSevice.getEmojis(200);
    this.replacementEmoji = this.emojiSevice.getEmojis(25);
    this.cardDetails$ = this.puzzleService.getCardInfo();
  }

  getEmojiList() {}

  getNewReplacements() {
    this.replacementEmoji = this.emojiSevice.getEmojis(25);
  }

  moveEmoji(i) {
    if (this.replace !== null) {
      this.moveToPuzzle(i);
      return (this.replace = null);
    }

    this.moving.push(i);
    if (this.moving.length == 2) {
      this.reArrangeList(this.moving[0], this.moving[1]);
    }
  }

  reArrangeList(a, b) {
    const hold = this.emojiList[b];
    this.emojiList[b] = this.emojiList[a];
    this.emojiList[a] = hold;
    this.moving = [];
  }

  replaceEmoji(i) {
    console.log("s");
    if (this.moving.length) {
      this.emojiList[this.moving[0]] = this.replacementEmoji[i];
      console.log("k");
      this.replace = null;
      this.moving = [];
      this.replacementEmoji[i] = this.emojiSevice.getEmojis(1)[0];
      return;
    }
    this.replace = i;
  }

  moveToPuzzle(i) {
    this.emojiList[i] = this.replacementEmoji[this.replace];
    this.replacementEmoji[this.replace] = this.emojiSevice.getEmojis(1)[0];
  }

  savePuzzle(id) {
    //console.log(this.emojiList);
    this.puzzleService
      .savePuzzle(id, ["random"], "easy", this.emojiList)
      .then(() => {
        this.puzzleService.incrementPuzzleId();
      });
    this.emojiList = this.emojiSevice.getEmojis(200);
  }
}

import { GameroomService } from "./../gameroom.service";
import { gameData } from "./../../shared/gameData";
import { ActivatedRoute } from "@angular/router";
import { EmojiService } from "./../../shared/emoji.service";
import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { GameDialogComponent } from "../game-dialog.component";

@Component({
  selector: "app-game-organizer",
  templateUrl: "./game-organizer.component.html",
  styleUrls: ["./game-organizer.component.scss"]
})
export class GameOrganizerComponent implements OnInit {
  gameId;
  fullEmojiList = [];
  currentDisplayArray: string[] = [];
  answerArray = [];
  correctAnswer = [];
  shake;
  score = 0;
  addPoint;
  round;
  role;

  constructor(
    private emojiService: EmojiService,
    private activatedRoute: ActivatedRoute,
    private gameroomService: GameroomService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.gameId = this.activatedRoute.snapshot.paramMap.get("gameId");
    this.activatedRoute.pathFromRoot[2].url
      .pipe(take(1))
      .subscribe(val => (this.role = val[0].path));

    this.emojiService
      .getGame(this.gameId)
      .pipe(take(1))
      .subscribe(gameData => {
        this.round = gameData.round;
        if (this.round == "round 2") {
          this.score = gameData.score;
        }
        this.fullEmojiList = gameData.emojiList;
        this.correctAnswer = this.getNewDisplayArray();
        this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
      });
  }

  onDrop(e: CdkDragDrop<string[]>) {
    if (e.previousContainer !== e.container) {
      transferArrayItem(
        e.previousContainer.data,
        e.container.data,
        e.previousIndex,
        //e.currentIndex
        e.container.data.length
      );
    } else {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    }
  }

  submit() {
    let answer = this.answerArray.every((answer, i) => {
      return answer == this.correctAnswer[i];
    });
    if (answer) {
      this.handlePointAnimation();
      this.score++;
      this.gameroomService.sendScoreToDb(this.gameId, this.score);
      this.correctAnswer = this.getNewDisplayArray();
      this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
      this.answerArray = [];
    } else {
      this.handleShakeAnimation();
      this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
      this.answerArray = [];
    }
  }

  getNewDisplayArray() {
    return this.fullEmojiList.splice(0, 5);
  }

  addRandomEmoji(number) {}

  randomizeArray(array) {
    return array
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
  }

  handlePointAnimation() {
    this.addPoint = true;
    setTimeout(() => {
      this.addPoint = false;
    }, 2000);
  }
  handleShakeAnimation() {
    this.shake = true;
    setTimeout(() => {
      this.shake = false;
    }, 2000);
  }

  openDialog() {
    this.dialog.open(GameDialogComponent, {
      data: {
        score: this.score,
        round: this.round,
        role: this.role,
        gameId: this.gameId
      }
    });
  }

  timeOver() {
    this.openDialog();
  }
}

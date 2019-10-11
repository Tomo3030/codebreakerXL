import { AngularFirestore } from "@angular/fire/firestore";
import { gameData } from "./../../shared/gameData";
import { EmojiService } from "./../../shared/emoji.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
import undefined from "firebase/empty-import";
import { MatDialog } from "@angular/material";
import { GameDialogComponent } from "../game-dialog.component";

@Component({
  selector: "app-game-speaker",
  templateUrl: "./game-speaker.component.html",
  styleUrls: ["./game-speaker.component.scss"]
})
export class GameSpeakerComponent implements OnInit, OnDestroy {
  score = 0;
  gameId;
  fullEmojiList = [];
  currentDisplayArray;
  addPoint;
  round;
  subscription;
  role;
  constructor(
    private emojiService: EmojiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fullEmojiList = this.emojiService.emojiList;
    console.log(this.fullEmojiList);
    this.gameId = this.activatedRoute.snapshot.paramMap.get("gameId");
    this.activatedRoute.pathFromRoot[2].url
      .pipe(take(1))
      .subscribe(val => (this.role = val[0].path));

    if (!this.fullEmojiList.length) {
      console.log("this should happen");
      this.emojiService
        .getGame(this.gameId)
        .pipe(take(1))
        .subscribe(gameData => {
          if (this.round !== gameData.round) {
            this.round = gameData.round;
          }
          if (this.round == "round 2") {
            //i don't think this will ever happen
            this.score = gameData.score;
          }
          this.fullEmojiList = gameData.emojiList;
          console.log(this.fullEmojiList);
          this.currentDisplayArray = this.getNewDisplayArray();
        });
    }

    this.subscription = this.emojiService
      .getGame(this.gameId)
      .subscribe(gameData => {
        if (!this.round) {
          this.score = gameData.score;
          this.round = gameData.round;
        }
        if (gameData.score && gameData.score !== this.score) {
          this.score++;
          this.handleAnimation();
          this.currentDisplayArray = this.getNewDisplayArray();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getNewDisplayArray() {
    return this.fullEmojiList.splice(0, 5);
  }

  handleAnimation() {
    console.log("a");
    this.addPoint = true;
    setTimeout(() => {
      this.addPoint = false;
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

import { GameService } from "./../game.service";
import { gameData } from "./../../shared/gameData";
import { EmojiService } from "./../../shared/emoji.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EndDialogComponent } from "../end-dialog.component";
import { InfoComponent } from "../info/info.component";
import { take, switchMap } from "rxjs/operators";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild(InfoComponent)
  private infoComponent: InfoComponent;
  firstLoad;
  show;
  spinner;
  role;
  gameId;
  round;
  score = 0;
  addPoint;
  shake;
  fullEmojiList = [];
  currentDisplayArray = [];
  answerArray = [];
  correctAnswer = [];
  subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private emojiService: EmojiService,
    public dialog: MatDialog,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    console.log("ngOnInit");

    this.subscription = this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.gameId = params.get("gameId");
          this.role = params.get("role");
          this.round = params.get("round");
          if (this.gameService && this.round && this.round) {
            console.log("ok");
            this.spinner = true;
            this.firstLoad = true;
            this.show = false;
          }
          return this.emojiService.getGame(this.gameId);
        })
      )
      .subscribe(gameData => {
        console.log("dokey");
        if (
          !this.fullEmojiList.length &&
          this.activatedRoute.snapshot.paramMap.get("round") === "round 1"
        ) {
          this.fullEmojiList = gameData.emojiList;
          console.log(this.fullEmojiList);
        }
        console.log(this.activatedRoute.snapshot.paramMap.get("round"));
        console.log(this.fullEmojiList.length);
        if (
          !this.fullEmojiList.length &&
          this.activatedRoute.snapshot.paramMap.get("round") === "round 2"
        ) {
          console.log("we need this emojiList to load");
          this.fullEmojiList = gameData.emojiList2;
        }

        if (this.firstLoad) {
          this.correctAnswer = this.getNewDisplayArray();
          this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
          this.gameService.playerReady(this.gameId, this.role);
          this.score = gameData.score;
          this.firstLoad = false;
        }
        if (gameData.score && this.score !== gameData.score) {
          this.score = gameData.score;
          this.handlePointAnimation();
          this.correctAnswer = this.getNewDisplayArray();
        }
        if (gameData.speaker && gameData.organizer) {
          this.show = true;
          this.spinner = false;
          this.infoComponent.startTimer();
          this.gameService.playerNotReady(this.gameId, this.role);
        }
      });
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

  roleSwitch() {
    if (this.role === "organizer") {
      return (this.role = "speaker");
    }
    if (this.role === "speaker") {
      return (this.role = "organizer");
    }

    console.log(this.role);
  }

  timeUp() {
    this.dialog.open(EndDialogComponent, {
      data: {
        score: this.score,
        round: this.round,
        role: this.role,
        gameId: this.gameId
      }
    });
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
      this.fullEmojiList = [];
    });
  }

  submitAnswer() {
    let answer = this.answerArray.every((answer, i) => {
      return answer == this.correctAnswer[i];
    });
    if (answer) {
      this.handlePointAnimation();
      this.score++;
      this.gameService.sendScoreToDb(this.gameId, this.score);
      this.correctAnswer = this.getNewDisplayArray();
      this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
      this.answerArray = [];
    } else {
      this.handleShakeAnimation();
      this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
      this.answerArray = [];
    }
  }

  stopTimer() {
    this.infoComponent.stopTimer();
  }
}

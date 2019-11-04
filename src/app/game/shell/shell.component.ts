import { gameData } from "./../../shared/gameData";
import { user } from "./../../shared/user";
import { GameService } from "./../game.service";
import { EmojiService } from "./../../shared/emoji.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { EndDialogComponent } from "../end-dialog.component";
import { InfoComponent } from "../info/info.component";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild(InfoComponent, { static: true })
  private infoComponent: InfoComponent;
  firstLoad;
  show = false;
  spinner = true;
  role;
  gameId;
  round;
  score = 0;
  roundProgress = 0;
  addPoint;
  shake;
  emojiList = [];
  emojiListCopy = [];
  currentDisplayArray = [];
  answerArray = [];
  correctAnswer = [];
  subscription;
  player;
  classroomId;
  names;

  __ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ready$: Observable<boolean> = this.__ready.asObservable();
  __onPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onPage$: Observable<boolean> = this.__onPage.asObservable();
  constructor(
    private activatedRoute: ActivatedRoute,
    private emojiService: EmojiService,
    public dialog: MatDialog,
    private gameService: GameService,
    private snack: MatSnackBar
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    combineLatest(this.ready$, this.onPage$).subscribe(([x, y]) => {
      if (x && y) {
        this.gameService.playerReady(this.gameId, this.player);
        this.__onPage.next(false);
        this.__ready.next(false);
      }
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.gameId = params.get("gameId");
      this.role = params.get("role");
      this.round = params.get("round");
      this.classroomId = params.get("classroomId");
      if (this.gameId && this.role && this.round) {
        this.__onPage.next(true);
      }
    });
    this.player = this.role === "speaker" ? "p1" : "p2";

    this.subscription = this.emojiService
      .getGame(this.gameId)
      .subscribe(gameData => {
        if (this.needNewEmojiArray(gameData.emojiList)) {
          this.answerArray = [];
          this.emojiList = gameData.emojiList;
          this.emojiListCopy = [...this.emojiList];
          this.correctAnswer = this.getNewDisplayArray();
          this.answerArray = [];
          this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
          this.__ready.next(true);
          this.score = gameData.score;
        }
        if (this.score !== gameData.score) {
          this.score = gameData.score;
          this.handlePointAnimation();
          this.correctAnswer = this.getNewDisplayArray();
        }
        if (gameData.p1 === true && gameData.p2 === true) {
          this.show = true;
          this.spinner = false;
          this.infoComponent.startTimer();
          this.gameService.playerNotReady(this.gameId, this.player);
        }
        if (
          this.classroomId &&
          !this.names &&
          gameData.joiner &&
          gameData.joiner.name
        ) {
          this.names = gameData.creator.name + " & " + gameData.joiner.name;
        }
      });
  }

  getNewDisplayArray() {
    return this.emojiListCopy.splice(0, 5);
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

  timeUp() {
    if (
      this.player === "p1" &&
      this.classroomId &&
      this.round === "round 2" &&
      this.score > 1
    )
      this.postHighScore();
    this.dialog.open(EndDialogComponent, {
      data: {
        score: this.score,
        round: this.round,
        role: this.role,
        gameId: this.gameId
      }
    });
    this.spinner = true;
    this.show = false;
    this.roundProgress = 0;
  }

  submitAnswer() {
    let answer = this.answerArray.every((answer, i) => {
      return answer == this.correctAnswer[i];
    });
    if (answer) {
      this.handlePointAnimation();
      this.score++;
      this.roundProgress < 10
        ? this.roundProgress++
        : (this.roundProgress = 10);
      this.gameService.sendScoreToDb(this.gameId, this.score);
      this.correctAnswer = this.getNewDisplayArray();
      const randoEmoji = this.emojiService.makeEmojiList(this.roundProgress);
      this.currentDisplayArray = this.randomizeArray(
        this.correctAnswer.concat(randoEmoji)
      );
      this.answerArray = [];
    } else {
      this.openSnack("You got it wrong! Try again!");
      this.handleShakeAnimation();
      this.currentDisplayArray = this.randomizeArray(
        this.currentDisplayArray.concat(this.answerArray)
      );
      this.answerArray = [];
    }
  }

  stopTimer() {
    this.infoComponent.stopTimer();
  }

  needNewEmojiArray(emojiArray) {
    //if full emojiList is empty need new emoji Array
    if (!this.emojiList.length) {
      return true;
    }
    //if emoji list is same we don't need emoji list
    return !this.emojiList.every((emoji, i) => {
      return emoji == emojiArray[i];
    });
  }

  openSnack(msg) {
    this.snack.open(msg, null, { duration: 4000 });
  }

  postHighScore() {
    this.gameService.postHighScore(this.classroomId, this.names, this.score);
  }
}

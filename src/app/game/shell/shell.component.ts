import { GameService } from "./../game.service";
import { EmojiService } from "./../../shared/emoji.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EndDialogComponent } from "../end-dialog.component";
import { InfoComponent } from "../info/info.component";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild(InfoComponent)
  private infoComponent: InfoComponent;
  firstLoad;
  show = false;
  spinner = true;
  role;
  gameId;
  round;
  score = 0;
  addPoint;
  shake;
  emojiList = [];
  emojiListCopy = [];
  currentDisplayArray = [];
  answerArray = [];
  correctAnswer = [];
  subscription;
  player;

  __ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ready$: Observable<boolean> = this.__ready.asObservable();
  __onPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onPage$: Observable<boolean> = this.__onPage.asObservable();
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
    combineLatest(this.ready$, this.onPage$).subscribe(([x, y]) => {
      if (x && y) {
        console.log("2");
        this.gameService.playerReady(this.gameId, this.player);
        this.__onPage.next(false);
        this.__ready.next(false);
      }
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.gameId = params.get("gameId");
      this.role = params.get("role");
      this.round = params.get("round");
      console.log(this.gameId, this.role, this.round);
      if (this.gameId && this.role && this.round) {
        this.__onPage.next(true);
      }
    });
    this.player = this.role === "speaker" ? "p1" : "p2";

    this.subscription = this.emojiService
      .getGame(this.gameId)
      .subscribe(gameData => {
        if (this.needNewEmojiArray(gameData.emojiList)) {
          this.emojiList = gameData.emojiList;
          console.log(this.emojiList);
          this.emojiListCopy = [...this.emojiList];
          this.correctAnswer = this.getNewDisplayArray();
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
          console.log("must be 4");
          this.show = true;
          this.spinner = false;
          this.infoComponent.startTimer();
          this.gameService.playerNotReady(this.gameId, this.player);
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
}

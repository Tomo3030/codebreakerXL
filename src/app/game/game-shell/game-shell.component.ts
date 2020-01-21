import { InstructionDialogComponent } from "./../dialogs/instruction-dialog.component";
import { gameData } from "./../../shared/gameData";
import { EndGameDialogComponent } from "./../dialogs/end-game-dialog.component";
import { NextRoundDialogComponent } from "./../dialogs/next-round-dialog.component";
import { SharedService } from "src/app/shared/shared.service";
import { EmojiService } from "./../../shared/emoji.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatSnackBar, MatDialog } from "@angular/material";
import { GameService } from "src/app/game/game.service";
import { InfoComponent } from "../info/info.component";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";

@Component({
  selector: "app-game-shell",
  templateUrl: "./game-shell.component.html",
  styleUrls: ["./game-shell.component.scss"]
})
export class GameShellComponent implements OnInit, OnDestroy {
  @ViewChild(InfoComponent, { static: true })
  private infoComponent: InfoComponent;

  score = 0; //input for gameInfo

  currentDisplayArray: string[] = []; //input for organizer
  organizerAnswer: string[] = []; // input for organizer
  addPoint: boolean; // input for organizer
  shake: boolean; // input for organizer

  correctAnswer: string[] = []; //input for speaker

  role: string; //input for speaker & organizer
  round;

  gameId: string;
  classroomId: string;

  emojiList: string[] = []; // full emoji list from db

  numberOfExtraEmojis = 0;

  successSound = new Audio("../../assets/sounds/success.wav");
  failureSound = new Audio("../../assets/sounds/failure.wav");

  spinner;

  __dataReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataReady$: Observable<boolean> = this.__dataReady.asObservable();
  __onPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onPage$: Observable<boolean> = this.__onPage.asObservable();

  gameData$;
  creator; //user data for creator
  joiner; // userdata for joiner

  constructor(
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private emojiService: EmojiService,
    private sharedService: SharedService,
    private gameService: GameService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.gameData$.unsubscribe();
  }

  ngOnInit() {
    this.spinner = true;
    this.classroomId = this.activatedRoute.snapshot.paramMap.get("classroomId");
    this.gameId = this.activatedRoute.snapshot.paramMap.get("gameId");

    combineLatest(this.dataReady$, this.onPage$).subscribe(
      ([dataReady, onPage]) => {
        if (dataReady && onPage) {
          this.gameService.playerReady(
            this.classroomId,
            this.gameId,
            this.role
          );
          this.__onPage.next(false);
          this.__dataReady.next(false);
        }
      }
    );

    this.gameData$ = this.emojiService
      .getGame(this.classroomId, this.gameId)
      .subscribe(async gameData => {
        this.creator = gameData.creator;
        this.joiner = gameData.joiner;

        if (!this.round || this.round !== gameData.round) {
          console.log("no round");
          this.round = gameData.round;
          this.role = await this.getRole(gameData.creator);
          this.__dataReady.next(true);
          this.openInstructionsDialog();
        }

        if (this.score !== gameData.score) {
          this.score = gameData.score;
          this.handlePointAnimation();
          this.correctAnswer = this.getNewDisplayArray();
          this.successSound.play();
        }

        if (!this.emojiList.length) {
          this.emojiList = gameData.emojiList;
          this.correctAnswer = this.getNewDisplayArray();
          this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
        }
        if (gameData.organizer && gameData.speaker) {
          this.spinner = false;
          this.infoComponent.startTimer();
          this.gameService.playerNotReady(
            this.classroomId,
            this.gameId,
            this.role
          );
        }
      });
  }

  //needNewEmojiList(): boolean {}

  async getRole(creator): Promise<string> {
    let user = await this.sharedService.getUserPromise();

    if (this.round === 1) {
      if (creator.uid === user.uid) {
        return "speaker";
      } else {
        return "organizer";
      }
    } else {
      if (creator.uid === user.uid) {
        return "organizer";
      } else {
        return "speaker";
      }
    }
  }

  randomizeArray(array) {
    return array
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
  }

  getNewDisplayArray() {
    return this.emojiList.splice(0, 5);
  }

  submitAnswer(): void {
    //this is output from organizer
    let answer = this.organizerAnswer.every((answer, i) => {
      return answer == this.correctAnswer[i];
    });
    if (answer) {
      this.answerIsCorrect();
    } else {
      this.answerIsWrong();
    }
  }

  openSnack(msg): void {
    this.snack.open(msg, null, { duration: 4000 });
  }

  answerIsCorrect() {
    this.handlePointAnimation();
    this.successSound.play();
    this.score++;
    this.numberOfExtraEmojis < 10
      ? this.numberOfExtraEmojis++
      : (this.numberOfExtraEmojis = 10);
    this.gameService.sendScoreToDb(this.classroomId, this.gameId, this.score);
    this.correctAnswer = this.getNewDisplayArray();
    const radomEmoji = this.emojiService.getEmojis(this.numberOfExtraEmojis);
    this.currentDisplayArray = this.randomizeArray(
      this.correctAnswer.concat(radomEmoji)
    );
    this.organizerAnswer = [];
  }

  answerIsWrong() {
    this.openSnack("You got it wrong! Try again!");
    this.handleShakeAnimation();
    this.failureSound.play();
    this.currentDisplayArray = this.randomizeArray(
      this.currentDisplayArray.concat(this.organizerAnswer)
    );
    this.organizerAnswer = [];
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
    this.numberOfExtraEmojis = 0;
    this.correctAnswer = this.getNewDisplayArray();
    this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
    this.spinner = true;

    if (this.round === 1) {
      this.openNextRoundDialog();
    } else {
      // round 2 finished
      //post highscore to db
      if (this.role === "organizer" && this.classroomId != "none") {
        let names = this.creator.name + " & " + this.joiner.name;
        this.gameService.postHighScore(this.classroomId, names, this.score);
      }
      this.openEndGameDialog();
    }
  }

  /////////////////////////////////
  ////////// DIALOGS //////////////
  /////////////////////////////////

  openEndGameDialog() {
    const end = this.dialog.open(EndGameDialogComponent, {
      disableClose: true,
      width: "90%",
      data: { score: this.score },
      backdropClass: "dialogBackgroundBlur"
    });

    end.afterClosed().subscribe(x => {
      if (x) {
        //play again
        this.round = null;
        let emojiList = this.emojiService.getEmojis(200);
        // resetGame makes: round 1, gets new emojiList, score =0
        this.gameService.resetGame(this.classroomId, this.gameId, emojiList);
        this.numberOfExtraEmojis = 0;
        this.__onPage.next(true);
      } else {
        //quit
        this.router.navigate(["/"]);
      }
    });
  }

  openNextRoundDialog() {
    const round = this.dialog.open(NextRoundDialogComponent, {
      backdropClass: "dialogBackgroundBlur",
      disableClose: true,
      width: "90%",
      data: { score: this.score }
    });
    round.afterClosed().subscribe(x => {
      this.gameService.goToRound2(this.classroomId, this.gameId).then(() => {
        console.log(this.role);
        //this.__onPage.next(true);
      });
    });
  }

  openInstructionsDialog() {
    const instructions = this.dialog.open(InstructionDialogComponent, {
      backdropClass: "dialogBackgroundBlur",
      disableClose: true,
      data: { role: this.role },
      width: "90%",
      panelClass: "custom-dialog-container"
    });

    instructions.afterClosed().subscribe(x => {
      this.__onPage.next(true);
    });
  }
}

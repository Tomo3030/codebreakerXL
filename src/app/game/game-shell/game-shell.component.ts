import { switchMap } from "rxjs/operators";
import { InstructionDialogComponent } from "./../dialogs/instruction-dialog.component";
import { EndGameDialogComponent } from "./../dialogs/end-game-dialog.component";
import { NextRoundDialogComponent } from "./../dialogs/next-round-dialog.component";
import { SharedService } from "src/app/shared/shared.service";
import { EmojiService } from "./../../shared/emoji.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatSnackBar, MatDialog } from "@angular/material";
import { GameService } from "src/app/game/game.service";
import { InfoComponent } from "../info/info.component";

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

  spinner;
  gameData$;
  creator; //user data for creator
  joiner; // userdata for joiner

  successSound = new Audio("../../assets/sounds/success.wav");
  failureSound = new Audio("../../assets/sounds/failure.wav");

  currentPuzzle: string;

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
    this.round = 1;

    this.gameData$ = this.emojiService
      .getGame(this.classroomId, this.gameId)
      .pipe(
        switchMap(gameData => {
          this.setGameDetails(gameData);
          console.log(this.currentPuzzle);
          return this.gameService.getPuzzle(this.currentPuzzle);
        }),
        switchMap(emojiList => {
          this.getEmojisReady(emojiList);
          return this.gameService.makeGameRoom(
            this.classroomId,
            this.gameId,
            this.currentPuzzle
          );
        }),
        switchMap(() => {
          return this.gameService.getScore(
            this.classroomId,
            this.gameId,
            this.currentPuzzle
          );
        })
      )
      .subscribe(gameData => {
        this.updateGameData(gameData);
      });
  }

  //needNewEmojiList(): boolean {}

  updateGameData(gameData) {
    if (this.score !== gameData.score) {
      this.score = gameData.score;
      this.handlePointAnimation();
      this.correctAnswer = this.getNewDisplayArray();
      this.successSound.play();
    }

    if (gameData.organizer && gameData.speaker) {
      this.spinner = false;
      this.infoComponent.startTimer();
      this.gameService.playerNotReady(
        this.classroomId,
        this.gameId,
        this.currentPuzzle,
        this.role
      );
    }
  }

  getEmojisReady(data) {
    this.emojiList = data.puzzle;
    this.correctAnswer = this.getNewDisplayArray();
    this.currentDisplayArray = this.randomizeArray(this.correctAnswer);
  }

  async setGameDetails(data) {
    this.creator = data.creator;
    this.joiner = data.joiner;
    const playCount = data.playCount;
    const puzzleList = data.puzzleList;
    this.currentPuzzle = puzzleList[playCount].toString();

    this.role = await this.getRole(this.creator);
    this.openInstructionsDialog();
  }

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
    this.gameService.sendScoreToDb(
      this.classroomId,
      this.gameId,
      this.currentPuzzle,
      this.score
    );
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

  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigateByUrl(uri));
  }

  /////////////////////////////////
  ////////// DIALOGS //////////////
  /////////////////////////////////

  openEndGameDialog() {
    this.gameData$.unsubscribe();
    const end = this.dialog.open(EndGameDialogComponent, {
      disableClose: true,
      width: "90%",
      data: { score: this.score },
      backdropClass: "dialogBackgroundBlur"
    });

    end.afterClosed().subscribe(x => {
      if (x && this.role == "speaker") {
        //play again
        this.round = 1;
        // resetGame makes: round 1, gets new emojiList, score =0
        if (this.role === "speaker") {
          this.gameService
            .playNextGame(this.classroomId, this.gameId)
            .then(() => {
              this.redirectTo(this.router.url);
            });
        } else {
          this.redirectTo(this.router.url);
        }
      } else if (x) {
        this.redirectTo(this.router.url);
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
    round.afterClosed().subscribe(async x => {
      this.round = 2;
      this.role = await this.getRole(this.creator);
      this.gameService.playerReady(
        this.classroomId,
        this.gameId,
        this.currentPuzzle,
        this.role
      );
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
      this.gameService.playerReady(
        this.classroomId,
        this.gameId,
        this.currentPuzzle,
        this.role
      );
    });
  }
}

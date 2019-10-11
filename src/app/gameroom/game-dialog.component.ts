import { EmojiService } from "./../shared/emoji.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-game-dialog",
  template: `
    <div class="center">
      <div class="title">Congratulations!</div>
      <div *ngIf="data.round == 'round 1'" class="text">
        Your {{ data.round }} score is:
      </div>
      <div *ngIf="data.round == 'round 2'" class="text">
        Your total score is:
      </div>
      <div class="score">{{ data.score }}</div>

      <div *ngIf="data.round == 'round 1'" class="instructions">
        Now it's time for round 2
      </div>

      <button
        *ngIf="data.round == 'round 1'"
        color="accent"
        class="button"
        mat-raised-button
        (click)="goToRound2()"
      >
        Play Round 2!
      </button>
      <div>
        <button
          *ngIf="data.round == 'round 2'"
          color="accent"
          class="button"
          mat-raised-button
        >
          Play again
        </button>
      </div>

      <button
        *ngIf="data.round == 'round 2'"
        color="accent"
        class="button"
        mat-raised-button
      >
        Quit
      </button>
    </div>
  `,
  styles: [
    `
      .center {
        text-align: center;
      }

      .title {
        font-size: 2.5em;
        font-weight: bold;
      }
      .text {
        font-size: 1.5em;
        margin-bottom: 25px;
      }
      .score {
        font-size: 5em;
        line-height: 100px;
        font-family: "Share Tech Mono", monospace;
        border: 2px orange solid;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin: auto;
      }
      .button {
        margin-top: 30px;
        font-size: 1.2em;
        padding: 10px;
        width: 230px;
      }
      .instructions {
        margin-top: 20px;
        font-size: 1.2em;
      }
    `
  ]
})
export class GameDialogComponent implements OnInit {
  constructor(
    private emojiService: EmojiService,
    private router: Router,
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.changePosition();
  }

  goToRound2() {
    console.log(this.data);
    const newRole = this.data.role === "organizer" ? "speaker" : "organizer";
    if (newRole === "speaker") {
      const emojiList = this.emojiService.makeEmojiList(100);
      this.emojiService
        .postDataToDb(emojiList, this.data)
        .then(() =>
          this.router.navigateByUrl(
            "/gameroom/" + newRole + "/" + this.data.gameId
          )
        );
    } else {
      this.router.navigateByUrl(
        "/gameroom/" + newRole + "/" + this.data.gameId
      );
    }
    this.dialogRef.close();
  }

  changePosition() {
    this.dialogRef.updatePosition({ top: "150px" });
  }
}

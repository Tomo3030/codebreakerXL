import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router, NavigationEnd } from "@angular/router";
import { EmojiService } from "../shared/emoji.service";

@Component({
  selector: "app-end-dialog",
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
        (click)="goToRound('round 2')"
      >
        Play Round 2!
      </button>

      <div>
        <button
          *ngIf="data.round == 'round 2'"
          color="accent"
          class="button"
          mat-raised-button
          (click)="goToRound('round 1')"
        >
          Play again
        </button>
      </div>

      <button
        *ngIf="data.round == 'round 2'"
        color="accent"
        class="button"
        mat-raised-button
        (click)="quit()"
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
export class EndDialogComponent implements OnInit {
  clickable = true;
  constructor(
    private emojiService: EmojiService,
    private router: Router,
    public dialogRef: MatDialogRef<EndDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    console.log(this.data);
    this.changePosition();
  }

  goToRound(round) {
    if (this.clickable) {
      this.clickable = false;
      if (round === "round 1") {
        this.emojiService.deleteScore(this.data.gameId);
      }
      const newRole = this.data.role === "organizer" ? "speaker" : "organizer";
      if (newRole === "speaker") {
        const emojiList = this.emojiService.makeEmojiList(100);
        this.emojiService.postDataToDb(emojiList, this.data.gameId).then(() => {
          this.router.navigate([
            `/game/${newRole}/${round}/${this.data.gameId}`,
            { classroomId: this.data.classroomId }
          ]);
        });
      } else {
        this.router.navigate([
          `/game/${newRole}/${round}/${this.data.gameId}`,
          { classroomId: this.data.classroomId }
        ]);
      }
      this.dialogRef.close();
    }
  }

  quit() {
    this.router.navigateByUrl("/gameselect");
    this.dialogRef.close();
  }

  changePosition() {
    this.dialogRef.updatePosition({ top: "150px" });
  }
}

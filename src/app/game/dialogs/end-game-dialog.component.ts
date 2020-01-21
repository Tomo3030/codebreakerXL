import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-end-game-dialog",
  template: `
    <div class="center">
      <h1 class="title">Congratulations!</h1>
      <h3 class="text">Your round total score is:</h3>
      <div class="score">{{ data.score }}</div>
      <div class="button-container">
        <button
          color="accent"
          class="button"
          mat-raised-button
          (click)="playAgain()"
        >
          Play Again!
        </button>
      </div>
      <button color="accent" class="button" mat-raised-button (click)="quit()">
        Quit
      </button>
    </div>
  `,
  styles: [
    `
      .center {
        text-align: center;
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
        font-size: 1.2em;
        padding: 10px;
        width: 230px;
      }

      .button-container {
        margin: 25px;
      }
    `
  ]
})
export class EndGameDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EndGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
  playAgain() {
    this.dialogRef.close(true);
  }

  quit() {
    this.dialogRef.close(false);
  }
}

import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-next-round-dialog",
  template: `
    <div class="center">
      <h1 class="title">Congratulations!</h1>
      <h3 class="text">Your round 1 score is:</h3>
      <div class="score">{{ data.score }}</div>
      <h3 class="instructions">
        Now it's time for round 2
      </h3>
      <button
        color="accent"
        class="button"
        mat-raised-button
        (click)="goToRound2()"
      >
        Play Round 2!
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
    `
  ]
})
export class NextRoundDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NextRoundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  goToRound2() {
    this.dialogRef.close();
  }
}

import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-members-dialog",
  template: `
    <div class="center" *ngIf="!data.creator">
      <div class="title">Congratulations!</div>
      <span class="emoji">🙌</span>
      <div class="content" mat-dialog-content>
        You have joined
        <div class="name">{{ data.email }}'s</div>
        game!
      </div>

      <button
        color="accent"
        class="button"
        mat-raised-button
        (click)="goToGame()"
      >
        Continue To Game
      </button>
    </div>

    <div class="center" *ngIf="data.creator">
      <div class="title">Congratulations!</div>
      <span class="emoji">🙌</span>
      <div class="content" mat-dialog-content>
        <div class="name">{{ data.email }}'s</div>
        has joined your game!
      </div>

      <button
        color="accent"
        class="button"
        mat-raised-button
        (click)="goToGame()"
      >
        Continue To Game
      </button>
    </div>
  `,
  styles: [
    `
      .title {
        font-size: 2em;
      }
      .center {
        text-align: center;
        font-family: "Roboto Condensed", sans-serif;
      }
      .content {
        font-size: 1.5em;
      }
      .emoji {
        font-size: 6em;
      }
      .button {
        margin-top: 25px;
        font-size: 1.1em;
        padding: 5px 50px;
      }
      .name {
        font-size: 1em;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, orange);
      }
    `
  ]
})
export class MembersDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MembersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    console.log(this.data);
  }

  goToGame() {
    this.dialogRef.close();
    this.router.navigate([
      "/game/",
      this.data.gameId,
      { classroomId: this.data.classroomId }
    ]);
  }
}

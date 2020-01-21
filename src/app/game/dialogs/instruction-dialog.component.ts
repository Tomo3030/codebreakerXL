import { ClassroomService } from "./../../teacher/classroom.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-instruction-dialog",
  template: `
    <div class="center">
      <h1>How To Play:</h1>
      <div class="instructions">
        <div class="talk">
          <div class="big-emoji">🗣️</div>
          <div class="big-emoji flip">🗣️</div>
        </div>

        <div *ngIf="this.data.role === 'organizer'">
          <div class="big">
            Talk with your partner. They will tell you the order to put the
            emojis in
          </div>

          <img
            src="./assets/gif/instruction3.gif"
            style="margin:30px auto; display:block"
            width="100%"
          />
        </div>
      </div>
      <div *ngIf="this.data.role === 'speaker'" class="big">
        Tell your partner the order of the emojis
        <img
          src="./assets/gif/instruction-still.png"
          style="margin:30px auto; display:block"
          width="100%"
        />
      </div>
    </div>

    <div class="button-container">
      <button mat-raised-button color="accent" class="button" (click)="close()">
        Play the Game!
      </button>
    </div>
  `,
  styles: [
    `
      .talk {
        display: flex;
        justify-content: space-around;
        align-content: center;
      }
      .big-emoji {
        font-size: 4em;
      }
      .center {
        text-align: center;
      }
      .flip {
        transform: scale(-1, 1);
      }
      .big {
        font-size: 1.2em;
      }
      .instructions {
        font-weight: 400;
      }

      .button-container {
        text-align: center;
      }
      .button {
        width: 200px;
        padding: 9px;
        font-size: 1.1em;
      }
    `
  ]
})
export class InstructionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InstructionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data.role);
  }
  close() {
    this.dialogRef.close();
  }
}

// <div class="instructions">
//         Place emojis in the correct order
//       </div>
//       <div class="emoji-box"></div>

//       <div class="emoji-container">
//         <div *ngFor="let e of exampleArray" class="emoji">
//           {{ e }}
//         </div>
//       </div>

// <div class="bottom">
// <div class="instructions">Tell your partner the order of the emojis</div>
// <img
//   src="./assets/gif/instruction-still.png"
//   style="margin:auto; display:block"
//   width="90%"
// />
// </div>

// clip-path: polygon(50% 0%, 100% 0, 100% 85%, 0 100%, 0 0);

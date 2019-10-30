import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-admin-dialog",
  template: `
    <div class="center">
      <p>{{ this.data.msg }}</p>
      <button (click)="close()" mat-stroked-button>Ok</button>
    </div>
  `,
  styles: [
    `
      .center {
        text-align: center;
      }
    `
  ]
})
export class AdminDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.dialogRef.updatePosition({ top: "150px" });
  }

  close() {
    this.dialogRef.close();
  }
}

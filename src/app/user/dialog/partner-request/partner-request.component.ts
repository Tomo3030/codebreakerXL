import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-partner-request",
  templateUrl: "./partner-request.component.html",
  styleUrls: ["./partner-request.component.scss"]
})
export class PartnerRequestComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PartnerRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  accept() {
    console.log("accept");
    this.dialogRef.close(this.data.user);
  }

  reject() {
    console.log("reject");
    this.dialogRef.close(false);
  }
}

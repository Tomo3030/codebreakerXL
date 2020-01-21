import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-partner-reject",
  templateUrl: "./partner-reject.component.html",
  styleUrls: ["./partner-reject.component.scss"]
})
export class PartnerRejectComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PartnerRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}

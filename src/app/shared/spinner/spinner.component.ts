import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent implements OnInit {
  @Input() top;
  @Input() background = "rgba(0, 0, 0, 0.5)";

  constructor() {}

  ngOnInit() {}
}

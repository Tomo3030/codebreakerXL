import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-speaker",
  templateUrl: "./speaker.component.html",
  styleUrls: ["./speaker.component.scss"]
})
export class SpeakerComponent implements OnInit {
  @Input() correctAnswer;
  @Input() addPoint: Boolean;
  //addPoint;

  constructor() {}

  ngOnInit() {}

  // togglePoint() {
  //   this.addPoint = !this.addPoint;
  // }
}

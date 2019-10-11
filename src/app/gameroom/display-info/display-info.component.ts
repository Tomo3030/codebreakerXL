import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { timer } from "rxjs";

@Component({
  selector: "app-display-info",
  templateUrl: "./display-info.component.html",
  styleUrls: ["./display-info.component.scss"]
})
export class DisplayInfoComponent implements OnInit {
  timeRemaining = 25;
  timeDisplay;
  timeSubscription;
  blink;
  @Input() score = 0;
  @Output() timerFinished = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.blink = false;
    const source = timer(0, 1000);
    this.timeSubscription = source.subscribe(() => {
      this.timeRemaining--;
      let min = Math.floor(this.timeRemaining / 60);
      let sec = this.timeRemaining - min * 60;
      this.timeDisplay = min + ":" + this.str_pad_left(sec, "0", 2);
      if (this.timeRemaining < 10) {
        this.blink = true;
      }
      if (this.timeRemaining <= 0) {
        //this.blink = false;
        this.stopTimer();
      }
    });
  }

  stopTimer() {
    this.timerFinished.emit();
    this.timeSubscription.unsubscribe();
  }

  str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  transferArrayItem,
  moveItemInArray,
  CdkDragDrop
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.scss"]
})
export class OrganizerComponent implements OnInit {
  @Input() currentDisplayArray;
  @Input() addPoint;
  @Input() shake;
  @Input() answerArray;
  @Output() submitAnswer = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onDrop(e: CdkDragDrop<string[]>) {
    if (e.previousContainer !== e.container) {
      transferArrayItem(
        e.previousContainer.data,
        e.container.data,
        e.previousIndex,
        //e.currentIndex
        e.container.data.length
      );
    } else {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    }
  }

  submit() {
    this.submitAnswer.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  transferArrayItem,
  moveItemInArray,
  CdkDragDrop,
  CdkDrag
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
  @Output() maxLength = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onDrop(e: CdkDragDrop<string[]>) {
    if (e.container.id === "cdk-drop-list-0" && e.container.data.length > 5) {
      this.maxLength.emit();
      return;
    }
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

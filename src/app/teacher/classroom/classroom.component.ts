import { ClassroomService } from "./../classroom.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-classroom",
  templateUrl: "./classroom.component.html",
  styleUrls: ["./classroom.component.scss"]
})
export class ClassroomComponent implements OnInit {
  loading;
  gameCategories = ["All", "Shapes", "Expressions", "Flags"];
  categories = [
    { cat: "All", disabled: false },
    { cat: "Shapes", disabled: true },
    { cat: "Expressions", disabled: true },
    { cat: "Flags", disabled: true },
    { cat: "Colors", disabled: true },
    { cat: "Jobs", disabled: true },
    { cat: "Feelings", disabled: true }
  ];

  constructor(
    private classroomService: ClassroomService,
    private router: Router
  ) {}

  ngOnInit() {}

  createClassroom() {
    this.loading = true;
    this.classroomService.createClassroom().then(classroomId => {
      this.router.navigateByUrl("/teacher/display/" + classroomId);
      this.loading = false;
    });
  }
}

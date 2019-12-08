import { UserService } from "./../user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-classroom",
  templateUrl: "./classroom.component.html",
  styleUrls: ["./classroom.component.scss"]
})
export class ClassroomComponent implements OnInit {
  spinner;
  shake;
  pinned;

  constructor(
    private userService: UserService,
    private router: Router,
    public snack: MatSnackBar
  ) {}

  ngOnInit() {}

  async submit() {
    const classroom = await this.userService.checkIfClassroomExists(
      this.pinned
    );
    if (classroom.exists)
      this.router.navigate([`/login`, { classroomId: this.pinned }]);
    else this.wrongPin();
  }

  keyUp() {
    if (this.pinned >= 1) this.shake = false;
    if (this.pinned >= 6) {
      let p = this.pinned.toString().substring(6, 0);
      this.pinned = parseInt(p);
    }
  }

  private wrongPin() {
    this.pinned = "";
    this.shake = true;
    this.openSnack();
  }

  openSnack(data = "Not a valid classroom Id, Try again.") {
    this.snack.open(data, null, {
      duration: 5000
    });
  }
}

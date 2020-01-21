import { SharedService } from "./../../shared/shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-anonymous-login",
  templateUrl: "./anonymous-login.component.html",
  styleUrls: ["./anonymous-login.component.scss"]
})
export class AnonymousLoginComponent implements OnInit {
  form;
  classroomId;

  user;
  spinner;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {}
  async ngOnInit() {
    this.classroomId = this.activatedRoute.snapshot.paramMap.get("classroomId");
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]]
    });
    this.user = await this.sharedService.getUserPromise();
    if (this.user) {
      this.userService.addUserToClassroom(
        this.user.displayName,
        this.classroomId,
        this.user.uid
      );
      this.router.navigate(["/lounge", { classroomId: this.classroomId }]);
    }
  }
  onSubmit() {
    this.spinner = true;
    if (this.name.value.length > 2) {
      console.log(this.name.value);
      this.userService
        .anonymousSignIn(this.name.value, this.classroomId)
        .then(() => {
          this.router.navigate(["/lounge", { classroomId: this.classroomId }]);
        });
    } else {
      this.spinner = false;
    }
  }

  get name() {
    return this.form.get("name");
  }
}

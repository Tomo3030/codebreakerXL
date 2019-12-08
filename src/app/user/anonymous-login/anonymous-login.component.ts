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
  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit() {
    this.form = this.fb.group({
      name: ["", [Validators.required]]
    });
  }
  onSubmit() {
    console.log("aaa");
  }
}

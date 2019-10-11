import { UserService } from "./../user.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form;
  serverMessage;
  @Output() toggle = new EventEmitter();
  @Output() toggleLoading = new EventEmitter();

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(6), Validators.required]]
    });
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  onSubmit() {
    this.toggleLoading.emit();
    this.userService
      .logInUser(this.email.value, this.password.value)
      .then(x => {
        this.toggleLoading.emit();
      })
      .catch(error => {
        this.toggleLoading.emit();
        this.serverMessage = error;
      });
  }

  toggleLanding() {
    this.toggle.emit();
  }
}

import { UserService } from "./../user.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-landing",
  templateUrl: "./login-landing.component.html",
  styleUrls: ["./login-landing.component.scss"]
})
export class LoginLandingComponent implements OnInit {
  user;
  loading;
  toggleLogin = true;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.user = this.afAuth.user;
  }

  toggleLanding() {
    this.toggleLogin = !this.toggleLogin;
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
}

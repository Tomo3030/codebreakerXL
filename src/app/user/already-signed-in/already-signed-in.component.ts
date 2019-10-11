import { UserService } from "./../user.service";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-already-signed-in",
  templateUrl: "./already-signed-in.component.html",
  styleUrls: ["./already-signed-in.component.scss"]
})
export class AlreadySignedInComponent implements OnInit {
  user;
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.afAuth.authState;
  }

  logOut() {
    this.userService.signOut();
  }
}

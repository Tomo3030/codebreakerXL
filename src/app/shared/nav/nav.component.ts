import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  user$;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async ngOnInit() {
    this.user$ = this.afAuth.authState;
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl("/");
  }
}

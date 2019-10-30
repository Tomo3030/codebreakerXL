import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  user$;
  authstate$;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async ngOnInit() {
    this.user$ = this.afAuth.authState;
    this.authstate$ = this.afAuth.authState.pipe(
      switchMap(authstate => {
        if (authstate) return authstate.getIdTokenResult();
        return of(null);
      })
    );
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl("/");
  }
}

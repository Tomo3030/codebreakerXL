import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { take, switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class TeacherGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public snack: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(async authState => {
        if (authState) {
          // check are user is logged in
          const token = await authState.getIdTokenResult();
          if (!token.claims.teacher) {
            // check claims
            this.router.navigate(["/"]);
            this.snack.open("You need TEACHER status to enter", null, {
              duration: 5000
            });
            return false;
          } else {
            return true;
          }
        } else {
          this.router.navigate(["/"]);
          this.snack.open("You need TEACHER status to enter", null, {
            duration: 5000
          });
          return false;
        }
      })
    );
  }
}

import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
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
          if (!token.claims.admin) {
            console.log(token);
            console.log("yes");
            this.router.navigate(["/"]);
            this.snack.open("You need ADMIN status to enter", null, {
              duration: 5000
            });
            return false;
          } else {
            return true;
          }
        } else {
          this.router.navigate(["/"]);
          this.snack.open("You need admin status to enter", null, {
            duration: 5000
          });
          return false;
        }
      })
    );
  }
}

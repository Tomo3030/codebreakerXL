import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
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
      map(user => {
        if (user) return true;
        else {
          this.router.navigate(["/"]);
          return false;
        }
      })
    );
  }
}

import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { switchMap, first } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  user$;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return of(user);
        } else {
          return of(null);
        }
      })
    );
  }

  getUserPromise() {
    return this.user$.pipe(first()).toPromise();
  }
}

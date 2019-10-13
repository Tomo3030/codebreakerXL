import { MembersDialogComponent } from "./../dialogs/members-dialog.component";
import { GameService } from "./../game.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { take } from "rxjs/operators";

@Component({
  selector: "app-join",
  templateUrl: "./join.component.html",
  styleUrls: ["./join.component.scss"]
})
export class JoinComponent implements OnInit, OnDestroy {
  pinned;
  shake;
  spinner;
  gameSubscription;

  constructor(
    private gameService: GameService,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }

  submit() {
    //this.openDialog();
    if (!this.pinned || this.pinned <= 99999) {
      this.openSnack("You need 6 number in your pin!");
      return this.wrongPin();
    }
    this.spinner = true;
    this.gameSubscription = this.gameService
      .getGame(this.pinned.toString())
      .pipe(take(1))
      .subscribe(game => {
        if (game && !game.joiner) {
          console.log("game exists");
          this.gameService.joinGame(this.pinned.toString());
          const otherPlayer = game.creator;
          //console.log(this.otherPlayer);
          let data = {
            //name: this.otherPlayer.name,
            email: otherPlayer.email,
            //uid: this.otherPlayer.uid,
            gameId: this.pinned,
            creator: false
          };
          return this.openDialog(data);
        } else if (game && game.joiner) {
          this.spinner = false;
          this.openSnack("This game already has 2 players");
          return this.wrongPin();
        } else {
          this.spinner = false;
          this.openSnack();
          this.wrongPin();
        }
      });
  }

  keyUp() {
    if (this.pinned >= 1) this.shake = false;
    if (this.pinned >= 6) {
      let p = this.pinned.toString().substring(6, 0);
      this.pinned = parseInt(p);
    }
  }

  private wrongPin() {
    // need to make a toast explaining problem. Need to include whether there is already 2 players in game
    this.pinned = "";
    this.shake = true;
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(MembersDialogComponent, {
      data: { ...data }
    });
  }

  openSnack(data = "No game exists with that pin") {
    this.snack.open(data, null, {
      duration: 5000
    });
  }
}

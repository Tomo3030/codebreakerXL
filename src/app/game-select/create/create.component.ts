import { GameService } from "./../game.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MembersDialogComponent } from "../dialogs/members-dialog.component";
import { MatDialog } from "@angular/material";
import { take } from "rxjs/operators";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit, OnDestroy {
  gameId;
  gameSubscription;
  classroomId;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.classroomId = this.activatedRoute.snapshot.paramMap.get("classroomId");
    this.gameId = this.activatedRoute.snapshot.paramMap.get("gameId");
    this.gameSubscription = this.gameService
      .getGame(this.gameId)
      .pipe(take(2))
      .subscribe(gameInfo => {
        console.log(gameInfo);
        if (gameInfo.joiner) {
          const otherPlayer = gameInfo.joiner;
          let data = {
            email: otherPlayer.email,
            gameId: this.gameId,
            creator: true,
            classroomId: this.classroomId
          };
          this.openDialog(data);
        }
      });
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(MembersDialogComponent, {
      data: { ...data }
    });
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }
}

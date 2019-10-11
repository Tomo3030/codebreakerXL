import { user } from "./../../shared/user";
import { gameData } from "./../../shared/gameData";
import { GameService } from "./../game.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { MembersDialogComponent } from "../dialogs/members-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit, OnDestroy {
  gameId;
  gameSubscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.gameId = this.activatedRoute.snapshot.paramMap.get("gameId");
    this.gameSubscription = this.gameService
      .getGame(this.gameId)
      .subscribe(gameInfo => {
        console.log(gameInfo);
        if (gameInfo.joiner) {
          const otherPlayer = gameInfo.joiner;
          let data = {
            email: otherPlayer.email,
            gameId: this.gameId,
            creator: true
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

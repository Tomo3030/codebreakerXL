import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game-select",
  templateUrl: "./game-select.component.html",
  styleUrls: ["./game-select.component.scss"]
})
export class GameSelectComponent implements OnInit {
  loading;
  classroomId;
  constructor(
    private gameService: GameService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.classroomId = this.activatedRoute.snapshot.paramMap.get("classroomId");
  }

  createGame() {
    this.loading = true;
    this.gameService.createGame().then(gameId => {
      this.navigateToGame(gameId);
    });
  }

  navigateToGame(gameId) {
    //   if (this.classroomId)
    //     this.router.navigate([
    //       "/class/" + this.classroomId + "/gameselect/create/" + gameId
    //     ]);
    //   else this.router.navigate(["/gameselect/create/" + gameId]);
    // }
    this.router.navigate([
      "/gameselect/create/" + gameId,
      {
        classroomId: this.classroomId
      }
    ]);
  }
}

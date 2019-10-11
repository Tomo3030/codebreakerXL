import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-game-select",
  templateUrl: "./game-select.component.html",
  styleUrls: ["./game-select.component.scss"]
})
export class GameSelectComponent implements OnInit {
  loading;
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {}

  createGame() {
    this.loading = true;
    this.gameService.createGame().then(gameId => {
      this.router.navigate(["/gameselect/create/" + gameId]);
    });
  }
}

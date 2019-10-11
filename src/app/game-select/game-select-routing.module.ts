import { JoinComponent } from "./join/join.component";
import { GameSelectComponent } from "./game-select/game-select.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
  { path: "", component: GameSelectComponent },
  { path: "create/:gameId", component: CreateComponent },
  { path: "gameselect/join", component: JoinComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameSelectRoutingModule {}

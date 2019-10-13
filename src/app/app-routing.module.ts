import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule)
  },
  {
    path: "gameselect",
    loadChildren: () =>
      import("./game-select/game-select.module").then(m => m.GameSelectModule)
  },
  {
    path: "game",
    loadChildren: () => import("./game/game.module").then(m => m.GameModule)
  },
  {
    path: "score",
    loadChildren: () => import("./score/score.module").then(m => m.ScoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

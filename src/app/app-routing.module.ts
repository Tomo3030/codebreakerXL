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
    path: "gameroom",
    loadChildren: () =>
      import("./gameroom/gameroom.module").then(m => m.GameroomModule)
  },
  {
    path: "game",
    loadChildren: () => import("./game/game.module").then(m => m.GameModule),
    runGuardsAndResolvers: "paramsChange"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

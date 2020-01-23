import { MakePuzzleComponent } from "./make-puzzle/make-puzzle.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdminPanelComponent
  },
  {
    path: "make-puzzle",
    component: MakePuzzleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

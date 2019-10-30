import { DisplayInfoComponent } from "./display-info/display-info.component";
import { ClassroomComponent } from "./classroom/classroom.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "score/:classroomId",
    component: ScoreboardComponent
  },
  {
    path: "classroom",
    component: ClassroomComponent
  },
  {
    path: "display/:classroomId",
    component: DisplayInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}

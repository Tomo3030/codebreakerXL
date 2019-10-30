import { ClassroomComponent } from "./classroom/classroom.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginLandingComponent } from "./login-landing/login-landing.component";

const routes: Routes = [
  { path: "", component: LoginLandingComponent },
  { path: "classroom", redirectTo: "#/classroom" },
  { path: "classroom", component: ClassroomComponent },
  { path: "classroom/:classroomId", component: LoginLandingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

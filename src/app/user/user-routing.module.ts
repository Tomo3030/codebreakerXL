import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginLandingComponent } from "./login-landing/login-landing.component";

const routes: Routes = [{ path: "", component: LoginLandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

import { TeacherGuard } from "./guard/teacher.guard";
import { AuthGuard } from "./guard/auth.guard";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "./guard/admin.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule)
  },
  {
    path: "gameselect",
    loadChildren: () =>
      import("./game-select/game-select.module").then(m => m.GameSelectModule),
    canActivate: [AuthGuard]
  },
  {
    path: "class/:classroomId/gameselect",
    loadChildren: () =>
      import("./game-select/game-select.module").then(m => m.GameSelectModule),
    canActivate: [AuthGuard]
  },
  {
    path: "game",
    loadChildren: () => import("./game/game.module").then(m => m.GameModule),
    canActivate: [AuthGuard]
  },
  {
    path: "class/:classroomId/game",
    loadChildren: () => import("./game/game.module").then(m => m.GameModule),
    canActivate: [AuthGuard]
  },

  {
    path: "teacher",
    loadChildren: () =>
      import("./teacher/teacher.module").then(m => m.TeacherModule),
    canActivate: [AuthGuard, TeacherGuard]
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

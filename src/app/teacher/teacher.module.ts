import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeacherRoutingModule } from "./teacher-routing.module";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { SharedModule } from "../shared/shared.module";
import { ClassroomComponent } from "./classroom/classroom.component";
import { MatSelectModule } from "@angular/material/select";
import { DisplayInfoComponent } from "./display-info/display-info.component";
import { MatTabsModule } from "@angular/material/tabs";
import { JoinInfoComponent } from "./join-info/join-info.component";
import { QRCodeModule } from "angular2-qrcode";

@NgModule({
  declarations: [
    ScoreboardComponent,
    ClassroomComponent,
    DisplayInfoComponent,
    JoinInfoComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
    MatSelectModule,
    MatTabsModule,
    QRCodeModule
  ]
})
export class TeacherModule {}

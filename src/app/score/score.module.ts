import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ScoreRoutingModule } from "./score-routing.module";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [CommonModule, ScoreRoutingModule, SharedModule]
})
export class ScoreModule {}

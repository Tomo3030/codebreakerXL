import { GameSpeakerComponent } from "./game-speaker/game-speaker.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameOrganizerComponent } from "./game-organizer/game-organizer.component";

const routes: Routes = [
  { path: "speaker/:gameId", component: GameSpeakerComponent },
  { path: "organizer/:gameId", component: GameOrganizerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameroomRoutingModule {}

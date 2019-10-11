import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GameroomRoutingModule } from "./gameroom-routing.module";

import { GameSpeakerComponent } from "./game-speaker/game-speaker.component";
import { GameOrganizerComponent } from "./game-organizer/game-organizer.component";
import { SharedModule } from "../shared/shared.module";
import { DisplayInfoComponent } from "./display-info/display-info.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GameDialogComponent } from './game-dialog.component';

@NgModule({
  declarations: [
    GameSpeakerComponent,
    GameOrganizerComponent,
    DisplayInfoComponent,
    GameDialogComponent
  ],
  imports: [CommonModule, GameroomRoutingModule, SharedModule, DragDropModule],
  entryComponents: [GameDialogComponent]
})
export class GameroomModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GameRoutingModule } from "./game-routing.module";
import { OrganizerComponent } from "./organizer/organizer.component";
import { SpeakerComponent } from "./speaker/speaker.component";
import { InfoComponent } from "./info/info.component";
import { SharedModule } from "../shared/shared.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GameShellComponent } from "./game-shell/game-shell.component";
import { NextRoundDialogComponent } from "./dialogs/next-round-dialog.component";
import { EndGameDialogComponent } from "./dialogs/end-game-dialog.component";
import { InstructionDialogComponent } from './dialogs/instruction-dialog.component';

@NgModule({
  declarations: [
    OrganizerComponent,
    SpeakerComponent,
    InfoComponent,
    GameShellComponent,
    NextRoundDialogComponent,
    EndGameDialogComponent,
    InstructionDialogComponent
  ],
  imports: [CommonModule, GameRoutingModule, SharedModule, DragDropModule],
  entryComponents: [NextRoundDialogComponent, EndGameDialogComponent, InstructionDialogComponent]
})
export class GameModule {}

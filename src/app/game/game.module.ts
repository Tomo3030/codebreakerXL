import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GameRoutingModule } from "./game-routing.module";
import { ShellComponent } from "./shell/shell.component";
import { OrganizerComponent } from "./organizer/organizer.component";
import { SpeakerComponent } from "./speaker/speaker.component";
import { InfoComponent } from "./info/info.component";
import { SharedModule } from "../shared/shared.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { EndDialogComponent } from "./end-dialog.component";

@NgModule({
  declarations: [
    ShellComponent,
    OrganizerComponent,
    SpeakerComponent,
    InfoComponent,
    EndDialogComponent
  ],
  imports: [CommonModule, GameRoutingModule, SharedModule, DragDropModule],
  entryComponents: [EndDialogComponent]
})
export class GameModule {}

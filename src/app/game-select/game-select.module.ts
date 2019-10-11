import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GameSelectRoutingModule } from "./game-select-routing.module";
import { GameSelectComponent } from "./game-select/game-select.component";
import { CreateComponent } from "./create/create.component";
import { JoinComponent } from "./join/join.component";
import { IdDisplayComponent } from "./id-display/id-display.component";
import { MembersDialogComponent } from "./dialogs/members-dialog.component";
import { MatDialogModule, MatSnackBarModule } from "@angular/material";

@NgModule({
  declarations: [
    GameSelectComponent,
    CreateComponent,
    JoinComponent,
    IdDisplayComponent,
    MembersDialogComponent
  ],
  imports: [
    CommonModule,
    GameSelectRoutingModule,
    SharedModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [MembersDialogComponent]
})
export class GameSelectModule {}

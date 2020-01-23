import { MatSelectModule } from "@angular/material/select";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { SharedModule } from "../shared/shared.module";
import { AdminDialogComponent } from "./admin-dialog.component";
import { MakePuzzleComponent } from "./make-puzzle/make-puzzle.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatGridListModule } from "@angular/material";

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminDialogComponent,
    MakePuzzleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatSelectModule,
    DragDropModule,
    MatGridListModule
  ],
  entryComponents: [AdminDialogComponent]
})
export class AdminModule {}

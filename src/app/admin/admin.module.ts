import { MatSelectModule } from "@angular/material/select";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { SharedModule } from "../shared/shared.module";
import { AdminDialogComponent } from './admin-dialog.component';

@NgModule({
  declarations: [AdminPanelComponent, AdminDialogComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, MatSelectModule],
  entryComponents: [AdminDialogComponent]
})
export class AdminModule {}

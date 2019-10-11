import { AngularFireAuth } from "@angular/fire/auth";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatDialogModule
} from "@angular/material";
import { LayoutModule } from "@angular/cdk/layout";
import { NavComponent } from "./nav/nav.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { FormsModule } from "@angular/forms";

const components = [NavComponent, SpinnerComponent];

const modules = [
  FormsModule,
  MatInputModule,
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components]
})
export class SharedModule {}

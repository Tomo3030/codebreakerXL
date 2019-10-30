import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { LoginComponent } from "./login/login.component";

import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { LoginLandingComponent } from "./login-landing/login-landing.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { AlreadySignedInComponent } from "./already-signed-in/already-signed-in.component";
import { ClassroomComponent } from './classroom/classroom.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginLandingComponent,
    CreateAccountComponent,
    AlreadySignedInComponent,
    ClassroomComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class UserModule {}

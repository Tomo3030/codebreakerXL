import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { LoginComponent } from "./login/login.component";

import { ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule
} from "@angular/material";
import { LoginLandingComponent } from "./login-landing/login-landing.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { AlreadySignedInComponent } from "./already-signed-in/already-signed-in.component";
import { ClassroomComponent } from "./classroom/classroom.component";
import { AnonymousLoginComponent } from "./anonymous-login/anonymous-login.component";
import { LoungeComponent } from "./lounge/lounge.component";
import { PartnerRequestComponent } from "./dialog/partner-request/partner-request.component";
import { PartnerRejectComponent } from "./dialog/partner-reject/partner-reject.component";

@NgModule({
  declarations: [
    LoginComponent,
    LoginLandingComponent,
    CreateAccountComponent,
    AlreadySignedInComponent,
    ClassroomComponent,
    AnonymousLoginComponent,
    LoungeComponent,
    PartnerRequestComponent,
    PartnerRejectComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  entryComponents: [PartnerRequestComponent, PartnerRejectComponent]
})
export class UserModule {}

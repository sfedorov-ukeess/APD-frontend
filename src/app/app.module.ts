import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login/login.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ForgotPassComponent } from './components/pages/login/forgot-pass/forgot-pass.component';
import { ModalComponent } from './components/modal/modal.component';
import { ByPhoneComponent } from './components/pages/register/by-phone/by-phone.component';
import { ByInvitationComponent } from './components/pages/register/by-invitation/by-invitation.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    ForgotPassComponent,
    ModalComponent,
    ByPhoneComponent,
    ByInvitationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

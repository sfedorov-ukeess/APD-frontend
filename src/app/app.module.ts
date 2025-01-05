import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule, AuthGuard} from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login/login.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ForgotPassComponent } from './components/pages/login/forgot-pass/forgot-pass.component';
import { ByPhoneComponent } from './components/pages/register/by-phone/by-phone.component';
import { ByInvitationComponent } from './components/pages/register/by-invitation/by-invitation.component';
import {FormsModule} from "@angular/forms";
import { AlertComponent } from './components/shared/alert/alert.component';
import { DataVerifyComponent } from './components/pages/register/data-verify/data-verify.component';
import { PinCreationComponent } from './components/pages/register/pin-creation/pin-creation.component';
import { ValidatorDirective } from './directives/validator/validator.directive';
import { MainComponent } from './components/pages/apd/main.component';
import { PinComponent } from './components/shared/pin/pin.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { ApdBlockComponent } from './components/shared/apd-block/apd-block.component';
import { PeopleComponent } from './components/pages/people/people.component';
import { SearchFieldComponent } from './components/shared/search-field/search-field.component';
import { GroupsMainComponent } from './components/pages/groups/groups-main/groups-main.component';
import { ReviewCardComponent } from './components/shared/review-card/review-card.component';
import { ChartComponent } from './components/shared/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    ForgotPassComponent,
    ByPhoneComponent,
    ByInvitationComponent,
    AlertComponent,
    DataVerifyComponent,
    PinCreationComponent,
    MainComponent,
    PinComponent,
    MenuComponent,
    ApdBlockComponent,
    PeopleComponent,
    SearchFieldComponent,
    GroupsMainComponent,
    ReviewCardComponent,
    ChartComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ValidatorDirective
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

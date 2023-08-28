import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/pages/landing/landing.component";
import {LoginComponent} from "./components/pages/login/login/login.component";
import {ByPhoneComponent} from "./components/pages/register/by-phone/by-phone.component";
import {ByInvitationComponent} from "./components/pages/register/by-invitation/by-invitation.component";
import {ForgotPassComponent} from "./components/pages/login/forgot-pass/forgot-pass.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LandingComponent
  },
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "forgot_pass",
    pathMatch: "full",
    component: ForgotPassComponent
  },
  {
    path: "register/phone",
    pathMatch: "full",
    component: ByPhoneComponent
  },
  {
    path: "register/invitation",
    pathMatch: "full",
    component: ByInvitationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

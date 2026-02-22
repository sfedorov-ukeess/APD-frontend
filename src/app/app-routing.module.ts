import {Inject, Injectable, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import {LandingComponent} from "./components/pages/landing/landing.component";
import {LoginComponent} from "./components/pages/login/login/login.component";
import {ByPhoneComponent} from "./components/pages/register/by-phone/by-phone.component";
import {ByInvitationComponent} from "./components/pages/register/by-invitation/by-invitation.component";
import {ForgotPassComponent} from "./components/pages/login/forgot-pass/forgot-pass.component";
import {DataVerifyComponent} from "./components/pages/register/data-verify/data-verify.component";
import {PinCreationComponent} from "./components/pages/register/pin-creation/pin-creation.component";
import {MainComponent} from "./components/pages/apd/main.component";
import {GlobalSignalService} from "./services/globalSignalService/global-signal-service.service";
import {Router} from "@angular/router";
import {PeopleComponent} from "./components/pages/people/people.component";
import {GroupsMainComponent} from "./components/pages/groups/groups-main/groups-main.component";
import { ApdPageComponent } from './components/pages/apd/apd/apd.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ReportsComponent } from './components/pages/reports/reports.component';

@Injectable()
export class AuthGuard
  implements CanActivate {
  constructor(
    private GSS: GlobalSignalService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean { return true;
    if (this.GSS.get("token")) {
      return true;
    };
    this.router.navigate(['/']);
    return false;
  }
}


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
  },
  {
    path: "register/data-verify",
    pathMatch: "full",
    component: DataVerifyComponent
  },
  {
    path: "register/pin-creation",
    pathMatch: "full",
    component: PinCreationComponent
  },
  {
    path: "people",
    pathMatch: "full",
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "groups",
    pathMatch: "full",
    component: GroupsMainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "apd",
    pathMatch: "full",
    component: ApdPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    pathMatch: "full",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reports",
    pathMatch: "full",
    component: ReportsComponent,
    canActivate: [AuthGuard]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

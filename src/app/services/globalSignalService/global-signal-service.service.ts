import {EventEmitter, Injectable} from '@angular/core';
import {TokenData, UserData, ParamNames} from "../../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class GlobalSignalService {
  private alertDuration: number = 10000;
  private isAlertShown: boolean = false;
  showAlertEvent = new EventEmitter();
  private isMenuShown: string = "";
  showMenuEvent = new EventEmitter();
  private spinner: number = 0;
  showSpinnerEvent = new EventEmitter();

  get: any = (paramName: ParamNames) => this[paramName];
  // @ts-ignore
  set: any = (paramName: ParamNames, data: any) => {
    switch(true) {
      case(typeof data === "string" || typeof data === "number"): {
        this[paramName] = data;
        break;
      }
      default: this[paramName] =
        Object.keys(data).length ? {
          ...this[paramName],
          ...data
        } : {};
    }
  }

  getShortPhone (phone: string): string {
    return phone.replace(/\+?380/gi, "");
  }

  private token: string = "";

  private userData: UserData = {
    name: "",
    surname: "",
    inviteCode: "",
    email: "",
    phone: "",
    shortPhone: "",
    password: "",
    passConfirmation: "",
    confirmationId: "",
    code:"",
    accessCode: "",
    forceCode: ""
  };

  private tokenData: TokenData = {
    hash1: "",
    hash2: "",
    refreshToken: "",
    refreshTokenExpiredIn: undefined,
    token: "",
    tokenExpiredIn: undefined
  };

  getFormattedDate(param: any) {
    const date = new Date(param);
    return date.getDate().toString().concat(
        ".",
        (date.getMonth() + 1).toString(),
        ".",
        date.getFullYear().toString()
    );
  }

  constructor() {
    this.showAlertEvent.subscribe(state => {
      this.isAlertShown = !!state;
    });
    this.showMenuEvent.subscribe(state => {
      this.isMenuShown = state;
    });
  }
}

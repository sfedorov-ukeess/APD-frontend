import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from "rxjs";
import environment from "../../../environments/environment";
import {GlobalSignalService} from "../globalSignalService/global-signal-service.service";
import {ParamNames} from "../../interfaces/interfaces";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class APIService {

  options: object = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };

  constructor(
    private http: HttpClient,
    private GSS: GlobalSignalService,
    private router: Router
  ) {
  }

  getShortPhone(phone: string): string {
    return this.getShortPhone(phone);
  }

  getAuthorizedOptions() {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + this.GSS.get("token")
      }
    };
  }

  useHttp(method: string, url: string, body = {}, options: Object = {}): Observable<any> {
    let result;
    this.GSS.showSpinnerEvent.emit(true);
    switch (method) {
      case "POST": {
        result = this.http.post(
          environment.baseApiURL + url,
          body,
          options
        );
        break;
      }
      case "DELETE": {
        result = this.http.delete(
          environment.baseApiURL + url,
          options
        );
        break;
      }
      default: {
        result = this.http.get(
          environment.baseApiURL + url,
          options
        );
      }
    }
    ;

    return result
      .pipe(
        tap((res): void => {
          this.GSS.showSpinnerEvent.emit(false);
        }),
        catchError((error) => {
            this.GSS.showSpinnerEvent.emit(false);
            if (error.status === 0) {
              this.GSS.showAlertEvent.emit({
                type: "error",
                text: error.message
              });
            } else {
              let text: string;
              switch (error.status) {
                case 401: {
                  text = "Неавторизований користувач.";
                  if (!this.GSS.get("token")) {
                    this.router.navigate(["/"]);
                  }
                  ;
                  break;
                }

                default:
                  text = `Backend returned error: ${error.message} with code ${error.status}`;
              }

              this.GSS.showAlertEvent.emit({
                type: "error",
                text
              });
            }
            return throwError(() => new Error('Щось пішло не так. Спробуйте пізніше.'));
          }
        )
      );
  }

  getTokenByCredentials(userIdentity: string, password: string): Observable<object> {
    return this.useHttp(
      "POST",
      "register/login",
      {
        userIdentity,
        password
      },
      this.options
    );
  }

  requestConfirmation(): Observable<any> {
    const {shortPhone} = this.GSS.get(ParamNames.userData);
    return this.useHttp(
      "POST",
      "register/request-confirmation",
      {
        phone: shortPhone
      },
      this.options
    );
  }

  getValidationEmail(): Observable<any> {
    const {email} = this.GSS.get(ParamNames.userData);
    return this.useHttp(
      "POST",
      "register/send-confirmation-email",
      {
        email
      },
      this.options
    );
  }

  validatePhoneCode(): Observable<any> {
    const {code, shortPhone, confirmationId} = this.GSS.get(ParamNames.userData);
    return this.useHttp(
      "POST",
      "register/validate-confirmation",
      {
        phone: shortPhone,
        code,
        confirmationId
      },
      this.options
    );
  }

  validateEmailCode(code: string): Observable<any> {
    const {email} = this.GSS.get(ParamNames.userData);
    return this.useHttp(
      "POST",
      "register/confirm-email",
      {
        email,
        code
      },
      this.options
    );
  }

  createUser(): Observable<any> {
    const {
      name,
      surname,
      email,
      shortPhone,
      password,
      confirmationId,
      code,
      accessCode,
      forceCode
    } = this.GSS.get(ParamNames.userData);

    return this.useHttp(
      "POST",
      "register/create-by-confirmation",
      {
        name,
        surname,
        email,
        phone: shortPhone,
        password,
        confirmationId,
        code,
        accessCode,
        forceCode
      },
      this.options
    );
  }

  validateInvite(): Observable<any> {
    const {inviteCode, email} = this.GSS.get(ParamNames.userData);
    return this.useHttp(
      "POST",
      "register/validate-invite",
      {
        inviteCode,
        email
      },
      this.options
    );
  }

  createUserByInvite(): Observable<any> {
    const {
      name,
      surname,
      inviteCode,
      email,
      phone,
      password,
      accessCode,
      forceCode
    } = this.GSS.get(ParamNames.userData);
    return this.useHttp(
      "POST",
      "register/create-by-invite",
      {
        name,
        surname,
        inviteCode,
        email,
        phone,
        password,
        accessCode,
        forceCode
      },
      this.options
    );
  }

  sendRecoveryCode(userIdentity: string, notificationChannelType: "SMS" | "TYPE"): Observable<any> {
    return this.useHttp(
      "POST",
      "recovery/recover",
      {
        userIdentity,
        notificationChannelType
      },
      this.options
    );
  }

  checkRecoveryPin(userIdentity: string, pinCode: string): Observable<any> {
    return this.useHttp(
      "POST",
      "recovery/recover",
      {
        userIdentity,
        pinCode
      },
      this.options
    );
  }


  getUserList(groupUuid: string = ""): Observable<any> {
    return this.useHttp(
      "GET",
      "user/list" + (groupUuid ? "?groupUuid=" + groupUuid : ""),
      undefined,
      this.getAuthorizedOptions()
    );
  }

  getGrouplist(commonWith: string | null = null, onlyMy: boolean = false, includePeople: boolean = false, isArchived: boolean = false): Observable<any> {
    return this.useHttp(
      "GET",
      `group/list?onlyMy=${onlyMy}& commonWith=${commonWith}?includePeople=${includePeople.toString()}?isArchived=${isArchived}`,
      {},
      this.getAuthorizedOptions()
    );
  }

  getReviewlist(groupUuid: string | null = null, isArchived: boolean = false): Observable<any> {
    return this.useHttp(
      "GET",
      `/api/review/list?groupUuid=${groupUuid}?isArchived=${isArchived}`,
      {},
      this.getAuthorizedOptions()
    );
  }

  removePerson(userUuid: string): Observable<any> {
    return this.useHttp(
      "DELETE",
      `user/${userUuid}`,
      {},
      this.getAuthorizedOptions()
    )
  }

  invitePerson(user: any, groups: Array<any>): Observable<any> {
    return this.useHttp(
      "POST",
      `user/invite`,
      {
        groups,
        users: [
          {...user}
        ]
      },
      this.getAuthorizedOptions()
    )
  }

  createNewGroup(data: any): Observable <any> {
      return this.useHttp(
        "POST",
        `group/create`,
        data,
        this.getAuthorizedOptions()
      )
    }



  getInvitelist(): Observable<any> {
    return this.useHttp(
      "GET",
      `/invite/list`,
      {},
      this.getAuthorizedOptions()
    );
  }

  postCreateReview(obj: any): Observable<any> {
    return this.useHttp(
      "POST",
      "review/create",
      {...obj
      },
      this.getAuthorizedOptions()
    );
  }


  getSitTypes(): Observable<{ list: Array<object>}> {
    return this.useHttp(
      "GET",
      "situation/list",
      {},
      this.getAuthorizedOptions()
    );
  }
  getAreaList(): Observable<{ list: Array<any>}> {
    return this.useHttp(
      "GET",
      "experience-area/list",
      {},
      this.getAuthorizedOptions()
    );
  }
}

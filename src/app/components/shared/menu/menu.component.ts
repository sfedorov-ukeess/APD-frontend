import { Component } from '@angular/core';
import {GlobalSignalService} from "../../../services/globalSignalService/global-signal-service.service";
import {Router} from "@angular/router";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  list: Array<any> = [
    {"reports": "звіти"},
    {"groups": "групи"},
    {"apd": "АПД"},
    {"people": "люди"},
    {"profile": "профіль"}
  ];
  reportsIncluded: boolean = true;
  activeURL: string = "";

  constructor(
    private GSS: GlobalSignalService,
    private router: Router
  ) {
    GSS.showMenuEvent.subscribe(state => {
      this.activeURL = state;
      this.router.navigate(["/" + this.activeURL]);
    });
  }

  getClassName(item: object): string {
    const name =  Object.keys(item)[0];
    return (this.activeURL === name ? name + ' active' : name) as string
  }

  clickHandler(url: string) {
    this.activeURL = url;
    this.router.navigate(["/" + url]);
  }

  protected readonly Object = Object;
  protected readonly String = String;
}

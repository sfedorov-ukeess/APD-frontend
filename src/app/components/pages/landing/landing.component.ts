import {Component, OnInit} from '@angular/core';
import environment from "../../../../environments/environment";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
  ngOnInit() {
    console.log(environment)
  }

}

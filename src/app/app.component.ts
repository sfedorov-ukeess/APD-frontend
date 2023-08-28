import {Component, OnInit} from '@angular/core';
import environment from "../environments/environment";

const styleUrl = environment.colorTheme;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [styleUrl]
})
export class AppComponent {
  title = 'APD';
}

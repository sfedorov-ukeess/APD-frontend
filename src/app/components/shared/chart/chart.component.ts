import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() counter: any;
  protected percent: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.percent = Math.min(100, Math.ceil(this.counter * 100));
  }
}

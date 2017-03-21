import { IMonthViewDay } from './../calendar/calendar.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {

  @Input()
  dateInfo: IMonthViewDay;

  constructor() { }

  ngOnInit() {
  }

}

import { CalendarDayComponent } from './../calendar-day/calendar-day.component';
import { CalendarHeaderComponent } from './../calendar-header/calendar-header.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  @ViewChild('myheader')
  myheader1: CalendarHeaderComponent;

  // @ViewChild(Advcomp1HeaderComponent)
  // myheader2: Advcomp1HeaderComponent;

  views: IMonthView[] = [];
  currentDate: Date = new Date();
  today: Date = new Date();
  
  constructor() {

  }

  ngOnInit() {
    this.setMonthInfo();
  }

  setMonthInfo(){
      const MILLISECONDS_IN_DAY = 86400000;//一天的微秒數
      let YEAR = this.currentDate.getFullYear();//年
      let MONTH = this.currentDate.getMonth();//月

      let startDate = new Date(YEAR, MONTH, 1);//本月一日
      let endDate = new Date(YEAR, MONTH + 1, 0);//本月底

      const START_DAY = startDate.getDay();//本月一日是星期幾
      const END_DAY = endDate.getDay();//本月底是星期幾
      const END_DATE = endDate.getDate();
      startDate = START_DAY > 0 ? new Date(startDate.setDate(1 - START_DAY)) : startDate;//第一周的星期日
      endDate = END_DAY < 6 ? new Date(endDate.setDate(END_DATE + (6 - END_DAY))) : endDate;//最後一周的星期六

      let startDateMillsecond = startDate.getTime();//第一周的星期日的微秒數
      let endDateMillsecond = endDate.getTime();//最後一周的星期六的微秒數
      let totalDays = 0;//本月月曆要產生的總天數
      if (startDateMillsecond - endDateMillsecond > 0) {
          totalDays = Math.abs((startDateMillsecond - endDateMillsecond) / MILLISECONDS_IN_DAY) + 1;
      }
      else {
          totalDays = Math.abs((endDateMillsecond - startDateMillsecond) / MILLISECONDS_IN_DAY) + 1;
      }

      let days: IMonthViewDay[] = [];
      let showToday: boolean = true;//如果是當月，就要判斷是否為今天
      let isToday: boolean = false;//判斷選擇日期是否為今天

      for (let i = 0; i < totalDays; i++) {
          let date: Date = new Date(YEAR, MONTH, 1 - START_DAY + i, 0, 0, 0);
          let viewDay: IMonthViewDay = this.initMonthViewDay(date);
          //判斷是否為今天
          viewDay.isToday = this.isSameDay(date, new Date());
          days.push(viewDay);
      }

      //計算月曆行數
      const ROWS: number = Math.floor(days.length / 7);
      let rowOffsets: number[] = [];
      for (let i = 0; i < ROWS; i++) {
          rowOffsets.push(i * 7);
      }

      let view = {
        'rowOffsets': rowOffsets,
        'days': days
      };
      this.views[0] = view;
  }

  initMonthViewDay(date:Date): IMonthViewDay{
    return {
      date: date,
      isToday:false
    };
  }

  isSameDay(dirtyDateLeft: Date, dirtyDateRight:Date) {
      dirtyDateLeft.setHours(0, 0, 0, 0);
      dirtyDateRight.setHours(0, 0, 0, 0);

      return dirtyDateLeft.getTime() === dirtyDateRight.getTime();
  }
}

export interface IMonthView {
    //title: string;
    rowOffsets: number[];
    days: IMonthViewDay[];
}

export interface IMonthViewDay {
    date: Date;
    isToday: boolean;
}



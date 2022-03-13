import { makeArrayChunks } from './make-array-chunks'
import { addDay, dateDiffInDays } from './date.utils'

export class Calendarson {
  generateRawArray() { return }

  static generatePretty(from: Date, to: Date) {
    return generateMonthWithWeekCalendar(from, to);
  }
}

export interface Day {
  date: Date,
  disabled: boolean,
}

export interface Month {
  days: Day[],
  monthNum: number,
}

export interface MonthWithWeek {
  weeks: Day[][],
  month: number,
  year: number,
}

const generateRawMonth = (from: Date, to: Date): Day[][] => {
  const daysDiff = dateDiffInDays(from, to);

  const days: Day[] = makeDateArray(from, daysDiff + 1);

  return splitToWeeks(from, to, days);
}


const generateMonthWithWeekCalendar = (from: Date, to: Date): MonthWithWeek[] => {
  const daysDiff = dateDiffInDays(from, to);

  const days: Day[] = makeDateArray(from, daysDiff + 1);

  const year = splitToMonth(from, days);

  return year.map(month => {
    return {
      weeks: makeWeekCalendarArray(month),
      month: month.days[0].date.getMonth(),
      year: month.days[0].date.getFullYear(),
    } as MonthWithWeek
  });
}

const splitToMonth = (from: Date, days: Day[]): Month[] => {

  const firstMonth: { monthNum: number, days: Day[] } = {
    monthNum: from.getMonth(),
    days: []
  }

  console.log(firstMonth)


  return days.reduce((acc, day) => {
    let lastMonth = acc[acc.length - 1];

    if (day.disabled || day.date.getMonth() === lastMonth.monthNum) {
      lastMonth.days.push(day);
    } else {
      lastMonth = {
        monthNum: day.date.getMonth(),
        days: [day]
      };
      acc.push(lastMonth);
    }
    return acc;
  }, [firstMonth]);
}

const makeDateArray = (from: Date, length: number, disabled = false): Day[] => {
  return new Array(length).fill(null).map((_, index) => {
    return {
      date: addDay(from, index),
      disabled,
    }
  });
}

const makeWeekCalendarArray = (month: Month): Day[][] => {
  let days: Day[] = [];

  const from = month.days[0].date;
  const to = month.days[month.days.length - 1].date;

  const fromDay = from.getDay();
  // Case where to in the middle of the week. We need to add invisible or disabled days first
  if (fromDay !== 1) {
    // hack to fix sunday behaviour. It has 0 index, but should fill the rest with days.
    const weekDay = fromDay || 7;
    const length = weekDay - 1;
    const start = addDay(from, -length);
    days = [
      ...makeDateArray(start, length, true),
    ]
  }

  // fill normal case for from to "to" date
  days = [
    ...days,
    ...month.days
  ];

  const toDay = from.getDay();
  // add end of the week if the final day is not sunday
  if (toDay !== 0) {
    const length = 7 - toDay;
    days = [
      ...days,
      ...makeDateArray(addDay(to, 1), length, true)
    ]
  }

  return makeArrayChunks(days, 7);
}

const splitToWeeks = (from: Date, to: Date, externalDays: Day[]): Day[][] => {
  let days: Day[] = [];

  const fromDay = from.getDay();
  // Case where to in the middle of the week. We need to add invisible or disabled days first
  if (fromDay !== 1) {
    // hack to fix sunday behaviour. It has 0 index, but should fill the rest with days.
    const weekDay = fromDay || 7;
    const length = weekDay - 1;
    const start = addDay(from, -length);
    days = [
      ...makeDateArray(start, length, true),
    ]
  }

  // fill normal case for from to "to" date
  days = [
    ...days,
    ...externalDays
  ];

  const toDay = from.getDay();
  // add end of the week if the final day is not sunday
  if (toDay !== 0) {
    const length = 7 - toDay;
    days = [
      ...days,
      ...makeDateArray(addDay(to, 1), length, true)
    ]
  }

  return makeArrayChunks(days, 7);
}

const from = new Date('2020-01-20');
const to = new Date('2020-09-20');

console.log(Calendarson.generatePretty(from, to))
// console.log(makeDateArray(new Date(), 15));

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// Primitive function to add days;
export const addDay = (date: Date, days: number) => {
  console.log('ADD DAY', days);
  if (days === 0) { console.log("DATE!!!!", date) }

  if (days === 0) { return date }
  const added = days * _MS_PER_DAY;
  return new Date(date.getTime() + added);
}

const discardTimeAndZoneInfo = (date: Date): number => {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

// a and b are javascript Date objects
export const dateDiffInDays = (a: Date, b: Date): number => {
  // Discard the time and time-zone information.
  const utc1 = discardTimeAndZoneInfo(a);
  const utc2 = discardTimeAndZoneInfo(b);

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

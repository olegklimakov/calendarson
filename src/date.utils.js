"use strict";
exports.__esModule = true;
exports.dateDiffInDays = exports.addDay = void 0;
var _MS_PER_DAY = 1000 * 60 * 60 * 24;
// Primitive function to add days;
var addDay = function (date, days) {
    var newDate = new Date();
    newDate.setDate(date.getDate() + days);
    return newDate;
};
exports.addDay = addDay;
var discardTimeAndZoneInfo = function (date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};
// a and b are javascript Date objects
var dateDiffInDays = function (a, b) {
    // Discard the time and time-zone information.
    var utc1 = discardTimeAndZoneInfo(a);
    var utc2 = discardTimeAndZoneInfo(b);
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
exports.dateDiffInDays = dateDiffInDays;

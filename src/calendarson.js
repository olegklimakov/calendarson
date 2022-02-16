"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Calendarson = void 0;
var split_array_1 = require("./split-array");
var date_utils_1 = require("./date.utils");
var Calendarson = /** @class */ (function () {
    function Calendarson() {
    }
    Calendarson.prototype.generateRawArray = function () { return; };
    Calendarson.generatePretty = function (from, to) {
        return generateCalendar(from, to);
    };
    return Calendarson;
}());
exports.Calendarson = Calendarson;
var generateCalendar = function (from, to) {
    var fromDate = new Date(from);
    var toDate = new Date(to);
    var daysDiff = (0, date_utils_1.dateDiffInDays)(fromDate, toDate);
    var days = makeDateArray(fromDate, daysDiff + 1);
    var year = splitToMonth(fromDate, days);
    return year.map(function (month) {
        return {
            weeks: makeWeekCalendarArray(month),
            num: month.days[0].date.getMonth()
        };
    });
};
var splitToMonth = function (from, days) {
    var firstMonth = {
        monthNum: from.getMonth(),
        days: []
    };
    return days.reduce(function (acc, day) {
        var lastMonth = acc[acc.length - 1];
        if (day.disabled || day.date.getMonth() === lastMonth.monthNum) {
            lastMonth.days.push(day);
        }
        else {
            lastMonth = {
                monthNum: day.date.getMonth(),
                days: [day]
            };
            acc.push(lastMonth);
        }
        return acc;
    }, [firstMonth]);
};
var makeDateArray = function (from, length, disabled) {
    if (disabled === void 0) { disabled = false; }
    return new Array(length).fill(null).map(function (_, index) {
        return {
            date: (0, date_utils_1.addDay)(from, index),
            disabled: disabled
        };
    });
};
var makeWeekCalendarArray = function (month) {
    var days = [];
    var from = month.days[0].date;
    var to = month.days[month.days.length - 1].date;
    var fromDay = from.getDay();
    // Case where to in the middle of the week. We need to add invisible or disabled days first
    if (fromDay !== 1) {
        // hack to fix sunday behaviour. It has 0 index, but should fill the rest with days.
        var weekDay = fromDay || 7;
        var length_1 = weekDay - 1;
        var start = (0, date_utils_1.addDay)(from, -length_1);
        days = __spreadArray([], makeDateArray(start, length_1, true), true);
    }
    // fill normal case for from to "to" date
    days = __spreadArray(__spreadArray([], days, true), month.days, true);
    var toDay = from.getDay();
    // add end of the week if the final day is not sunday
    if (toDay !== 0) {
        var length_2 = 7 - toDay;
        days = __spreadArray(__spreadArray([], days, true), makeDateArray((0, date_utils_1.addDay)(to, 1), length_2, true), true);
    }
    return (0, split_array_1.splitArray)(days, 7);
};

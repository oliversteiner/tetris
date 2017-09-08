"use strict";
// Verwalten der einzelnen Intervals:
Object.defineProperty(exports, "__esModule", { value: true });
var Interval = /** @class */ (function () {
    function Interval() {
        //to keep a reference to all the intervals
        this.intervals = [];
    }
    //create another interval
    Interval.prototype.make = function (fun, delay) {
        //see explanation after the code
        var newInterval = setInterval.apply(window, [fun, delay].concat([].slice.call(arguments, 2)));
        this.intervals[newInterval] = true;
        return newInterval;
    };
    //clear a single interval
    Interval.prototype.clear = function (interval_id) {
        var all = Object.keys(this.intervals);
        console.log(all);
        return clearInterval(this.intervals[interval_id]);
    };
    //clear all intervals
    Interval.prototype.clearAll = function () {
        var all = Object.keys(this.intervals);
        var len = all.length;
        while (len-- > 0) {
            clearInterval(all.shift());
        }
    };
    return Interval;
}());
exports.default = Interval;

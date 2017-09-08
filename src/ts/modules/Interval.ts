// Verwalten der einzelnen Intervals:

export class Interval {

    //to keep a reference to all the intervals
    intervals:any;

    //create another interval

    public make(fun:any, delay:any) {
        //see explanation after the code
        let newInterval:string = setInterval.apply(
            window,
            [fun, delay].concat([].slice.call(arguments, 2))
        );

        this.intervals[newInterval] = true;

        return newInterval;
    }



    //clear a single interval
    public clear(interval_id:string) {
        return clearInterval(this.intervals[interval_id]);
    }



    //clear all intervals
    public clearAll() {
        let all:any = Object.keys(this.intervals);
        let len = all.length;

        while (len-- > 0) {
            clearInterval(all.shift());
        }
    }
}

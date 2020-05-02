'use strict';

const
    precon = require('@mintpond/mint-precon'),
    pu = require('./service.prototypes');


class Interval {

    /**
     * Constructor.
     *
     * @param value {string|number} A cron string or number of seconds.
     */
    constructor(value) {
        if (typeof value !== 'string') {
            precon.positiveInteger(value, 'value');
        }
        else {
            precon.string(value, 'value');
        }

        const _ = this;
        _._value = value;
    }


    /**
     * Determine if the Interval is Cron based.
     * @returns {boolean}
     */
    get isCron() { return typeof this._value === 'string'; }


    /**
     * Determine if the Interval is based on seconds.
     * @returns {boolean}
     */
    get isSeconds() { return typeof this._value === 'number'; }


    /**
     * Get the interval value.
     * @returns {string|number}
     */
    get value() { return this._value; }


    /**
     * Create and return a runner that can be started and stopped and will call the intervalFn at the interval.
     *
     * @param intervalFn {function()}
     * @returns {IntervalRunner}
     */
    createRunner(intervalFn) {
        precon.funct(intervalFn, 'intervalFn');

        return new IntervalRunner(this, intervalFn, false);
    }


    /**
     * Create and return a runner that can be started and stopped and will call the intervalFn at the interval.
     * The intervalFn must call a function passed into it via arguments when it is finished so that the next
     * interval wait can begin.
     *
     * @param intervalFn {function(done:function)}
     * @returns {IntervalRunner}
     */
    createAsyncRunner(intervalFn) {
        precon.funct(intervalFn, 'intervalFn');

        return new IntervalRunner(this, intervalFn, true);
    }


    static get CLASS_ID() { return 'ea41fbdbfc3ebff6d8b156b6e2b4fc59f38cf4ad5378ef2d623d8a43b0ca805a'; }
    static TEST_INSTANCE(Interval) { return new Interval(1); }
    static [Symbol.hasInstance](obj) {
        return pu.isInstanceOfById(obj, Interval.CLASS_ID);
    }
}

module.exports = Interval;

// hoist because of circular dependency
var IntervalRunner = require('./class.IntervalRunner');
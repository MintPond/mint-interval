'use strict';

const
    CronJob = require('cron').CronJob,
    precon = require('@mintpond/mint-precon'),
    pu = require('./service.prototypes');


class IntervalRunner {

    /**
     * Constructor.
     *
     * @param interval {Interval}
     * @param intervalFn {function()|function(done:function())}
     * @param [isAsync=false] {boolean}
     */
    constructor(interval, intervalFn, isAsync) {
        precon.instanceOf(interval, Interval, 'interval');
        precon.funct(intervalFn, 'intervalFn');
        precon.opt_boolean(isAsync, 'isAsync');

        const _ = this;

        _._interval = interval;
        _._intervalFn = () => { intervalFn(isAsync ? _._asyncDone.bind(_) : undefined) };
        _._isAsync = isAsync;

        _._cron = null;
        _._intervalHandle = null;
        _._isStarted = false;

        if (interval.isCron) {
            _._cron = new CronJob({
                cronTime: interval.value,
                start: false,
                onTick: () => {

                    if (isAsync)
                        _._cron.stop();

                    _._intervalFn();
                }
            });
        }
    }


    /**
     * @returns {Interval}
     */
    get interval() { return this._interval; }

    /**
     * @returns {boolean}
     */
    get isStarted() { return this._isStarted; }


    /**
     * Start the interval runner instance.
     * @returns {IntervalRunner} self.
     */
    start() {
        const _ = this;

        if (_._isStarted)
            throw new Error('Already started.');

        _._isStarted = true;

        if (_._interval.isCron) {
            _._cron.start();
        }
        else if (_._isAsync) {
            clearTimeout(_._intervalHandle);
            _._intervalHandle = setTimeout(_._intervalFn, _._interval.value * 1000);
        }
        else {
            clearInterval(_._intervalHandle);
            _._intervalHandle = setInterval(_._intervalFn, _._interval.value * 1000);
        }

        return _;
    }


    /**
     * Stop the interval runner instance.
     */
    stop() {
        const _ = this;

        clearInterval(_._intervalHandle);

        if (_._cron)
            _._cron.stop();

        _._isStarted = false;
    }


    _asyncDone() {
        const _ = this;
        if (_._cron) {
            _._cron.stop();
            if (_._isStarted)
                _._cron.start();
        }
        else if (_._isStarted) {
            _._isStarted = false;
            _.start();
        }
    }


    static get CLASS_ID() { return 'f04ee697da9d89a52a1319af2dd9cd576c53b8851472e9372d437b387f015e19'; }
    static TEST_INSTANCE(IntervalRunner) {
        const interval = new Interval(1);
        return new IntervalRunner(interval, () => {});
    }
    static [Symbol.hasInstance](obj) {
        return pu.isInstanceOfById(obj, IntervalRunner.CLASS_ID);
    }
}

module.exports = IntervalRunner;

// hoist because of circular dependency
var Interval = require('./class.Interval');

'use strict';

const
    assert = require('assert'),
    Interval = require('./../libs/class.Interval'),
    IntervalRunner = require('./../libs/class.IntervalRunner');

let interval;


describe('Interval', () => {

    context('cron', () => {
        beforeEach(() => {
            interval = new Interval('*/5 * * * *');
        });

        it('should have the correct value in "value" property', () => {
            const interval = new Interval('*/5 * * * *');
            assert.strictEqual(interval.value, '*/5 * * * *')
        });

        it('should have the correct value in "isCron" property', () => {
            const interval = new Interval('*/5 * * * *');
            assert.strictEqual(interval.isCron, true)
        });

        it('should have the correct value in "isSeconds" property', () => {
            assert.strictEqual(interval.isSeconds, false)
        });

        describe('createRunner function', () => {
            beforeEach(() => {
                interval = new Interval('*/5 * * * *');
            });

            it('should return an IntervalRunner', () => {
                const runner = interval.createRunner(() => {});
                assert.strictEqual(runner instanceof IntervalRunner, true)
            });

            it('should return an IntervalRunner with correct Interval reference', () => {
                const runner = interval.createRunner(() => {});
                assert.strictEqual(runner.interval, interval);
            });
        });
    });

    context('seconds', () => {
        beforeEach(() => {
            interval = new Interval(30);
        });

        it('should have the correct value in "value" property', () => {
            assert.strictEqual(interval.value, 30)
        });

        it('should have the correct value in "isCron" property', () => {
            assert.strictEqual(interval.isCron, false)
        });

        it('should have the correct value in "isSeconds" property', () => {
            assert.strictEqual(interval.isSeconds, true)
        });

        describe('createRunner function', () => {
            beforeEach(() => {
                interval = new Interval(30);
            });

            it('should return an IntervalRunner', () => {
                const runner = interval.createRunner(() => {});
                assert.strictEqual(runner instanceof IntervalRunner, true)
            });

            it('should return an IntervalRunner with correct Interval reference', () => {
                const runner = interval.createRunner(() => {});
                assert.strictEqual(runner.interval, interval);
            });
        });
    });
});
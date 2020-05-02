'use strict';

const
    assert = require('assert'),
    Interval = require('./../libs/class.Interval'),
    IntervalRunner = require('./../libs/class.IntervalRunner');

let interval;
let runner;


describe('IntervalRunner', () => {

    context('synchronous seconds', () => {
        beforeEach(() => {
            interval = new Interval(1);
        });

        it('should not start automatically', testDone => {
            runner = interval.createRunner(() => {
                throw new Error('should not run');
            });
            setTimeout(testDone, 1500);
        });

        it('should run when start is called', testDone => {
            runner = interval.createRunner(() => {
                testDone();
            });
            runner.start();
        });

        it('should stop when stop is called', function (testDone) {
            this.timeout(7000);
            let runCount = 0;
            runner = interval.createRunner(() => {
                runCount++;
                if (runCount > 1)
                    throw new Error('Runner did not stop');

                runner.stop();
                setTimeout(testDone, 5000);
            });
            runner.start();
        });

        it('should run at interval', function (testDone) {
            this.timeout(7000);
            let runCount = 0;
            runner = interval.createRunner(() => {
                runCount++;
            });
            runner.start();
            setTimeout(() => {
                runner.stop();

                if (runCount < 4 || runCount > 6)
                    throw new Error(`Incorrect number of runs: ${runCount}`);

                testDone();

            }, 5000);
        });
    });

    context('asynchronous seconds', () => {
        beforeEach(() => {
            interval = new Interval(1);
        });

        it('should not start automatically', testDone => {
            runner = interval.createAsyncRunner(() => {
                throw new Error('should not run');
            });
            setTimeout(testDone, 1500);
        });

        it('should run when start is called', testDone => {
            runner = interval.createAsyncRunner(done => {
                runner.stop();
                done();
                testDone();
            });
            runner.start();
        });

        it('should stop when stop is called', function (testDone) {
            this.timeout(8000);
            let runCount = 0;
            runner = interval.createAsyncRunner(done => {
                runCount++;
                if (runCount > 1)
                    throw new Error('Runner did not stop');

                done();
                runner.stop();
                setTimeout(testDone, 5000);
            });
            runner.start();
        });

        it('should run at interval', function (testDone) {
            this.timeout(8000);
            let runCount = 0;
            runner = interval.createAsyncRunner(done => {
                runCount++;
                done();
            });
            runner.start();
            setTimeout(() => {
                runner.stop();

                if (runCount < 4 || runCount > 6)
                    throw new Error(`Incorrect number of runs: ${runCount}`);

                testDone();

            }, 5000);
        });

        it('should should pause interval until run is completed', function (testDone) {
            this.timeout(8000);
            let runCount = 0;
            runner = interval.createAsyncRunner(done => {
                runCount++;
                setTimeout(done, 1000);
            });
            runner.start();
            setTimeout(() => {
                runner.stop();

                if (runCount < 2 || runCount > 3)
                    throw new Error(`Incorrect number of runs: ${runCount}`);

                testDone();

            }, 5000);
        });
    });


    context('synchronous cron', () => {
        beforeEach(() => {
            interval = new Interval('* * * * *');
        });

        it('should not start automatically', function(testDone) {
            this.timeout(60 * 1000 + 15 * 1000);
            runner = interval.createRunner(() => {
                throw new Error('should not run');
            });
            setTimeout(testDone, 60 * 1000 + 1000);
        });

        it('should run when start is called', function(testDone) {
            this.timeout(60 * 1000 + 15 * 1000);
            runner = interval.createRunner(() => {
                testDone();
            });
            runner.start();
        });

        it('should stop when stop is called', function (testDone) {
            this.timeout(2 * 60 * 1000 + 15 * 1000);
            let runCount = 0;
            runner = interval.createRunner(() => {
                runCount++;
                if (runCount > 1)
                    throw new Error('Runner did not stop');

                runner.stop();
                setTimeout(testDone, 60 * 1000 + 1000);
            });
            runner.start();
        });

        it('should run at interval', function (testDone) {
            this.timeout(3 * 60 * 1000 + 15 * 1000);
            let runCount = 0;
            runner = interval.createRunner(() => {
                runCount++;
            });
            runner.start();
            setTimeout(() => {
                runner.stop();

                if (runCount < 1 || runCount > 3)
                    throw new Error(`Incorrect number of runs: ${runCount}`);

                testDone();

            }, 2 * 60 * 1000 + 30 * 1000);
        });
    });

    context('asynchronous cron', () => {
        beforeEach(() => {
            interval = new Interval('* * * * *');
        });

        it('should not start automatically', function(testDone) {
            this.timeout(60 * 1000 + 15 * 1000);
            runner = interval.createAsyncRunner(() => {
                throw new Error('should not run');
            });
            setTimeout(testDone, 60 * 1000 + 1000);
        });

        it('should run when start is called', function(testDone) {
            this.timeout(60 * 1000 + 15 * 1000);
            runner = interval.createAsyncRunner(done => {
                done();
                testDone();
                runner.stop();
            });
            runner.start();
        });

        it('should stop when stop is called', function (testDone) {
            this.timeout(2 * 60 * 1000 + 15 * 1000);
            let runCount = 0;
            runner = interval.createAsyncRunner(done => {
                runCount++;
                if (runCount > 1)
                    throw new Error('Runner did not stop');

                done();
                runner.stop();
                setTimeout(testDone, 60 * 1000 + 1000);
            });
            runner.start();
        });

        it('should run at interval', function (testDone) {
            this.timeout(3 * 60 * 1000 + 15 * 1000);
            let runCount = 0;
            runner = interval.createAsyncRunner(done => {
                runCount++;
                done();
            });
            runner.start();
            setTimeout(() => {
                runner.stop();

                if (runCount < 1 || runCount > 3)
                    throw new Error(`Incorrect number of runs: ${runCount}`);

                testDone();

            }, 2 * 60 * 1000 + 30 * 1000);
        });

        it('should should pause interval until run is completed', function (testDone) {
            this.timeout(3 * 60 * 1000 + 15 * 1000);
            let runCount = 0;
            runner = interval.createAsyncRunner(done => {
                runCount++;
                setTimeout(done, 60 * 1000);
            });
            runner.start();
            setTimeout(() => {
                runner.stop();

                if (runCount < 2 || runCount > 2)
                    throw new Error(`Incorrect number of runs: ${runCount}`);

                testDone();

            }, 2 * 60 * 1000 + 30 * 1000);
        });
    });
});
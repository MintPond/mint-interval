mint-interval
=============

Cron and seconds based intervals for NodeJS used by [MintPond Mining Pool](https://mintpond.com).

## Install ##
__Install as Dependency in NodeJS Project__
```bash
# Install from Github NPM repository

npm config set @mintpond:registry https://npm.pkg.github.com/mintpond
npm config set //npm.pkg.github.com/:_authToken <PERSONAL_ACCESS_TOKEN>

npm install @mintpond/mint-interval@1.0.0 --save
```
[Creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

__Install & Test__
```bash
# Install nodejs v10
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs -y

# Download mint-interval
git clone https://github.com/MintPond/mint-interval

# build & test
cd mint-interval
npm install
npm test
``` 

## Example ##

__Cron__
```javascript
const Interval = require('@mintpond/mint-interval');

const interval = new Interval('*/5 * * * *'); // every 5 minutes of the hour
````

__Seconds__
```javascript
const Interval = require('@mintpond/mint-interval');

const interval = new Interval(30); // every 30 seconds
````

__Synchronous Interval Runner__
```javascript
const runner = interval.createRunner(() => { console.log('runner executed'); });
runner.start();
```

__Asynchronous Interval Runner__
```javascript
// Cron - the next interval will not be run if it occurs before "done" is called.
// Seconds - the timer for the next interval will not start until "done" is called.

const asyncRunner = interval.createAsyncRunner(done => {
    console.log('async runner executed');
    done();
});
asyncRunner.start();
```

__Stop Runner__
```javascript
runner.stop();
```

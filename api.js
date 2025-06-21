const cors = require('cors')
const Gpio = require('pigpio').Gpio;
const express = require('express')
const app = express()
app.use(cors());


// this creates variables that are connected to pins
const pin4 = new Gpio(4, {mode: Gpio.OUTPUT});
const pin17 = new Gpio(17, {mode: Gpio.OUTPUT});


// this listens for messages for pin 4
app.get('/pin4', (req, res) => {
  //
  let onOff = '';
  //
  if (Object.prototype.hasOwnProperty.call(req.query, 'onOff')) {
    onOff = req.query['onOff'];
    if (onOff == 'on') {
      pin4.digitalWrite(1);
    } else {
      pin4.digitalWrite(0);
    }
  }
  // response to be shown in the browser console
  res.json({'pin4': onOff});
});

// this listens for messages for pin 17
app.get('/pin17', (req, res) => {
  //
  let pwmValue = 0;
  //
  if (Object.prototype.hasOwnProperty.call(req.query, 'pwm')) {
    pwmValue = req.query['pwm'];
    // set pwm value of pin
    // subtract from 255 to invert
    pin17.pwmWrite(255 - pwmValue);
  }
  // response to be shown in the browser console
  res.json({'pin17': pwmValue});
});


// start the api
app.listen(8000, () => {
  console.clear();
  console.log('api listening on port 8000');
});

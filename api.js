const cors = require('cors')
const Gpio = require('pigpio').Gpio;
const express = require('express')
const app = express()
app.use(cors());


// this creates variables that are connected to pins
const pin4 = new Gpio(4, {mode: Gpio.OUTPUT});
const pin17 = new Gpio(17, {mode: Gpio.OUTPUT});


// this listens for messages for pin 17
app.get('/pin4', (req, res) => {
  //
  let onOff = 0;
  let response = {};
  //
  if (Object.prototype.hasOwnProperty.call(req.query, 'onOff')) {
    onOff = req.query['onOff'];
    if (onOff = 'on') {
      pin4.pwmWrite(1);
    } else {
      pin4.pwmWrite(0);
    }
    response = {'pin4': onOff};
  }
  res.json(response);
});

// this listens for messages for pin 17
app.get('/pin17', (req, res) => {
  //
  let pwmValue = 0;
  let response = {};
  //
  if (Object.prototype.hasOwnProperty.call(req.query, 'pwm')) {
    pwmValue = req.query['pwm'];
    pin17.pwmWrite(255 - pwmValue);
    response = {'pin17': pwmValue};
  }
  res.json(response);
});


// start the api
app.listen(8000, () => {
  console.clear();
  console.log('api listening on port 8000');
});

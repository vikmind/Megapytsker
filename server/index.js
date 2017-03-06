import SerialPort from 'serialport';
import config from '../config';
import sleep from 'then-sleep';
import adb from 'adbkit';

import selectCardFactory from './actions/selectCard';
import touchScreenFactory from './actions/touchScreen';
import waitFactory from './actions/wait';
import operationsExecutorFactory from './actions/operationsExecutor';
import tapeExecutorFactory from './actions/tapeExecutor';
import inputTextFactory from './actions/inputText';

import socketConnectionCallback from './socket.js';
import db from './models/';

// Web part
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Arduino communication
const port = new SerialPort(config.arduinoPort, {
  baudRate: 9600
}, function(err){
  console.log(err);
});
port.on('open', (err) => {
  if (err) {
    return console.log('Error on open: ', err.message);
  }
  console.log('port opened');
});

// ADB and operations
let operations = {
  selectCard: selectCardFactory({port, cards: config.cards, sleep}),
  wait: waitFactory({sleep})
};
const client = adb.createClient();
client.listDevices()
.then(function(devices){
  const device = devices[0];
  operations.touchScreen = touchScreenFactory({client, device, sleep});
  operations.inputText = inputTextFactory({client, device, sleep});
  operations.tapeExecutor = tapeExecutorFactory({operations, db});
  const operationsExecutor = operationsExecutorFactory({operations});
  io.on('connection', socketConnectionCallback.bind(null,
    {
      operationsExecutor,
      port,
      device,
      db,
      selectCard: operations.selectCard
    }
  ));
});

// Web configuration
app.use(express.static(`./${config.webFolder}`));

// Webpack
if (process.env.NODE_ENV === 'development'){
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

// Action!
http.listen(3000, () => {
  console.log('listening on port 3000');
});

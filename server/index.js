import SerialPort from 'serialport';
import express from 'express';
import config from '../config';
import sleep from 'then-sleep';
import adb from 'adbkit';

import selectCardFactory from './actions/selectCard';
import touchScreenFactory from './actions/touchScreen';
import waitFactory from './actions/wait';
import operationsExecutorFactory from './actions/operationsExecutor';
import readTicket from '../tapes/read_ticket.json';

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
const sequence = readTicket.sequence;
let operations = {
  selectCard: selectCardFactory({port, cards: config.cards, sleep}),
  wait: waitFactory({sleep})
};
let operationsExecutor = null;

const client = adb.createClient();
client.listDevices()
  .then(function(devices){
    operations.touchScreen = touchScreenFactory({client, device: devices[0], sleep});
    operationsExecutor = operationsExecutorFactory({operations})
});


// Web part
const app = express();
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

// Routes
app.post('/servo', function (req, res) {
  if (req.headers.value){
    if (port.isOpen()){
      console.log('sent ' + req.headers.value);
      operations.selectCard(req.headers.value).then(()=>res.send('ok'));
    } else {
      res.send('not ok');
    }
  } else {
    res.send('not ok');
  }
});

app.post('/fun', function(req, res){
  if (port.isOpen()){
    operationsExecutor(
      sequence,
      function(current){
        // TODO: inform client
        console.log('executing', current.name);
      }
    ).then(()=> console.log('complete'));
    res.send('fun!');
  } else {
    res.send('not ok');
  }
});

// Action!
app.listen(3000, () => {
  console.log('listening on port 3000');
});

import SerialPort from 'serialport';
import express from 'express';
import config from '../config';
import sleep from 'then-sleep';
import adb from 'adbkit';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';


import selectCardFactory from './actions/selectCard';
import touchScreenFactory from './actions/touchScreen';

// Hardware part
const port = new SerialPort(config.arduinoPort, {
  baudRate: 9600
}, function(err){
  console.log(err);
});

port.on('data', (data) => {
  console.log(`From device: ${data}`);
});

port.on('open', (err) => {
  if (err) {
    return console.log('Error on open: ', err.message);
  }
  console.log('port opened');
});

// ADB stuff
const sequence = [
  {operation: 'selectCard',  args: ['INIT']},
  {operation: 'touchScreen', args: [145, 254]}, // Touch "Read ticket"
  {operation: 'selectCard',  args: ['AT 3390537C']},
  {operation: 'touchScreen', args: [145, 254]}, // Touch center of the screen just to wait 2s
  {operation: 'touchScreen', args: [163, 433]}  // Touch "OK"
];
let operations = {};
const client = adb.createClient();
client.listDevices()
  .then(function(devices){
    operations.touchScreen = touchScreenFactory({client, device: devices[0], sleep});
  });

// Init
operations.selectCard = selectCardFactory({port, cards: config.cards, sleep});

// Web part
const app = express();
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/server');
app.use(express.static(`./${config.webFolder}`));

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.get('/', function (req, res) {
  res.render('index');
});

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
    sequence.reduce(function(prev, cur){
      console.log('executing', cur);
      return prev.then(result => operations[cur.operation](...cur.args))
    }, Promise.resolve()).then(()=> console.log('complete'));
    res.send('fun!');
  } else {
    res.send('not ok');
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

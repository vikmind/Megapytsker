import SerialPort from 'serialport';
import express from 'express';
import config from '../config';

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

// Web part
const app = express();
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/server');
app.use(express.static(`./${config.webFolder}`));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/servo', function (req, res) {
  if (req.headers.value){
    if (port.isOpen()){
      console.log('sent ' + req.headers.value);
      port.write(req.headers.value + 'T');
      res.send('ok');
    } else {
      res.send('not ok');
    }
  } else {
    res.send('not ok');
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

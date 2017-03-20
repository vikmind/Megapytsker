import inputTextFactory, {inputText} from './inputText';
import utils from '../_test.utilities';
import test from 'ava';

const simpleClient = {
  shell: function(id, str){
    return Promise.resolve();
  }
};

test('simple case', t => {
  return inputText({
    client: simpleClient,
    device: { id: 1 },
    sleep: utils.sleep}, 'HELLO')
    .then(value => {
      t.pass();
    });
});

test('simple case with factory', t => {
  return inputTextFactory({
    client: simpleClient,
    device: { id: 1 },
    sleep: utils.sleep})('HELLO')
    .then(value => {
      t.pass();
    });
});

test('stopExecutingSequence', t => {
  global.stopExecutingSequence = true;
  return t.throws(
    inputText({
      client: simpleClient,
      device: { id: 1 },
      sleep: utils.sleep}, 'HELLO')
    );
});

test('failed sleep', t => {
  const sleep = function(ms){
    return Promise.reject();
  }
  return t.throws(
    inputText({
      client: simpleClient,
      device: { id: 1 },
      sleep}, 'HELLO')
  );
});

const factoryClientShell = function({t, value}, id, str){
  t.is(str, value);
  return Promise.resolve();
};

test('right shell command for text', t => {
  const clientText = {
    shell: factoryClientShell.bind(clientText, {t, value: 'input text hello'})
  };
  return inputText({
    client: clientText,
    device: { id: 1 },
    sleep: utils.sleep}, 'hello')
    .then(value => {
      t.pass()
    });
});

test('right shell command for keycode', t => {
  const clientKeycode = {
    shell: factoryClientShell.bind(clientKeycode, {t, value: 'input keyevent KEYCODE_HOME'})
  };
  return inputText({
    client: clientKeycode,
    device: { id: 1 },
    sleep: utils.sleep}, 'KEYCODE_HOME')
    .then(value => {
      t.pass();
    });
});

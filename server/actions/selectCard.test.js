import selectCardFactory from './selectCard';
import config from '../../config';

const port = {
  isOpen: function(){
    return true;
  },
  write: function(value){
    console.log('WRITE TO PORT', value);
  }
};
const sleep = function(ms){
  console.log(`SLEEP FOR ${ms}ms`)
  return Promise.resolve(ms);
};

const selectCard = selectCardFactory({port, cards: config.cards, sleep});
selectCard('AT 7194245E').then(value => console.log(`resolved with ${value}`));

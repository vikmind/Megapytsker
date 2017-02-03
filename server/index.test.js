import selectCard from './actions/selectCard';
import { selectCardFactory } from './actions/selectCard';
import config from '../config';

const port = {
  isOpen: function(){
    return true;
  },
  write: function(value){
    console.log('WRITE TO PORT', value);
  }
}
// selectCard(port, config.cards, 'AT 3390537C').then((value)=>console.log(`resolved with ${value}`));
const factorySelectCard = selectCardFactory(port, config.cards);
factorySelectCard('AT 7194245E').then(value => console.log(`resolved with ${value}`));

export function selectCard({port, cards, sleep}, number, time){
  const card = cards.find(el => el.number === number);
  const sleepTime = parseInt(time, 10) || 1000;
  console.log('selectCard runs');
  if (!card) return Promise.resolve(false);
  if (port.isOpen()){
    if (global.stopExecutingSequence){
      global.stopExecutingSequence = false;
      console.log('Interruption caught');
      return Promise.reject(new Error('Interruption from client'));
    } else {
      console.log('writing to port');
      port.write(card.angle + 'T');
      return sleep(1000 + sleepTime)
              .then(result => true);
    }
  } else {
    console.log('port not opened');
    return Promise.reject(new Error('Arduino not connected'));
  }
};

export default function selectCardFactory(deps){
  return selectCard.bind(null, deps);
};

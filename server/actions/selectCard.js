export function selectCard({port, cards, sleep}, number, time){
  const card = cards.find(el => el.number === number);
  const sleepTime = parseInt(time, 10) || 1000;
  if (!card) return Promise.resolve(false);
  if (port.isOpen()){
    port.write(card.angle + 'T');
    return sleep(sleepTime)
            .then(result => true);
  } else {
    return Promise.reject(new Error('Arduino not connected'));
  }
};

export default function selectCardFactory(deps){
  return selectCard.bind(null, deps);
};

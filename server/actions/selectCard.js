export function selectCard({port, cards, sleep}, number){
  const card = cards.find(el => el.number === number);
  const defaultCard = cards.find(el => el.number === 'INIT');
  if (!card) return Promise.resolve(false);
  if (port.isOpen()){
    port.write(card.angle + 'T');
    return sleep(500).then(()=>{
      port.write(defaultCard.angle + 'T');
      return true;
    });
  } else {
    return Promise.resolve(false);
  }
};

export default function selectCardFactory(deps){
  return selectCard.bind(null, deps);
};

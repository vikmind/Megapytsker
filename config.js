export default {
  arduinoPort: '/dev/cu.usbmodem1411',
  webFolder: 'public',
  cards: [
    {
      angle: 0,
      number: 'AT 3390537C'
    },
    {
      angle: 31,
      number: 'AT 7194245E'
    },
    {
      angle: 69,
      number: 'INIT'
    },
    {
      angle: 111,
      number: 'AT 0493903A'
    },
    {
      angle: 152,
      number: 'AT 8824065F'
    }
  ],
  operationTypes: [
    {
      identifier: 'selectCard',
      name: 'Select Card',
      arguments: [
        {
          name: 'ArrowPass ID',
          type: 'Cards'
        },
        {
          name: 'Delay (ms)',
          type: 'Integer'
        }
      ]
    },
    {
      identifier: 'touchScreen',
      name: 'Touch Screen',
      arguments: [
        {
          name: 'X',
          type: 'Integer'
        },
        {
          name: 'Y',
          type: 'Integer'
        }
      ]
    },
    {
      identifier: 'inputText',
      name: 'Input Text',
      arguments: [
        {
          name: 'Text',
          type: 'String'
        }
      ]
    },
    {
      identifier: 'wait',
      name: 'Waiting',
      arguments: [
        {
          name: 'Delay (ms)',
          type: 'Integer'
        }
      ]
    }
  ]
};

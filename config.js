export default {
  arduinoPort: '/dev/cu.usbmodem1A1221',
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
          type: 'Cards',
          default: 'INIT'
        },
        {
          name: 'Delay (ms)',
          type: 'Integer',
          default: 1000
        }
      ]
    },
    {
      identifier: 'inputText',
      name: 'Input Text',
      arguments: [
        {
          name: 'Text or keycode (KEYCODE_BACK)',
          type: 'String'
        },
        {
          name: 'Delay (ms)',
          type: 'Integer',
          default: 500
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
        },
        {
          name: 'Delay (ms)',
          type: 'Integer',
          default: 500
        }
      ]
    },
    {
      identifier: 'swipe',
      name: 'Swipe',
      arguments: [
        {
          name: 'X1',
          type: 'Integer'
        },
        {
          name: 'Y1',
          type: 'Integer'
        },
        {
          name: 'X2',
          type: 'Integer'
        },
        {
          name: 'Y2',
          type: 'Integer'
        },
        {
          name: 'Duration (ms)',
          type: 'Integer',
          default: 500
        },
        {
          name: 'Delay (ms)',
          type: 'Integer',
          default: 500
        }
      ]
    },
    {
      identifier: 'wait',
      name: 'Waiting',
      arguments: [
        {
          name: 'Delay (ms)',
          type: 'Integer',
          default: 2000
        }
      ]
    },
    {
      identifier: 'tapeExecutor',
      name: 'Run other tape',
      arguments: [
        {
          name: 'Tape to execute',
          type: 'Integer'
        },
        {
          name: 'Repeat count',
          type: 'Integer',
          default: 1
        }
      ]
    },
    {
      identifier: 'screenshot',
      name: 'Screenshot',
      arguments: [
        {
          name: 'Identifier',
          type: 'String'
        }
      ]
    },
  ]
};

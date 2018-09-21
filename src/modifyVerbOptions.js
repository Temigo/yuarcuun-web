export const interrogative = [
  {
    group: 'interrogative',
    mood: 'who',
    text: 'who',
  },
  {
    group: 'interrogative',
    mood: 'when (in past)',
    text: 'when (in past)',
  },
  {
    group: 'interrogative',
    mood: 'when (in future)',
    text: 'when (in future)',
  },
  {
    group: 'interrogative',
    mood: 'at where',
    text: 'at where',
  },
  {
    group: 'interrogative',
    mood: 'from where',
    text: 'from where',
  },
  {
    group: 'interrogative',
    mood: 'toward where',
    text: 'toward where',
  },
  {
    group: 'interrogative',
    mood: 'why',
    text: 'why',
  },
  {
    group: 'interrogative',
    mood: 'how',
    text: 'how',
  }
];

export const optative = [
  {
    group: 'optative',
    mood: 'do!',
    text: 'do!',
  },
  {
    group: 'optative',
    mood: 'do (in the future)!',
    text: 'do (in the future)!',
  },
  {
    group: 'optative',
    mood: 'You, do not!',
    text: 'You, do not!',
  },
  {
    group: 'optative',
    mood: 'You, stop!',
    text: 'You, stop!',
  }
];

export const dependent = [
  {
    group: 'connective_precessive',
    mood: 'before',
    text: 'before',
  },
  {
    group: 'connective_consequential',
    mood: 'because',
    text: 'because',
  },
  {
    group: 'connective_contingent',
    mood: 'whenever',
    text: 'whenever',
  },
  {
    group: 'connective_concessive',
    mood: 'although',
    text: 'although',
  },
  {
    group: 'connective_conditional',
    mood: 'if',
    text: 'if',
  },
  {
    group: 'connective_first_contemporative',
    mood: 'when (past)',
    text: 'when',
  },
  {
    group: 'connective_second_contemporative',
    mood: 'when (future)',
    text: 'when',
  },
  {
    group: 'subordinative',
    mood: 'by or being that',
    text: 'by or being that',
  }
];

export const verb2noun = [
  {
    ending: 'the one who is',
    text: 'the one who is',
  },
  {
    ending: 'device for',
    text: 'device for',
  },
  {
    ending: 'one that customarily/capably is',
    text: 'one that customarily/capably is',
  },
  {
    ending: 'how to/way of',
    text: 'how to/way of',
  },
  {
    ending: 'one who is good at',
    text: 'one who is good at',
  },
  {
    ending: 'act or state of',
    text: 'act or state of',
  }
];

export const postbaseButtons = [
  {text: 'Time', indexes: [5, 7, 6, 8, 9, 10], activeIndex: 6, icon: 'time'},
  {text: 'Desire', indexes: [25,21, 24,  26, 22, 23], activeIndex: 10, icon: 'child'},
  {text: 'Ability', indexes: [4, 3, 2], activeIndex: 5, icon: 'football ball'},
  {text: 'Trying', indexes: [18, 16, 17], activeIndex: 8, icon: 'cubes'},
  {text: 'Habit/Frequency', indexes: [11, 12, 13, 14, 15, 29, 28], activeIndex: 7, icon: 'hourglass end'},
  {text: 'Maybe', indexes: [0, 1], activeIndex: 4, icon: 'thermometer half'},
  {text: 'Comparison', indexes: [19, 20], activeIndex: 9, icon: 'thumbs up'}
];

export const enclitics= {
  'indicative': {
    activeIndex: 30,
    items: [
      {
        ending: '-qaa',
        meaning: '(yes or no?)',
        text: 'Yes or no?',
      },
      {
        ending: '-wa',
        meaning: '(indication of a complete thought)',
        text: 'indication of a complete thought',
      },
      {
        ending: '-gguq',
        meaning: '(one says)',
        text: 'one says',
      },
      {
        ending: '-llu',
        meaning: '(also)',
        text: 'and, also',
      },
      {
        ending: 'ataam',
        meaning: '(again)',
        text: 'again',
      }
    ]
  },
  'interrogative': {
    activeIndex: 31,
    items: [
      {
        ending: '-kiq',
        meaning: '(I wonder...)',
        text: 'I wonder...',
      },
      {
        ending: '-tanem',
        meaning: '(emphasized)',
        text: 'Add emphasis',
      }
    ]
  },
};

import nlp from 'compromise';

export const options1 = [
  {id: 0, value: '11(1)', text:'I'},
  {id: 1, value: '21(1)', text:'you'},
  {id: 2, value: '31-1(1)', text:'he'},
  {id: 3, value: '31-2(1)', text:'she'},
  {id: 4, value: '31-3(1)', text:'it'},
  {id: 5, value: '41(1)', text:'its own'},
  {id: 6, value: '12(1)', text:'the two of us'},
  {id: 7, value: '22(1)', text:'the two of you'},
  {id: 8, value: '32(1)', text:'the two of them'},
  {id: 9, value: '42(1)', text:'their own (two)'},
  {id: 10, value: '13(1)', text:'we all (3+)'},
  {id: 11, value: '23(1)', text:'you all (3+)'},
  {id: 12, value: '33(1)', text:'they all (3+)'},
  {id: 13, value: '43(1)', text:'their own (3+)'}
];

export const options2 = [
  {id: 0, value: '11(2)', text:'me'},
  {id: 1, value: '21(2)', text:'you'},
  {id: 2, value: '31-1(2)', text:'him'},
  {id: 3, value: '31-2(2)', text:'her'},
  {id: 4, value: '31-3(2)', text:'it'},
  {id: 5, value: '41(2)', text:'its own'},
  {id: 6, value: '12(2)', text:'the two of us'},
  {id: 7, value: '22(2)', text:'the two of you'},
  {id: 8, value: '32(2)', text:'the two of them'},
  {id: 9, value: '42(2)', text:'their own (two)'},
  {id: 10, value: '13(2)', text:'us all (3+)'},
  {id: 11, value: '23(2)', text:'you all (3+)'},
  {id: 12, value: '33(2)', text:'them all (3+)'},
  {id: 13, value: '43(2)', text:'their own (3+)'}
];

export const options3 = [
  {id: 0, value: '11(3)', text:'my'},
  {id: 1, value: '21(3)', text:'your'},
  {id: 2, value: '31-1(3)', text:'his'},
  {id: 3, value: '31-2(3)', text:'her'},
  {id: 4, value: '31-3(3)', text:'its'},
  {id: 5, value: '41(3)', text:'its own'},
  {id: 6, value: '12(3)', text:'our (two)'},
  {id: 7, value: '22(3)', text:'your (two)'},
  {id: 8, value: '32(3)', text:'their (two)'},
  {id: 9, value: '42(3)', text:'their own (two)'},
  {id: 10, value: '13(3)', text:'our (3+)'},
  {id: 11, value: '23(3)', text:'your (3+)'},
  {id: 12, value: '33(3)', text:'their (3+)'},
  {id: 13, value: '43(3)', text:'their own (3+)'}
];

export const postbases = [
  {
    id: 0,
    description: 'is probably',
    englishModifier: (english) => { return 'probably' + english; },
    expression: '@~+yugnarqe\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 1,
    description: 'is evidently (without being observed)',
    englishModifier: (english) => { return 'evidently (without being observed)' + english; },
    expression: '-llini\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 2,
    description: 'is no longer able to',
    englishModifier: (english) => { return 'no longer able to' + english; },
    expression: '+(s)ciigali\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 3,
    description: 'is not able to',
    englishModifier: (english) => { return 'not able to' + english; },
    expression: '+(s)ciigate\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 4,
    description: 'is able to',
    englishModifier: (english) => { return 'able to' + english; },
    expression: '@~+yugnga\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 5,
    description: 'will (future tense)',
    englishModifier: (english) => { return nlp(english).sentences().toFutureTense().out('text'); },
    expression: '+ciqe\\',
    expression_conditional: '@ciiqe\\',  // conditional te_ending
    conditional_rule: 'attaching_to_te',  // defined later and if satisfied display expression_conditional
    tense:true,
    allowable_next_ids: [0,1,2,3,4]
  },
  {
    id: 6,
    description: 'has not yet',
    englishModifier: (english) => { return 'has not yet' + english; },
    expression: '-ksaite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 7,
    description: 'has already (past tense)',
    englishModifier: (english) => { return nlp(english).sentences().toPastTense().out('text'); },
    expression: '-llru\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 8,
    description: 'is about to',
    englishModifier: (english) => { return 'is about to' + english; },
    expression: '-qatar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 9,
    description: 'will not (in the future)',
    englishModifier: (english) => { return 'will not (in the future)' +  nlp(english).sentences().toFutureTense().out('text'); },
    expression: '@~+ngaite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 10,
    description: 'soon will',
    englishModifier: (english) => { return 'soon will' +  nlp(english).sentences().toFutureTense().out('text'); },
    expression: '@~+niarar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 11,
    description: 'to repeatedly',
    englishModifier: (english) => { return 'repeatedly' + english; },
    expression: '-lar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 12,
    description: 'to do it again',
    englishModifier: (english) => { return 'will again' + english; },
    expression: '-nqigte\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 13,
    description: 'to almost',
    englishModifier: (english) => { return 'almost' + english; },
    expression: '@~+yarpiar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 14,
    description: 'usually does not',
    englishModifier: (english) => { return 'never' + english; },
    expression: '@~-yuite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 15,
    description: 'does no longer',
    englishModifier: (english) => { return 'no longer' + english; },
    expression: '-nrir\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 16,
    description: 'without intended outcome',
    englishModifier: (english) => { return 'without intended outcome' + english; },
    expression: '@~+yaaqe\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 17,
    description: 'to keep on trying despite difficulties',
    englishModifier: (english) => { return 'keeps on trying despite difficulties' + english; },
    expression: '-qcaar(ar)\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 18,
    description: 'to try to',
    englishModifier: (english) => { return 'try to' + english; },
    expression: '-ngnaqe\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 19,
    description: 'to be too',
    englishModifier: (english) => { return 'to be too' + english; },
    expression: '-ssiyaag\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 20,
    description: 'to be more',
    englishModifier: (english) => { return 'to be more' + english; },
    expression: '-nru\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 21,
    description: 'to love to',
    englishModifier: (english) => { return 'loves to' + english; },
    expression: '@~+yunqe4\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 22,
    description: 'to no longer want to',
    englishModifier: (english) => { return 'no longer wants to' + english; },
    expression: '@~+yuumiir(ar)te\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 23,
    description: 'to not care to',
    englishModifier: (english) => { return 'does not care to' + english; },
    expression: '@~+yuumite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 24,
    description: 'to yearn to',
    englishModifier: (english) => { return 'yearns to' + english; },
    expression: '@~+yuumir\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 25,
    description: 'want to, tend to',
    englishModifier: (english) => { return 'wants to' + english; },
    expression: '@~+yug\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 26,
    description: 'to enjoy doing',
    englishModifier: (english) => { return 'enjoys doing' + english; },
    expression: '@~+yugar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 27,
    description: 'to not',
    englishModifier: (english) => { return nlp(english).sentences().toNegative().out('text'); },
    expression: '-nrite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 28,
    description: 'to ask one to',
    englishModifier: (english) => { return 'to ask one to' + english; },
    expression: 'sqe-\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 29,
    description: 'to be in the process of',
    englishModifier: (english) => { return 'is in the process of' + english; },
    expression: '@~+yartur\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [1,3,4]
  },
  {
    id: 30,
    description: 'to definitely not be going to',
    englishModifier: (english) => { return 'is definitely not going to' + english; },
    expression: '@~+yugnairute\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:false,
    allowable_next_ids: [0,1,3,4], // only refers to the postbases, not the endings
  }
];

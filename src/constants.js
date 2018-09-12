import nlp from 'compromise';

export const options1 = [
  {id: 0, value: '11(1)', text:'I', otext:'me'},
  {id: 1, value: '21(1)', text:'you', otext:'you'},
  {id: 2, value: '31-1(1)', text:'he', otext:'him'},
  {id: 3, value: '31-2(1)', text:'she', otext:'her'},
  {id: 4, value: '31-3(1)', text:'it', otext:'it'},
  {id: 5, value: '41(1)', text:'its own', otext:'its own'},
  {id: 6, value: '12(1)', text:'the two of us', otext:'the two of us'},
  {id: 7, value: '22(1)', text:'the two of you', otext:'the two of you'},
  {id: 8, value: '32(1)', text:'the two of them', otext:'the two of them'},
  {id: 9, value: '42(1)', text:'their own (two)', otext:'their own (two)'},
  {id: 10, value: '13(1)', text:'we all (3+)', otext:'us all (3+)'},
  {id: 11, value: '23(1)', text:'you all (3+)', otext:'you all (3+)'},
  {id: 12, value: '33(1)', text:'they all (3+)', otext:'them all (3+)'},
  {id: 13, value: '43(1)', text:'their own (3+)', otext:'their own (3+)'}
];

export const options2 = [
  {id: 0, value: '11(2)', text:'me', ptext:'my'},
  {id: 1, value: '21(2)', text:'you', ptext:'your'},
  {id: 2, value: '31-1(2)', text:'him', ptext:'his'},
  {id: 3, value: '31-2(2)', text:'her', ptext:'her'},
  {id: 4, value: '31-3(2)', text:'it', ptext:'its'},
  {id: 5, value: '41(2)', text:'its own', ptext:'its own'},
  {id: 6, value: '12(2)', text:'the two of us', ptext:'our (two)'},
  {id: 7, value: '22(2)', text:'the two of you', ptext:'your (two)'},
  {id: 8, value: '32(2)', text:'the two of them', ptext:'their (two)'},
  {id: 9, value: '42(2)', text:'their own (two)', ptext:'their own (two)'},
  {id: 10, value: '13(2)', text:'us all (3+)', ptext:'our (3+)'},
  {id: 11, value: '23(2)', text:'you all (3+)', ptext:'your (3+)'},
  {id: 12, value: '33(2)', text:'them all (3+)', ptext:'their (3+)'},
  {id: 13, value: '43(2)', text:'their own (3+)', ptext:'their own (3+)'}
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
    englishModifier: (english) => { return ' probably' + english; },
    expression: '@~+yugnarqe\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 1,
    description: 'is evidently (without being observed)',
    englishModifier: (english) => { return ' evidently (without being observed)' + english; },
    expression: '-llini\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 2,
    description: 'is no longer able to',
    englishModifier: (english) => { return ' no longer able to' + english; },
    expression: '+(s)ciigali\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 3,
    description: 'is not able to',
    englishModifier: (english) => { return ' not able to' + english; },
    expression: '+(s)ciigate\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 4,
    description: 'is able to',
    englishModifier: (english) => { return ' able to' + english; },
    expression: '@~+yugnga\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 5,
    description: 'past tense',
    englishModifier: (english) => { return ' (past)' + english; },
    expression: '-llru\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'past',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 6,
    description: 'not yet',
    englishModifier: (english) => { return ' not yet' + english; },
    expression: '-ksaite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 7,
    description: 'future tense',
    englishModifier: (english) => { return ' (future)'+ english},
    expression: '+ciqe\\',
    expression_conditional: '@ciiqe\\',  // conditional te_ending
    conditional_rule: 'attaching_to_te',  // defined later and if satisfied display expression_conditional
    tense:'future',
    allowable_next_ids: [0,1,2,3,4]
  },
  {
    id: 8,
    description: '(will not in the future)',
    englishModifier: (english) => { return ' (future) not' +  english; },
    expression: '@~+ngaite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'future',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 9,
    description: 'will soon',
    englishModifier: (english) => { return ' (future) soon' + english; },
    expression: '@~+niarar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'future',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 10,
    description: 'about to',
    englishModifier: (english) => { return ' about to' + english; },
    expression: '-qatar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 11,
    description: 'repeatedly',
    englishModifier: (english) => { return ' repeatedly' + english; },
    expression: '-lar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 12,
    description: 'to __ again',
    englishModifier: (english) => { return ' (again)' + english; },
    expression: '-nqigte\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 13,
    description: 'almost',
    englishModifier: (english) => { return ' almost' + english; },
    expression: '@~+yarpiar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 14,
    description: 'never',
    englishModifier: (english) => { return ' never' + english; },
    expression: '@~-yuite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 15,
    description: 'no longer',
    englishModifier: (english) => { return ' no longer' + english; },
    expression: '-nrir\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 16,
    description: 'trying (unsuccessfully) to',
    englishModifier: (english) => { return ' trying (unsuccessfully) to' + english; },
    expression: '@~+yaaqe\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 17,
    description: 'trying despite difficulties to',
    englishModifier: (english) => { return ' trying despite difficulties to' + english; },
    expression: '-qcaar(ar)\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 18,
    description: 'trying to',
    englishModifier: (english) => { return ' trying to' + english; },
    expression: '-ngnaqe\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 19,
    description: 'excessively (too much)',
    englishModifier: (english) => { return ' excessively' + english; },
    expression: '-ssiyaag\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 20,
    description: '(more or better in comparison)',
    englishModifier: (english) => { return ' (more or better in comparison)' + english; },
    expression: '-nru\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 21,
    description: 'loves to',
    englishModifier: (english) => { return ' loves to' + english; },
    englishModifierPlural: (english) => { return ' love to' + english; },
    expression: '@~+yunqe4\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 22,
    description: 'no longer wants to',
    englishModifier: (english) => { return ' no longer wants to' + english; },
    englishModifierPlural: (english) => { return ' no longer want to' + english; },
    expression: '@~+yuumiir(ar)te\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 23,
    description: 'not care to',
    englishModifier: (english) => { return ' not care to' + english; },
    englishModifierPlural: (english) => { return ' not care to' + english; },
    expression: '@~+yuumite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 24,
    description: 'yearn to',
    englishModifier: (english) => { return ' yearns to' + english; },
    englishModifierPlural: (english) => { return ' yearn to' + english; },
    expression: '@~+yuumir\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 25,
    description: 'want to, tend to',
    englishModifier: (english) => { return ' wants to' + english; },
    englishModifierPlural: (english) => { return ' want to' + english; },
    expression: '@~+yug\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 26,
    description: 'to enjoy doing',
    englishModifier: (english) => { return ' enjoys' + english; },
    englishModifierPlural: (english) => { return ' enjoy' + english; },
    expression: '@~+yugar\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 27,
    description: 'not',
    englishModifier: (english) => { return ' not' + english; },
    expression: '-nrite\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  // {
  //   id: 28,
  //   description: 'to ask one to',
  //   englishModifier: (english) => { return 'to ask one to' + english; },
  //   expression: 'sqe-\\',
  //   expression_conditional: '',
  //   conditional_rule: '',
  //   tense:'',
  //   allowable_next_ids: [1,3,4]
  // },
  {
    id: 28,
    description: 'in the process of',
    englishModifier: (english) => { return ' in the process of' + english; },
    expression: '@~+yartur\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 29,
    description: 'definitely not going to',
    englishModifier: (english) => { return ' definitely not going to' + english; },
    expression: '@~+yugnairute\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,3,4], // only refers to the postbases, not the endings
  }
];

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

export const retrieveSubjectObject =
  {'11(1)':'I',
  '21(1)':'you',
  '31-1(1)':'he',
  '31-2(1)':'she',
  '31-3(1)':'it',
  '41(1)':'its own',
  '12(1)':'the two of us',
  '22(1)':'the two of you',
  '32(1)':'the two of them',
  '42(1)':'their own (two)',
  '13(1)':'we all (3+)',
  '23(1)':'you all (3+)',
  '33(1)':'they all (3+)',
  '43(1)':'their own (3+)',
  '11(2)':'me',
  '21(2)':'you',
  '31-1(2)':'him',
  '31-2(2)':'her',
  '31-3(2)':'it',
  '41(2)':'its own',
  '12(2)':'the two of us',
  '22(2)':'the two of you',
  '32(2)':'the two of them',
  '42(2)':'their own (two)',
  '13(2)':'us all (3+)',
  '23(2)':'you all (3+)',
  '33(2)':'them all (3+)',
  '43(2)':'their own (3+)',
  '11(3)':'my',
  '21(3)':'your',
  '31-1(3)':'his',
  '31-2(3)':'her',
  '31-3(3)':'its',
  '41(3)':'its own',
  '12(3)':'our (two)',
  '22(3)':'your (two)',
  '32(3)':'their (two)',
  '42(3)':'their own (two)',
  '13(3)':'our (3+)',
  '23(3)':'your (3+)',
  '33(3)':'their (3+)',
  '43(3)':'their own (3+)'}
;

export const postbases = [
  {
    id: 0,
    description: 'is probably',
    englishModifier: (english) => { return ' probably' + english; },
    expression: '@~+yugnarqe\\',
    expression_conditional: '',
    conditional_rule: '',
    priority: 1,
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 1,
    description: 'is evidently (without being observed)',
    englishModifier: (english) => { return ' evidently' + english; },
    expression: '-2ini\\',
    expression_conditional: '',
    conditional_rule: '',
    priority: 1,
    tense:'',
    allowable_next_ids: [0]
  },
  {
    id: 2,
    description: 'is no longer able to',
    englishModifier: (english) => { return ' no longer able to' + english; },
    expression: '+(s)ciigali\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,3]
  },
  {
    id: 3,
    description: 'is not able to',
    englishModifier: (english) => { return ' not able to' + english; },
    expression: '+(s)ciigate\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,2]
  },
  {
    id: 4,
    description: 'is able to',
    englishModifier: (english) => { return ' able to' + english; },
    expression: '@~+yug6a\\',
    expression_conditional: '',
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,6,7,8]
  },
  {
    id: 5,
    description: 'past tense',
    englishModifier: (english) => { return '' + english; },
    expression: '-2ru\\',
    expression_conditional: '',
    priority: 3,
    conditional_rule: '',
    tense:'past',
    allowable_next_ids: [7]
  },
  {
    id: 6,
    description: 'not yet',
    englishModifier: (english) => { return ' not yet' + english; },
    expression: '-ksaite\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,7]
  },
  {
    id: 7,
    description: 'future tense',
    englishModifier: (english) => { return ''+ english},
    expression: '+ciqe\\',
    expression_conditional: '@ciiqe\\',  // conditional te_ending
    priority: 3,
    conditional_rule: 'attaching_to_te',  // defined later and if satisfied display expression_conditional
    tense:'future',
    allowable_next_ids: [0,1,5,10]
  },
  {
    id: 8,
    description: 'will not',
    englishModifier: (english) => { return ' not' +  english; },
    expression: '@~+6aite\\',
    expression_conditional: '',
    priority: 3,
    conditional_rule: '',
    tense:'future',
    allowable_next_ids: [0,1,7,10]
  },
  {
    id: 9,
    description: 'will soon',
    englishModifier: (english) => { return ' soon' + english; },
    expression: '@~+niarar\\',
    expression_conditional: '',
    priority: 3,
    conditional_rule: '',
    tense:'future',
    allowable_next_ids: [0,1,5,6,7,10]
  },
  {
    id: 10,
    description: 'about to',
    englishModifier: (english) => { return ' about to' + english; },
    expression: '-qatar\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1,7]
  },
  {
    id: 11,
    description: 'repeatedly',
    englishModifier: (english) => { return ' repeatedly' + english; },
    expression: '-lar\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 12,
    description: 'doing it again',
    englishModifier: (english) => { return ' (again)' + english; },
    expression: '-nqigte\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 13,
    description: 'almost',
    englishModifier: (english) => { return ' almost' + english; },
    expression: '@~+yarpiar\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 14,
    description: 'never',
    englishModifier: (english) => { return ' never' + english; },
    expression: '@-~yuite\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 15,
    description: 'no longer',
    englishModifier: (english) => { return ' no longer' + english; },
    expression: '-nrir\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,27]
  },
  {
    id: 16,
    description: 'trying (unsuccessfully) to',
    englishModifier: (english) => { return ' trying (unsuccessfully) to' + english; },
    englishModifierInfinitive: (english) => { return ' try (unsuccessfully) to' + english; },
    englishModifierGerund: (english) => { return ' trying (unsuccessfully) to' + english; },
    expression: '@~+yaaqe\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,17,19]
  },
  {
    id: 17,
    description: 'trying despite difficulties to',
    englishModifier: (english) => { return ' trying despite difficulties to' + english; },
    englishModifierInfinitive: (english) => { return ' try despite difficulties to' + english; },
    englishModifierGerund: (english) => { return ' trying despite difficulties to' + english; },
    expression: '-qcaar(ar)\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,16,18]
  },
  {
    id: 18,
    description: 'trying to',
    englishModifier: (english) => { return ' trying to' + english; },
    englishModifierInfinitive: (english) => { return ' try to' + english; },
    englishModifierGerund: (english) => { return ' trying to' + english; },
    expression: '-6naqe\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,16,17]
  },
  {
    id: 19,
    description: 'excessively (too much)',
    englishModifier: (english) => { return ' excessively' + english; },
    expression: '-3iyaag\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 20,
    description: 'to be more or better at',
    englishModifier: (english) => { return ' (being more or better at)' + english; },
    expression: '-nru\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 21,
    description: 'loves to',
    englishModifier: (english) => { return ' loves to' + english; },
    englishModifierInfinitive: (english) => { return ' love to' + english; },
    englishModifierGerund: (english) => { return ' loving to' + english; },
    expression: '@~+yunqe4\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,7,8]
  },
  {
    id: 22,
    description: 'no longer wants to',
    englishModifier: (english) => { return ' no longer wants to' + english; },
    englishModifierInfinitive: (english) => { return ' no longer want to' + english; },
    englishModifierGerund: (english) => { return ' no longer wanting to' + english; },
    expression: '@~+yuumiir(ar)te\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,7,8]
  },
  {
    id: 23,
    description: 'not care to',
    englishModifier: (english) => { return ' not care to' + english; },
    englishModifierInfinitive: (english) => { return ' not care to' + english; },
    englishModifierGerund: (english) => { return ' not caring to' + english; },
    expression: '@~+yuumiite\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,7,8]
  },
  {
    id: 24,
    description: 'yearns to',
    englishModifier: (english) => { return ' yearns to' + english; },
    englishModifierInfinitive: (english) => { return ' yearn to' + english; },
    englishModifierGerund: (english) => { return ' yearning to' + english; },
    expression: '@~+yuumir\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,7,8]
  },
  {
    id: 25,
    description: 'wants to',
    englishModifier: (english) => { return ' wants to' + english; },
    englishModifierInfinitive: (english) => { return ' want to' + english; },
    englishModifierGerund: (english) => { return ' wanting to' + english; },
    expression: '@~+yug\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,7,8]
  },
  {
    id: 26,
    description: 'enjoys doing',
    englishModifier: (english) => { return ' enjoying' + english; },
    englishModifierInfinitive: (english) => { return ' enjoy' + english; },
    englishModifierGerund: (english) => { return ' enjoying' + english; },
    expression: '@~+yugar\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,7,8]
  },
  {
    id: 27,
    description: 'not',
    englishModifier: (english) => { return ' not' + english; },
    expression: '-nrite\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1]
  },
  // {
  //   id: 28,
  //   description: 'to ask one to',
  //   englishModifier: (english) => { return 'to ask one to' + english; },
  //   expression: 'sqe-\\',
  //   expression_conditional: '',
  //   conditional_rule: '',
  //   tense:'',
  //   allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
  // },
  {
    id: 28,
    description: 'in the process of',
    englishModifier: (english) => { return ' in the process of' + english; },
    expression: '@~+yartur\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,19]
  },
  {
    id: 29,
    description: 'definitely no longer going to',
    englishModifier: (english) => { return ' definitely no longer going to' + english; },
    expression: '@~+yugnairute\\',
    expression_conditional: '',
    priority: 1,
    conditional_rule: '',
    tense:'',
    allowable_next_ids: [0,1,3,4,8,10], // only refers to the postbases, not the endings
  }
];
export const nounPostbases = [
  {
    id: 0,
    description: 'large',
    englishModifier: (english) => { return 'large' + english; },
    expression_end: '-rpak',
    expression_postbase: '-rpag\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: [1]
  },
  {
    id: 1,
    description: 'small',
    englishModifier: (english) => { return 'small' + english; },
    expression_end: '-cuar',
    expression_postbase: '-cuar\\',
    expression_conditional_end: '-kcuar',
    expression_conditional_postbase: '-kcuar(ar)\\',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: [0]
  },
  {
    id: 2,
    description: 'baby/little',
    englishModifier: (english) => { return 'baby/little' + english; },
    expression_end: '-yagaq',
    expression_postbase: '-yagar\\',
    expression_conditional_end: '-yagaq',
    expression_conditional_postbase: '-yagar\\',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 3,
    description: 'good',
    englishModifier: (english) => { return 'good' + english; },
    expression_end: '-kegtaar',
    expression_postbase: '-kegtaar\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 4,
    description: 'shabby',
    englishModifier: (english) => { return 'shabby' + english; },
    expression_end: '-2er',
    expression_postbase: '-2er\\',
    expression_conditional_end: '-2er',
    expression_conditional_postbase: '-2er\\',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 5,
    description: 'genuine',
    englishModifier: (english) => { return 'genuine' + english; },
    expression_end: '-piaq',
    expression_postbase: '-piar\\',
    expression_conditional_end: '-pik',
    expression_conditional_postbase: '-pig\\',
    conditional_rule: '',
    priority:4,
    tense:'past',
    allowable_next_ids: []
  },
  {
    id: 6,
    description: 'fake',
    englishModifier: (english) => { return 'fake' + english; },
    expression_end: '-(6)uaq',
    expression_postbase: '-(6)uar\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 7,
    description: 'many Ns',
    englishModifier: (english) => { return 'many of them'+ english},
    expression_end: '-rugaq',
    expression_postbase: '-rugar\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:2,
    tense:'noun_end',
    allowable_next_ids: []
  },
  {
    id: 8,
    description: 'just a little',
    englishModifier: (english) => { return 'just a little'+ english},
    expression_end: '-5aq',
    expression_postbase: '-5ar\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:2,
    tense:'noun_end',
    allowable_next_ids: []
  },
  {
    id: 9,
    description: 'N and other',
    englishModifier: (english) => { return 'and another - only applies to people or animals' + english; },
    expression_end: ':(e)nkuk',
    expression_postbase: ':(e)nkug\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:2,
    tense:'noun_end',
    allowable_next_ids: []
  },
  {
    id: 10,
    description: 'N and others',
    englishModifier: (english) => { return 'and others - only applies to people or animals' + english; },
    expression_end: ':(e)nkut',
    expression_postbase: ':(e)nkur\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:2,
    tense:'noun_end',
    allowable_next_ids: []
  },
  {
    id: 11,
    description: 'to hunt',
    englishModifier: (english) => { return 'hunting' + english; },
    expression_postbase: '+cur\\',
    expression_conditional_postbase: '+ssur\\',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 12,
    description: 'to make',
    englishModifier: (english) => { return 'making' + english; },
    expression_postbase: '-li\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 13,
    description: 'to catch lots of',
    englishModifier: (english) => { return 'catching lots of' + english; },
    expression_postbase: '-liqe\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 14,
    description: 'to have lots of',
    englishModifier: (english) => { return 'lots of' + english; },
    expression_postbase: '-lir\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 15,
    description: 'to be occupied with',
    englishModifier: (english) => { return 'occupied with' + english; },
    expression_postbase: '-liur\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 16,
    description: 'to acquire',
    englishModifier: (english) => { return 'acquiring' + english; },
    expression_postbase: '-6e\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 17,
    description: 'to have',
    englishModifier: (english) => { return '' + english; },
    expression_postbase: '-ngqerr\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 18,
    description: 'the place does not have',
    englishModifier: (english) => { return '(location) does not have' + english; },
    expression_postbase: '+taite\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 19,
    description: 'the place has',
    englishModifier: (english) => { return '(location) has' + english; },
    expression_postbase: '+ta6qe5\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 20,
    description: 'to eat',
    englishModifier: (english) => { return 'eating' + english; },
    expression_postbase: '+tur\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  },
  {
    id: 21,
    description: 'to become',
    englishModifier: (english) => { return 'become' + english; },
    expression_postbase: '~:(6)urte\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: []
  }
];

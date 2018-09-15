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
    allowable_next_ids: [1,3,4]
  },
  {
    id: 1,
    description: 'small',
    englishModifier: (english) => { return 'small' + english; },
    expression_end: '-cuar',
    expression_postbase: '-cuar(ar)\\',
    expression_conditional_end: '-kcuar',
    expression_conditional_postbase: '-kcuar(ar)\\',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 2,
    description: 'baby/little',
    englishModifier: (english) => { return 'baby/little' + english; },
    expression_end: '-ya(g)aq',
    expression_postbase: '-ya(g)(ar)\\',
    expression_conditional_end: '-yagaq',
    expression_conditional_postbase: '-yag(ar)\\',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 3,
    description: 'good',
    englishModifier: (english) => { return 'good' + english; },
    expression_end: '-kegtaar',
    expression_postbase: '-kegtaar(ar)\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 4,
    description: 'bad',
    englishModifier: (english) => { return 'bad' + english; },
    expression_end: '@-lluk',
    expression_postbase: '@-llug\\',
    expression_conditional_end: '-rrluk',
    expression_conditional_postbase: '-rrlug\\',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
  },
  {
    id: 6,
    description: 'fake',
    englishModifier: (english) => { return 'fake' + english; },
    expression_end: '+(6)uaq',
    expression_postbase: '+(6)uar\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:4,
    tense:'',
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [0,1,2,3,4]
  },
  {
    id: 8,
    description: 'just a little',
    englishModifier: (english) => { return 'just a little'+ english},
    expression_end: '-rraq',
    expression_postbase: '-rrar\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:2,
    tense:'noun_end',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 9,
    description: 'N and other',
    englishModifier: (english) => { return 'and another' + english; },
    expression_end: ':(e)nkuk',
    expression_postbase: ':(e)nkug\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:2,
    tense:'noun_end',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 10,
    description: 'N and others',
    englishModifier: (english) => { return 'and others' + english; },
    expression_end: ':(e)nkut',
    expression_postbase: ':(e)nkur\\',
    expression_conditional_end: '',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:2,
    tense:'noun_end',
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
  },
  {
    id: 16,
    description: 'to acquire',
    englishModifier: (english) => { return 'acquiring' + english; },
    expression_postbase: '-nge\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 17,
    description: 'to have',
    englishModifier: (english) => { return 'the place has' + english; },
    expression_postbase: '-ngqerr\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 18,
    description: 'for there not to be',
    englishModifier: (english) => { return 'the place has no' + english; },
    expression_postbase: '+taite\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: [1,3,4]
  },
  {
    id: 19,
    description: 'for there to be',
    englishModifier: (english) => { return 'for there to be' + english; },
    expression_postbase: '+tangqerr\\',
    expression_conditional_postbase: '',
    conditional_rule: '',
    priority:1,
    tense:'',
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
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
    allowable_next_ids: [1,3,4]
  }
];
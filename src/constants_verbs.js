export const nounEndings = {
  'the one who is': '-lria',
  'device for': '+cuun',
  'one that customarily/capably is': '-tuli',
  'how to/way of': '@~+yaraq',
  'one who is good at': '@~-yuli',
  'act or state of': '-lleq '
};

export const indicative_intransitive_endings = {
  1: { // 1st person
    1: '+\'(g/t)u:6a', // I
    2: '+\'(g/t)ukuk', // you
    3: '+\'(g/t)ukut', // he
  },
  2: {
    1: '+\'(g/t)uten', // I
    2: '+\'(g/t)utek', // you
    3: '+\'(g/t)uci', // he
  },
  3: {
    1: '+\'(g/t)uq',
    2: '+\'(g/t)uk',
    3: '+\'(g/t)ut',
  }
};

export const indicative_transitive_endings = {
  1: {
    1: {
      1: {
        1:'', //not allowed
        2:'',
        3:'',
      },
      2: {
        1:'+\'(g)amken',
        2:'+\'(g)amtek',
        3:'+\'(g)amci',
      },
      3: {
        1:'+\'(g)aqa',
        2:'+\'(g)agka',
        3:'+\'(g)anka',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'+\'(g)amegten',
        2:'+\'(g)amegtek',
        3:'+\'(g)amegci',
      },
      3: {
        1:'+\'(g)apuk',
        2:'+\'(g)agpuk',
        3:'+\'(g)apuk',
      },
    },
    3: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'+\'(g)amte4en',
        2:'+\'(g)amcetek',
        3:'+\'(g)amceci',
      },
      3: {
        1:'+\'(g)aput',
        2:'+\'(g)agput',
        3:'+\'(g)aput',
      }
    }
  },
  2: {
    1: {
      1: {
        1:'+\'(g)arpenga',
        2:'+\'(g)arpekuk',
        3:'+\'(g)arpekut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+\'(g)an',
        2:'+\'(g)agken',
        3:'+\'(g)aten',
      },
    },
    2: {
      1: {
        1:'+\'(g)arpetegnga',
        2:'+\'(g)arpetegkuk',
        3:'+\'(g)arpetegkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+\'(g)atek',
        2:'+\'(g)agtek',
        3:'+\'(g)atek',
      },
    },
    3: {
      1: {
        1:'+\'(g)arpecia',
        2:'+\'(g)arpecikuk',
        3:'+\'(g)arpecikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+\'(g)aci',
        2:'+\'(g)agci',
        3:'+\'(g)aci',
      }
    }
  },
  3: {
    1: {
      1: {
        1:'+\'(g)anga',
        2:'+\'(g)akuk',
        3:'+\'(g)akut',
      },
      2: {
        1:'+\'(g)aten',
        2:'+\'(g)atek',
        3:'+\'(g)aci',
      },
      3: {
        1:'+\'(g)aa',
        2:'+\'(g)ak',
        3:'+\'(g)ai',
      },
    },
    2: {
      1: {
        1:'+\'(g)agnga',
        2:'+\'(g)agkuk',
        3:'+\'(g)agkut',
      },
      2: {
        1:'+\'(g)agten',
        2:'+\'(g)agtek',
        3:'+\'(g)agci',
      },
      3: {
        1:'+\'(g)aak',
        2:'+\'(g)agkek',
        3:'+\'(g)akek',
      },
    },
    3: {
      1: {
        1:'+\'(g)atnga',
        2:'+\'(g)aitkuk',
        3:'+\'(g)aitkut',
      },
      2: {
        1:'+\'(g)atgen',
        2:'+\'(g)aicetek',
        3:'+\'(g)aiceci',
      },
      3: {
        1:'+\'(g)aat',
        2:'+\'(g)agket',
        3:'+\'(g)ait',
      }
    }
  }
};

export const interrogative_intransitive_endings = {
  1: { // 1st person
    1: '~+(t)sia',
    2: '@~+ce8uk',
    3: '@~+ceta',
  },
  2: {
    1: '~+(t)sit',
    2: '@~+cetek',
    3: '@~+ceci',
  },
  3: {
    1: '+\'(g/t)a',
    2: '+\'(g/t)ak',
    3: '+\'(g/t)at',
  }
};

export const interrogative_transitive_endings = {
  1: {
    1: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'',
        2:'',
        3:'',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'',
        2:'',
        3:'',
      },
    },
    3: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'',
        2:'',
        3:'',
      }
    }
  },
  2: {
    1: {
      1: {
        1:'~+(t)sia',
        2:'~+(t)sikuk',
        3:'~+(t)sikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'~+(t)siu',
        2:'~+(t)sikek',
        3:'~+(t)siki',
      },
    },
    2: {
      1: {
        1:'@~+cetegenga',
        2:'@~+cetegkuk',
        3:'@~+cetegkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@~+cetegnegu',
        2:'@~+cetegkek',
        3:'@~+cetegki',
      },
    },
    3: {
      1: {
        1:'@~+cecia',
        2:'@~+cecikuk',
        3:'@~+cecikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@~+ceciu',
        2:'@~+cecikek',
        3:'@~+ceciki',
      }
    }
  },
  3: {
    1: {
      1: {
        1:'+\'(g/t)anga',
        2:'+\'(g/t)akuk',
        3:'+\'(g/t)akut',
      },
      2: {
        1:'+\'(g/t)aten',
        2:'+\'(g/t)atek',
        3:'+\'(g/t)aci',
      },
      3: {
        1:'+\'(g/t)a:gu',
        2:'+\'(g/t)akek',
        3:'+\'(g/t)aki',
      },
    },
    2: {
      1: {
        1:'+\'(g/t)agnga',
        2:'+\'(g/t)agkuk',
        3:'+\'(g/t)agkut',
      },
      2: {
        1:'+\'(g/t)agten',
        2:'+\'(g/t)agtek',
        3:'+\'(g/t)agci',
      },
      3: {
        1:'+\'(g/t)agnegu',
        2:'+\'(g/t)agkek',
        3:'+\'(g/t)agki',
      },
    },
    3: {
      1: {
        1:'+\'(g/t)atnga',
        2:'+\'(g/t)atkuk',
        3:'+\'(g/t)atkut',
      },
      2: {
        1:'+\'(g/t)atgen',
        2:'+\'(g/t)acetek',
        3:'+\'(g/t)aceci',
      },
      3: {
        1:'+\'(g/t)atgu',
        2:'+\'(g/t)atkek',
        3:'+\'(g/t)atki',
      }
    }
  }
};

export const optative_intransitive_endings = {
  1: { // 1st person
    1: '@~+lii', //if te ending, tl becomes ll
    2: '@~+luk', //if te ending, tl becomes ll
    3: '-lta', // also %(e)lta
  },
  2: {
    1: '$', // ending in a, i, u, do nothing. ending in two vowels or e, (g)i. ending in te, ending is n. consonant ending, end is :a. special te, ending is lu.
    2: '@+tek',//drops te from bases
    3: '@+ci',
  },
  3: {
    1: '@~+li', //if te ending, tl becomes ll
    2: '@~+lik', //if te ending, tl becomes ll
    3: '@~+lit', //if te ending, tl becomes ll
  }
};

export const optative_transitive_endings = {
  1: {
    1: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'@~+lamken',
        2:'@~+lamtek',
        3:'@~+lamci',
      },
      3: {
        1:'@~+laku',
        2:'@~+lakek',
        3:'@~+laki',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'@~+lamegten',
        2:'@~+lamegtek',
        3:'@~+lamegci',
      },
      3: {
        1:'@+lauk',
        2:'@+lagpuk',
        3:'@+lapuk',
      },
    },
    3: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'@~+lamte4en',
        2:'@~+lamcetek',
        3:'@~+lamceci',
      },
      3: {
        1:'@+laut',
        2:'@+lagput',
        3:'@+laput',
      }
    }
  },
  2: {
    1: {
      1: {
        1:'@+:(6)a',
        2:'@+kuk',
        3:'@+kut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'&',
        2:'@+kek',
        3:'@+ki',
      },
    },
    2: {
      1: {
        1:'@+tegnga',
        2:'@+tegkuk',
        3:'@+tegkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@+tegu',
        2:'@+tegkek',
        3:'@+tegki',
      },
    },
    3: {
      1: {
        1:'@+cia',
        2:'@+cikuk',
        3:'@+cikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@+ciu',
        2:'@+ciki',
        3:'@+cikek',
      }
    }
  },
  3: {
    1: {
      1: {
        1:'@~+linga',
        2:'@~+likuk',
        3:'@~+likut',
      },
      2: {
        1:'@~+liten',
        2:'@~+litek',
        3:'@~+lici',
      },
      3: {
        1:'@~+liku',
        2:'@~+likek',
        3:'@~+liki',
      },
    },
    2: {
      1: {
        1:'@~+lignga',
        2:'@~+ligkuk',
        3:'@~+ligkut',
      },
      2: {
        1:'@~+ligten',
        2:'@~+ligtek',
        3:'@~+ligci',
      },
      3: {
        1:'@~+ligtegu',
        2:'@~+ligtegkek',
        3:'@~+ligtegki',
      },
    },
    3: {
      1: {
        1:'@~+litnga',
        2:'@~+litkuk',
        3:'@~+litkut',
      },
      2: {
        1:'@~+litgen',
        2:'@~+licetek',
        3:'@~+liceci',
      },
      3: {
        1:'@~+lignegu',
        2:'@~+ligkek',
        3:'@~+ligki',
      }
    }
  }
};

export const subordinative_intransitive_endings = {
  1: {
    1: '@~+lua',
    2: '@~+lunuk',
    3: '@~+luta',
  },
  2: {
    1: '@~+luten',
    2: '@~+lutek',
    3: '@~+luci',
  },
  4: {
    1: '@~+luni',
    2: '@~+lutek',
    3: '@~+luteng',
  }
};

export const subordinative_transitive_endings = {
  1: {
    1: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'@~+luten',
        2:'@~+lutek',
        3:'@~+luci',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'@~+luten',
        2:'@~+lutek',
        3:'@~+luci',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      },
    },
    4: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'@~+luten',
        2:'@~+lutek',
        3:'@~+luci',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      }
    }
  },
  2: {
    1: {
      1: {
        1:'@~+lua',
        2:'@~+lunuk',
        3:'@~+luta',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      },
    },
    2: {
      1: {
        1:'@~+lua',
        2:'@~+lunuk',
        3:'@~+luta',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      },
    },
    4: {
      1: {
        1:'@~+lua',
        2:'@~+lunuk',
        3:'@~+luta',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      }
    }
  },
  4: {
    1: {
      1: {
        1:'@~+lua',
        2:'@~+lunuk',
        3:'@~+luta',
      },
      2: {
        1:'@~+luten',
        2:'@~+lutek',
        3:'@~+luci',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      },
    },
    2: {
      1: {
        1:'@~+lua',
        2:'@~+lunuk',
        3:'@~+luta',
      },
      2: {
        1:'@~+luten',
        2:'@~+lutek',
        3:'@~+luci',
      },
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      },
    },
    4: {
      1: {
        1:'@~+lua',
        2:'@~+lunuk',
        3:'@~+luta',
      },
      2: {
        1:'@~+luten',
        2:'@~+lutek',
        3:'@~+luci',
      },//
      3: {
        1:'@~+luku',
        2:'@~+lukek',
        3:'@~+luki',
      }
    }
  }
};

export const connective_intransitive_endings = {
  1: {
    1: '+ma',
    2: '-megnuk',
    3: '-mta',
  },
  2: {
    1: '+(t)vet',
    2: '+(t)vtek',
    3: '+(t)vci',
  },
  3: {
    1: ':an',
    2: ':agnek',
    3: ':ata',
  },
  4: {
    1: '+mi',
    2: '+mek',
    3: '+meng',
  }
};

export const connective_transitive_endings = {
  1: {
    1: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mken',
        2:'-mtek',
        3:'-mci',
      },
      3: {
        1:'-mku',
        2:'-mkek',
        3:'-mki',
      },
      4: {
        1:'-mni',
        2:'-mtek',
        3:'-mteng',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-megten',
        2:'-megtek',
        3:'-megci',
      },
      3: {
        1:'-megnegu',
        2:'-megkek',
        3:'-megki',
      },
      4: {
        1:'-megni',
        2:'-megtek',
        3:'-megteng',
      },
    },
    3: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mte4en',
        2:'-mcetek',
        3:'-mceci',
      },
      3: {
        1:'-mte4u',
        2:'-mtekek',
        3:'-mteki',
      },
      4: {
        1:'-mteni',
        2:'-mcetek',
        3:'-mceteng',
      },
    }
  },
  2: {
    1: {
      1: {
        1:'+(t)vnga',
        2:'+(t)vkuk',
        3:'+(t)vkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vgu',
        2:'+(t)vkek',
        3:'+(t)vki',
      },
      4: {
        1:'+(t)vni',
        2:'+(t)vtek',
        3:'+(t)vteng',
      },
    },
    2: {
      1: {
        1:'+(t)vtegnga',
        2:'+(t)vtegkuk',
        3:'+(t)vtegkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vtegni',
        2:'+(t)vtegtek',
        3:'+(t)vtegteng',
      },
      4: {
        1:'+(t)vtegu',
        2:'+(t)vtegkek',
        3:'+(t)vtegki',
      },
    },
    3: {
      1: {
        1:'+(t)vcia',
        2:'+(t)vcikuk',
        3:'+(t)vcikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vciu',
        2:'+(t)vcikek',
        3:'+(t)vciki',
      },
      4: {
        1:'+(t)vce8i',
        2:'+(t)vcetek',
        3:'+(t)vceteng',
      }
    }
  },
  3: {
    1: {
      1: {
        1:':anga',
        2:':akuk',
        3:':akut',
      },
      2: {
        1:':aten',
        2:':atek',
        3:':aci',
      },
      3: {
        1:':aku',
        2:':akek',
        3:':aki',
      },
      4: {
        1:':ani',
        2:':atek',
        3:':ateng',
      },
    },
    2: {
      1: {
        1:':agnga',
        2:':agkuk',
        3:':agkut',
      },
      2: {
        1:':agten',
        2:':agtek',
        3:':agci',
      },
      3: {
        1:':agku',
        2:':agkek',
        3:':agki',
      },
      4: {
        1:':agni',
        2:':agtek',
        3:':agteng',
      },
    },
    3: {
      1: {
        1:':atnga',
        2:':atkuk',
        3:':atkut',
      },
      2: {
        1:':atgen',
        2:':acetek',
        3:':aceci',
      },
      3: {
        1:':atgu',
        2:':atkek',
        3:':atki',
      },
      4: {
        1:':atni',
        2:':acetek',
        3:':aceteng',
      },
    }
  },
  4: {
    1: {
      1: {
        1:'+mia',
        2:'+mikuk',
        3:'+mikut',
      },
      2: {
        1:'+miten',
        2:'+mitek',
        3:'+mici',
      },
      3: {
        1:'+miu',
        2:'+mikek',
        3:'+miki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    2: {
      1: {
        1:'+megnenga',
        2:'+megnekuk',
        3:'+megnekut',
      },
      2: {
        1:'+megnegen',
        2:'+megnetek',
        3:'+megneci',
      },
      3: {
        1:'+megnegu',
        2:'+megnekek',
        3:'+megneki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    3: {
      1: {
        1:'+megtenga',
        2:'+megtekuk',
        3:'+megtekut',
      },
      2: {
        1:'+megte4en',
        2:'+megcetek',
        3:'+megneci',
      },
      3: {
        1:'+megte4u',
        2:'+megtekek',
        3:'+megteki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      }
    }
  }
};

export const connective_consonantEnd_intransitive_endings = {
  1: {
    1: '+ma',
    2: '-megnuk',
    3: '-mta',
  },
  2: {
    1: '+(t)vet',
    2: '+(t)vetek',
    3: '+(t)veci',
  },
  3: {
    1: ':an',
    2: ':agnek',
    3: ':ata',
  },
  4: {
    1: '+mi',
    2: '+mek',
    3: '+meng',
  }
};

export const connective_consonantEnd_transitive_endings = {
  1: {
    1: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mken',
        2:'-mtek',
        3:'-mci',
      },
      3: {
        1:'-mku',
        2:'-mkek',
        3:'-mki',
      },
      4: {
        1:'-mni',
        2:'-mtek',
        3:'-mteng',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-megten',
        2:'-megtek',
        3:'-megci',
      },
      3: {
        1:'-megnegu',
        2:'-megkek',
        3:'-megki',
      },
      4: {
        1:'-megni',
        2:'-megtek',
        3:'-megteng',
      },
    },
    3: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mte4en',
        2:'-mcetek',
        3:'-mceci',
      },
      3: {
        1:'-mte4u',
        2:'-mtekek',
        3:'-mteki',
      },
      4: {
        1:'-mteni',
        2:'-mcetek',
        3:'-mceteng',
      },
    }
  },
  2: {
    1: {
      1: {
        1:'+(t)venga',
        2:'+(t)vekuk',
        3:'+(t)vekut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vegu',
        2:'+(t)vekek',
        3:'+(t)veki',
      },
      4: {
        1:'+(t)veni',
        2:'+(t)vetek',
        3:'+(t)veteng',
      },
    },
    2: {
      1: {
        1:'+(t)vetegnga',
        2:'+(t)vetegkuk',
        3:'+(t)vetegkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vetegni',
        2:'+(t)vetegtek',
        3:'+(t)vetegteng',
      },
      4: {
        1:'+(t)vetgu',
        2:'+(t)vetegkek',
        3:'+(t)vetegki',
      },
    },
    3: {
      1: {
        1:'+(t)vecia',
        2:'+(t)vecikuk',
        3:'+(t)vecikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)veciu',
        2:'+(t)vecikek',
        3:'+(t)veciki',
      },
      4: {
        1:'+(t)vece8i',
        2:'+(t)vecetek',
        3:'+(t)veceteng',
      }
    }
  },
  3: {
    1: {
      1: {
        1:':anga',
        2:':akuk',
        3:':akut',
      },
      2: {
        1:':aten',
        2:':atek',
        3:':aci',
      },
      3: {
        1:':aku',
        2:':akek',
        3:':aki',
      },
      4: {
        1:':ani',
        2:':atek',
        3:':ateng',
      },
    },
    2: {
      1: {
        1:':agnga',
        2:':agkuk',
        3:':agkut',
      },
      2: {
        1:':agten',
        2:':agtek',
        3:':agci',
      },
      3: {
        1:':agku',
        2:':agkek',
        3:':agki',
      },
      4: {
        1:':agni',
        2:':agtek',
        3:':agteng',
      },
    },
    3: {
      1: {
        1:':atnga',
        2:':atkuk',
        3:':atkut',
      },
      2: {
        1:':atgen',
        2:':acetek',
        3:':aceci',
      },
      3: {
        1:':atgu',
        2:':atkek',
        3:':atki',
      },
      4: {
        1:':atni',
        2:':acetek',
        3:':aceteng',
      },
    }
  },
  4: {
    1: {
      1: {
        1:'+mia',
        2:'+mikuk',
        3:'+mikut',
      },
      2: {
        1:'+miten',
        2:'+mitek',
        3:'+mici',
      },
      3: {
        1:'+miu',
        2:'+mikek',
        3:'+miki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    2: {
      1: {
        1:'+megnenga',
        2:'+megnekuk',
        3:'+megnekut',
      },
      2: {
        1:'+megnegen',
        2:'+megnetek',
        3:'+megneci',
      },
      3: {
        1:'+megnegu',
        2:'+megnekek',
        3:'+megneki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    3: {
      1: {
        1:'+megtenga',
        2:'+megtekuk',
        3:'+megtekut',
      },
      2: {
        1:'+megte4en',
        2:'+megcetek',
        3:'+megneci',
      },
      3: {
        1:'+megte4u',
        2:'+megtekek',
        3:'+megteki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      }
    }
  }
};

export const connective_contemporative_intransitive_endings = {
  1: {
    1: '-mni',
    2: '-megni',
    3: '-mte8i',
  },
  2: {
    1: '+(t)veni',
    2: '+(t)vetegni',
    3: '+(t)vece8i',
  },
  3: {
    1: ':ani',
    2: ':agni',
    3: ':atni',
  },
  4: {
    1: '+mini',
    2: '+megni',
    3: '+me4ni',
  }
};

export const connective_contemporative_transitive_endings = {
  1: {
    1: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mken',
        2:'-mtek',
        3:'-mci',
      },
      3: {
        1:'-mku',
        2:'-mkek',
        3:'-mki',
      },
      4: {
        1:'-mni',
        2:'-mtek',
        3:'-mteng',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-megten',
        2:'-megtek',
        3:'-megci',
      },
      3: {
        1:'-megnegu',
        2:'-megkek',
        3:'-megki',
      },
      4: {
        1:'-megni',
        2:'-megtek',
        3:'-megteng',
      },
    },
    3: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mte4en',
        2:'-mcetek',
        3:'-mceci',
      },
      3: {
        1:'-mte4u',
        2:'-mtekek',
        3:'-mteki',
      },
      4: {
        1:'-mteni',
        2:'-mcetek',
        3:'-mceteng',
      },
    }
  },
  2: {
    1: {
      1: {
        1:'+(t)venga',
        2:'+(t)vekuk',
        3:'+(t)vekut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vegu',
        2:'+(t)vekek',
        3:'+(t)veki',
      },
      4: {
        1:'+(t)veni',
        2:'+(t)vetek',
        3:'+(t)veteng',
      },
    },
    2: {
      1: {
        1:'+(t)vetegnga',
        2:'+(t)vetegkuk',
        3:'+(t)vetegkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vetegni',
        2:'+(t)vetegtek',
        3:'+(t)vetegteng',
      },
      4: {
        1:'+(t)vetgu',
        2:'+(t)vetegkek',
        3:'+(t)vetegki',
      },
    },
    3: {
      1: {
        1:'+(t)vecia',
        2:'+(t)vecikuk',
        3:'+(t)vecikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)veciu',
        2:'+(t)vecikek',
        3:'+(t)veciki',
      },
      4: {
        1:'+(t)vece8i',
        2:'+(t)vecetek',
        3:'+(t)veceteng',
      }
    }
  },
  3: {
    1: {
      1: {
        1:':anga',
        2:':akuk',
        3:':akut',
      },
      2: {
        1:':aten',
        2:':atek',
        3:':aci',
      },
      3: {
        1:':aku',
        2:':akek',
        3:':aki',
      },
      4: {
        1:':ani',
        2:':atek',
        3:':ateng',
      },
    },
    2: {
      1: {
        1:':agnga',
        2:':agkuk',
        3:':agkut',
      },
      2: {
        1:':agten',
        2:':agtek',
        3:':agci',
      },
      3: {
        1:':agku',
        2:':agkek',
        3:':agki',
      },
      4: {
        1:':agni',
        2:':agtek',
        3:':agteng',
      },
    },
    3: {
      1: {
        1:':atnga',
        2:':atkuk',
        3:':atkut',
      },
      2: {
        1:':atgen',
        2:':acetek',
        3:':aceci',
      },
      3: {
        1:':atgu',
        2:':atkek',
        3:':atki',
      },
      4: {
        1:':atni',
        2:':acetek',
        3:':aceteng',
      },
    }
  },
  4: {
    1: {
      1: {
        1:'+minia',
        2:'+minikuk',
        3:'+minikut',
      },
      2: {
        1:'+miniten',
        2:'+minitek',
        3:'+minici',
      },
      3: {
        1:'+miniu',
        2:'+minikek',
        3:'+miniki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    2: {
      1: {
        1:'+minegnenga',
        2:'+minegnekuk',
        3:'+minegnekut',
      },
      2: {
        1:'+minegnegen',
        2:'+minegnetek',
        3:'+minegneci',
      },
      3: {
        1:'+minegnegu',
        2:'+minegnekek',
        3:'+minegneki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    3: {
      1: {
        1:'+minegtenga',
        2:'+minegtekuk',
        3:'+minegtekut',
      },
      2: {
        1:'+minegte4en',
        2:'+minegcetek',
        3:'+minegneci',
      },
      3: {
        1:'+minegte4u',
        2:'+minegtekek',
        3:'+minegteki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      }
    }
  }
};

export const connective_conditional_intransitive_endings = {
  1: {
    1: '+ma',
    2: '-megnuk',
    3: '-mta',
  },
  2: {
    1: '+(t)vet',
    2: '+(t)vtek',
    3: '+(t)vci',
  },
  3: {
    1: ':an',
    2: ':agnek',
    3: ':ata',
  },
  4: {
    1: '+mi',
    2: '+mek',
    3: '+meng',
  }
};

export const connective_conditional_transitive_endings = {
  1: {
    1: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mken',
        2:'-mtek',
        3:'-mci',
      },
      3: {
        1:'-mku',
        2:'-mkek',
        3:'-mki',
      },
      4: {
        1:'-mni',
        2:'-mtek',
        3:'-mteng',
      },
    },
    2: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-megten',
        2:'-megtek',
        3:'-megci',
      },
      3: {
        1:'-megnegu',
        2:'-megkek',
        3:'-megki',
      },
      4: {
        1:'-megni',
        2:'-megtek',
        3:'-megteng',
      },
    },
    3: {
      1: {
        1:'',
        2:'',
        3:'',
      },
      2: {
        1:'-mte4en',
        2:'-mcetek',
        3:'-mceci',
      },
      3: {
        1:'-mte4u',
        2:'-mtekek',
        3:'-mteki',
      },
      4: {
        1:'-mteni',
        2:'-mcetek',
        3:'-mceteng',
      },
    }
  },
  2: {
    1: {
      1: {
        1:'+(t)vnga',
        2:'+(t)vkuk',
        3:'+(t)vkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vgu',
        2:'+(t)vkek',
        3:'+(t)vki',
      },
      4: {
        1:'+(t)vni',
        2:'+(t)vtek',
        3:'+(t)vteng',
      },
    },
    2: {
      1: {
        1:'+(t)vtegnga',
        2:'+(t)vtegkuk',
        3:'+(t)vtegkut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vtegni',
        2:'+(t)vtegtek',
        3:'+(t)vtegteng',
      },
      4: {
        1:'+(t)vtegu',
        2:'+(t)vtegkek',
        3:'+(t)vtegki',
      },
    },
    3: {
      1: {
        1:'+(t)vcia',
        2:'+(t)vcikuk',
        3:'+(t)vcikut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'+(t)vciu',
        2:'+(t)vcikek',
        3:'+(t)vciki',
      },
      4: {
        1:'+(t)vce8i',
        2:'+(t)vcetek',
        3:'+(t)vceteng',
      }
    }
  },
  3: {
    1: {
      1: {
        1:':anga',
        2:':akuk',
        3:':akut',
      },
      2: {
        1:':aten',
        2:':atek',
        3:':aci',
      },
      3: {
        1:':aku',
        2:':akek',
        3:':aki',
      },
      4: {
        1:':ani',
        2:':atek',
        3:':ateng',
      },
    },
    2: {
      1: {
        1:':agnga',
        2:':agkuk',
        3:':agkut',
      },
      2: {
        1:':agten',
        2:':agtek',
        3:':agci',
      },
      3: {
        1:':agku',
        2:':agkek',
        3:':agki',
      },
      4: {
        1:':agni',
        2:':agtek',
        3:':agteng',
      },
    },
    3: {
      1: {
        1:':atnga',
        2:':atkuk',
        3:':atkut',
      },
      2: {
        1:':atgen',
        2:':acetek',
        3:':aceci',
      },
      3: {
        1:':atgu',
        2:':atkek',
        3:':atki',
      },
      4: {
        1:':atni',
        2:':acetek',
        3:':aceteng',
      },
    }
  },
  4: {
    1: {
      1: {
        1:'+nia',
        2:'+nikuk',
        3:'+nikut',
      },
      2: {
        1:'+niten',
        2:'+nitek',
        3:'+nici',
      },
      3: {
        1:'+niu',
        2:'+nikek',
        3:'+niki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    2: {
      1: {
        1:'+negnenga',
        2:'+negnekuk',
        3:'+negnekut',
      },
      2: {
        1:'+negnegen',
        2:'+negnetek',
        3:'+negneci',
      },
      3: {
        1:'+negnegu',
        2:'+negnekek',
        3:'+negneki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      },
    },
    3: {
      1: {
        1:'+negtenga',
        2:'+negtekuk',
        3:'+negtekut',
      },
      2: {
        1:'+negte4en',
        2:'+negcetek',
        3:'+negneci',
      },
      3: {
        1:'+negte4u',
        2:'+negtekek',
        3:'+negteki',
      },
      4: {
        1:'',
        2:'',
        3:'',
      }
    }
  }
};

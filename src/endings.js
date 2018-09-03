let indicative_intransitive_endings = {
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
let indicative_transitive_endings = {
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
        1:'+\'(g)amteggen',
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
    },
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
        1:'',
        2:'',
        3:'',
      },
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
let interrogative_intransitive_endings = {
  1: { // 1st person 
    1: '~+(t)sia', 
    2: '@~+ceuk',
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
let interrogative_transitive_endings = {
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
    },
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
let optative_intransitive_endings = {
  1: { // 1st person 
    1: '@~+lii', //if te ending, tl becomes ll
    2: '@~+luk', //if te ending, tl becomes ll
    3: '-lta', // also %(e)lta
  },
  2: {
    1: 'special_seecomment', // ending in a, i, u, do nothing. ending in two vowels or e, (g)i. ending in te, ending is n. consonant ending, end is :a. special te, ending is lu.
    2: '@+tek',//drops te from bases 
    3: '@+ci', 
  },
  3: {
    1: '@~+li', //if te ending, tl becomes ll
    2: '@~+lik', //if te ending, tl becomes ll
    3: '@~+lit', //if te ending, tl becomes ll
  }
};
let optative_transitive_endings = {
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
        1:'@~+lamteggen',
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
        1:'@+nga',
        2:'@+kuk',
        3:'@+kut',
      },
      2: {
        1:'',
        2:'',
        3:'',
      },
      3: {
        1:'@+', 
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
    },
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
let subordinative_intransitive_endings = {
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
let subordinative_transitive_endings = {
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
    },
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
}; // includes a special case for te that ends in ll
let connective_intransitive_endings = {
  1: { 
    1: '+ma',
    2: '-megnuk',
    3: '-mta',
  },
  2: {
    1: '-vet',
    2: '-vtek',
    3: '-vci',
  },
  3: {
    1: '+mi',
    2: '+mek',
    3: '+meng',
  },
  4: {
    1: ':an',
    2: ':agnek',
    3: ':ata',
  }
};
let connective_contemporative_intransitive_endings = {
  1: { 
    1: '+ma',
    2: '-megnuk',
    3: '-mta',
  },
  2: {
    1: '-vet',
    2: '-vtek',
    3: '-vci',
  },
  3: {
    1: '+mi',
    2: '+mek',
    3: '+meng',
  },
  4: {
    1: ':an',
    2: ':agnek',
    3: ':ata',
  }
};
let connective_transitive_endings = {
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
        1:'-mteggen',
        2:'-mcetek', 
        3:'-mceci',
      },
      3: {
        1:'-mteggu',
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
        1:'-vnga',
        2:'-vkuk', 
        3:'-vkut',
      },
      2: {
        1:'',
        2:'', 
        3:'',
      },
      3: {
        1:'-vgu',
        2:'-vkek', 
        3:'-vki',
      },
      4: {
        1:'-vni',
        2:'-vtek', 
        3:'-vteng',
      },
    },
    2: {
      1: {
        1:'-vtegnga',
        2:'-vtegkuk', 
        3:'-vtegkut',
      },
      2: {
        1:'',
        2:'', 
        3:'',
      },
      3: {
        1:'-vtegni',
        2:'-vtegtek', 
        3:'-vtegteng',
      },
      4: {
        1:'-vtegu',
        2:'-vtegkek', 
        3:'-vtegki',
      },
    },
    3: {
      1: {
        1:'-vcia',
        2:'-vcikuk', 
        3:'-vcikut',
      },
      2: {
        1:'',
        2:'', 
        3:'',
      },
      3: {
        1:'-vciu',
        2:'-vcikek', 
        3:'-vciki',
      },
      4: {
        1:'-vce$ni',
        2:'-vcetek', 
        3:'-vceteng',
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
        1:'+megteggen',
        2:'+megcetek', 
        3:'+megneci',
      },
      3: {
        1:'+megteggu',
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
}; // includes a special case for te that ends in ll


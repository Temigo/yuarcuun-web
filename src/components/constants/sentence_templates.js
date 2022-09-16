



export const sentenceTemplates = {
1:["qimugta","the dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","simple","simple",[[["qimugta", "npn00.b"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["dog", "npn00.b"]]]],

3:["qimugteka","my dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [1, 1, 0, 1], "Abs"]]],"noun phrase only","simple","possession",[[["qimugte", "npn00.b"], ["ka", "npn00.ps"], [" ", "space"]], [["my", "npn00.ps"], ["one", "npn00.pd"], ["dog", "npn00.b"]]]],
4:["qimugtem pamyua","the dog's tail",[["Insert", ["np"], [[["pamyuq,pamsuq", 0, 0, 0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", -1], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1]]]],"noun phrase only","simple","possession",[[["qimugte", "npn10.b"], ["m", "npn10.pd"], [" ", "space"], ["pamyu", "npn00.b"], ["a", "npn00.pd"], [" ", "space"]], [["the", "npn10.ps"], ["one", "npn10.pd"], ["dog's", "npn10.b"], ["one", "npn00.pd"], ["tail of animal or kayak", "npn00.b"]]]],

6:["imarpigmi","in the ocean",[["Insert", ["np"], [[["imarpik,imarpak", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]],"noun phrase only","simple","oblique nouns",[[["imarpig", "npn00.b"], ["mi", "npn00.c"], [" ", "space"]], [["in or at", "npn00.c"], ["the", "npn00.ps"], ["one", "npn00.pd"], ["ocean, sea", "npn00.b"]]]],
7:["kipusvigmun","to the store",[["Insert", ["np"], [[["kipusvik,kipuyvik", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]],"noun phrase only","simple","oblique nouns",[[["kipusvig", "npn00.b"], ["mun", "npn00.c"], [" ", "space"]], [["toward", "npn00.c"], ["the", "npn00.ps"], ["one", "npn00.pd"], ["store", "npn00.b"]]]],
8:["Mamterillermek","from Bethel",[["Insert", ["np"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod", "from"]]],"noun phrase only","simple","oblique nouns",[[["Mamteriller", "npn00.b"], ["mek", "npn00.c"], [" ", "space"]], [["from", "npn00.c"], ["the", "npn00.ps"], ["one", "npn00.pd"], ["Bethel", "npn00.b"]]]],
9:["tengssuutekun","using, via an airplane",[["Insert", ["np"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]],"noun phrase only","simple","oblique nouns",[[["tengssuute", "npn00.b"], ["kun", "npn00.c"], [" ", "space"]], [["through, using", "npn00.c"], ["the", "npn00.ps"], ["one", "npn00.pd"], ["airplane", "npn00.b"]]]],
10:["qimugtetun","like a dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]],"noun phrase only","simple","oblique nouns",[[["qimugce", "npn00.b"], ["tun", "npn00.c"], [" ", "space"]], [["like", "npn00.c"], ["the", "npn00.ps"], ["one", "npn00.pd"], ["dog", "npn00.b"]]]],

12:["arnaq elitnaurista","the woman teacher",[["Insert", ["np"], [[["elitnaurista", 0, 0, 0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", 0, -1], [[["arnaq", 0, 0, 0]], [0, 0, 0, 1]]]],"noun phrase only","simple","descriptors",[[["elitnaurista", "npn00.b"], [" ", "space"], ["arnaq", "npn01.b"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["woman", "npn01.b"], ["teacher", "npn00.b"]]]],

14:["piipirpak","the big baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-rpak,-rpag-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases",[[["piipi", "npn00.b"], ["rpak", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["large", "npn00.1"], ["baby", "npn00.b"]]]],
15:["piipicuar","the small baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-cuar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases",[[["piipi", "npn00.b"], ["cuar", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["small", "npn00.1"], ["baby", "npn00.b"]]]],
16:["piipiyagaq","the little/baby baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-ya(g)aq*,-yagaq*,-ya(g)ar-,-yagar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases",[[["piipi", "npn00.b"], ["yagaq", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["baby or little", "npn00.1"], ["baby", "npn00.b"]]]],
17:["piipiqegtaar","the good baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-kegtaar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases",[[["piipi", "npn00.b"], ["kegtaar", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["good", "npn00.1"], ["baby", "npn00.b"]]]],
18:["piipiruaq","the fake baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["+(ng)uaq,@~+(ng)uar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases",[[["piipir", "npn00.b"], ["uaq", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["imitation", "npn00.1"], ["baby", "npn00.b"]]]],

20:["pissulria","the one who is hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["-lria", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases",[[["pissu", "npn00.b"], ["lria", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["who is", "npn00.1"], ["hunting", "npn00.b"]]]],
21:["pissurvik","the place to hunt",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~+vik,+(r)vik", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases",[[["pissur", "npn00.b"], ["vik", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["place to", "npn00.1"], ["hunt", "npn00.b"]]]],
22:["pissurcuun","the device for hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["+cuun|+ssuun", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases",[[["pissur", "npn00.b"], ["cuun", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["device for", "npn00.1"], ["hunting", "npn00.b"]]]],
23:["pissuryaraq","the way of hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~+yaraq", 0, 1, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases",[[["pissur", "npn00.b"], ["yaraq", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["way of", "npn00.1"], ["hunting", "npn00.b"]]]],
24:["pissutuli","the one that often hunts",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["+tuli,-tuli", 0, 1, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases",[[["pissu", "npn00.b"], ["tuli", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["who is fully capable of", "npn00.1"], ["hunting", "npn00.b"]]]],
25:["pissuyuli","the one that is good at hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~-yuli", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases",[[["pissu", "npn00.b"], ["yuli", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["who is good at", "npn00.1"], ["hunting", "npn00.b"]]]],
26:["pissulleq","the act or state of hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["-lleq¹", 0, 1, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases",[[["pissu", "npn00.b"], ["lleq", "npn00.1"], [" ", "space"]], [["the", "npn00.ps"], ["one", "npn00.pd"], ["act or state of", "npn00.1"], ["hunting", "npn00.b"]]]],


28:["ner'uq","he is eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","statement sentence","subject only",[[["ner", "mvv.b"], ["'u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating", "mvv.b"], ["", "mvv.b"]]]],
29:["piipiq ner'uq","the baby is eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject only",[[["piipiq", "mvns00.b"], [" ", "space"], ["ner", "mvv.b"], ["'u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["the", "mvns00.ps"], ["one", "mvns00.pd"], ["baby", "mvns00.b"], ["is", "mvv.m"], ["eating", "mvv.b"], ["", "mvv.b"]]]],

31:["ner'uq","he is eating something",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb",[[["ner", "mvv.b"], ["'u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating", "mvv.b"], ["something", "mvv.abl"], ["", "mvv.b"]]]],
32:["piipiq ner'uq","the baby is eathing something",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb",[[["piipiq", "mvns00.b"], [" ", "space"], ["ner", "mvv.b"], ["'u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["the", "mvns00.ps"], ["one", "mvns00.pd"], ["baby", "mvns00.b"], ["is", "mvv.m"], ["eating", "mvv.b"], ["something", "mvv.abl"], ["", "mvv.b"]]]],
33:["ner'uq akutamek","he is eating some akutaq",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb",[[["ner", "mvv.b"], ["'u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["akuta", "mvno00.b"], ["mek", "mvno00.c"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating", "mvv.b"], ["(some)", "mvns00.c"], ["the", "mvno00.ps"], ["one", "mvno00.pd"], ["“Eskimo ice cream”", "mvno00.b"], ["", "mvv.b"]]]],
34:["piipiq ner'uq akutamek","the baby is eating some akutaq",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb",[[["piipiq", "mvns00.b"], [" ", "space"], ["ner", "mvv.b"], ["'u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["akuta", "mvno00.b"], ["mek", "mvno00.c"], [" ", "space"]], [["the", "mvns00.ps"], ["one", "mvns00.pd"], ["baby", "mvns00.b"], ["is", "mvv.m"], ["eating", "mvv.b"], ["(some)", "mvns00.c"], ["the", "mvno00.ps"], ["one", "mvno00.pd"], ["“Eskimo ice cream”", "mvno00.b"], ["", "mvv.b"]]]],

36:["neraa","he is eating it",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb",[[["ner", "mvv.b"], ["a", "mvv.m"], ["a", "mvv.o"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating", "mvv.b"], ["it", "mvv.o"], ["", "mvv.b"]]]],
37:["piipim neraa","the baby is eating it",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb",[[["piipi", "mvns00.b"], ["m", "mvns00.pd"], [" ", "space"], ["ner", "mvv.b"], ["a", "mvv.m"], ["a", "mvv.o"], [" ", "space"]], [["the", "mvns00.ps"], ["one", "mvns00.pd"], ["baby", "mvns00.b"], ["is", "mvv.m"], ["eating", "mvv.b"], ["it", "mvv.o"], ["", "mvv.b"]]]],
38:["neraa akutaq","he is eating the akutaq",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb",[[["ner", "mvv.b"], ["a", "mvv.m"], ["a", "mvv.o"], [" ", "space"], ["akutaq", "mvno00.b"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating", "mvv.b"], ["the", "mvno00.ps"], ["one", "mvno00.pd"], ["“Eskimo ice cream”", "mvno00.b"], ["", "mvv.b"]]]],
39:["piipim neraa akutaq","the baby is eating the akutaq",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb",[[["piipi", "mvns00.b"], ["m", "mvns00.pd"], [" ", "space"], ["ner", "mvv.b"], ["a", "mvv.m"], ["a", "mvv.o"], [" ", "space"], ["akutaq", "mvno00.b"], [" ", "space"]], [["the", "mvns00.ps"], ["one", "mvns00.pd"], ["baby", "mvns00.b"], ["is", "mvv.m"], ["eating", "mvv.b"], ["the", "mvno00.ps"], ["one", "mvno00.pd"], ["“Eskimo ice cream”", "mvno00.b"], ["", "mvv.b"]]]],

41:["ner'uq natermi","he is sitting at/on the floor",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["nateq", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun",[[["ner", "mvv.b"], ["'u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating", "mvv.b"], ["", "mvv.b"]]]],
42:["ayagtuq Mamterillermun","he is going to Bethel",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun",[[["ayag", "mvv.b"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["left", "mvv.b"], ["", "mvv.b"]]]],
43:["utertuq elitnaurvigmek","he is returning from the school",[["Insert", ["mv"], [[["uterte-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["elitnaurvik", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod", "from"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun",[[["utert", "mvv.b"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["returned", "mvv.b"], ["", "mvv.b"]]]],
44:["ayagtuq tengssuutekun","he is going using/via airplane",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun",[[["ayag", "mvv.b"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["left", "mvv.b"], ["", "mvv.b"]]]],
45:["pangalegtuq qimugtetun","he is running on fours like a dog",[["Insert", ["mv"], [[["pangaleg-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun",[[["pangaleg", "mvv.b"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["it", "mvv.s"], ["is", "mvv.m"], ["running on four legs", "mvv.b"], ["", "mvv.b"]]]],

47:["nerciquq","he will eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["ner", "mvv.b"], ["ciq", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["will", "future"], ["eat ", "mvv.b"], ["", "mvv.b"]]]],
48:["nerenrituq","he is not eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["nere", "mvv.b"], ["nrit", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["does", "mvv.m"], ["not", "mvv.1"], ["eat ", "mvv.b"], ["", "mvv.b"]]]],
49:["neryugtuq","he wants to eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["ner", "mvv.b"], ["yug", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["wants to", "mvv.1"], ["eat ", "mvv.b"], ["", "mvv.b"]]]],
50:["neryugngauq","he can eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yugnga-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["ner", "mvv.b"], ["yugnga", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["able to", "mvv.1"], ["eat ", "mvv.b"], ["", "mvv.b"]]]],
51:["nerengnaquq","he is trying to eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-ngnaqe-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["nere", "mvv.b"], ["ngnaq", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["trying to", "mvv.1"], ["eat ", "mvv.b"], ["", "mvv.b"]]]],
52:["nerlartuq","he regularly eats",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["ner", "mvv.b"], ["lar", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["regularly", "mvv.1"], ["eating", "mvv.b"], ["", "mvv.b"]]]],
53:["neryugnarquq","he is probably eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yugnarqe¹-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["ner", "mvv.b"], ["yugnarq", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["probably", "mvv.1"], ["eating", "mvv.b"], ["", "mvv.b"]]]],
54:["nerrsiyaagtuq","he is excessively eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-ssiyaag-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases",[[["nerr", "mvv.b"], ["siyaag", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating", "mvv.b"], ["", "mvv.b"], ["too much", "mvv.1"]]]],

56:["angyangqertuq","he has a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-ngqerr-", 0, 1, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases",[[["angya", "mvv.b"], ["ngqer", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["has", "mvv.1"], ["a boat", "mvv.b"]]]],
57:["angyanguq","he acquired a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-nge-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases",[[["angya", "mvv.b"], ["ng", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["has acquired", "mvv.1"], ["a boat", "mvv.b"]]]],
58:["angyaliuq","he is making a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-li²-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases",[[["angy", "mvv.b"], ["i", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["making", "mvv.1"], ["a boat", "mvv.b"]]]],
59:["angyalirtuq","he has lots of boats",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-lir-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases",[[["angy", "mvv.b"], ["ir", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["has lots of", "mvv.1"], ["boats", "mvv.b"]]]],
60:["tuntussurtuq","he is hunting caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+ssur-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases",[[["tuntu", "mvv.b"], ["ssur", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["hunting", "mvv.1"], ["caribous (Rangifer tarandus)", "mvv.b"]]]],
61:["tuntuturtuq","he is eating caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+tur²-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases",[[["tuntu", "mvv.b"], ["tur", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["eating (food), wearing (clothing), using", "mvv.1"], ["caribou (Rangifer tarandus)", "mvv.b"]]]],




66:["kaigtuten-qaa?","are you hungry?",[["Insert", ["mv"], [[["kaig-", 0, 0, 0]], "i", "Ind", "qaa"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","yes-no question",[[["kaig", "mvv.b"], ["tu", "mvv.m"], ["ten", "mvv.s"], ["-qaa", "qaa"], [" ", "space"]], [["you", "mvv.s"], ["are", "mvv.m"], [" hungry", "mvv.b"], ["", "mvv.b"]]]],
67:["ayallruuq-qaa?","did he go?",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind", "qaa"]], ["Update", ["mv", "vs"], [3, 1, 1]]],"verb (+ noun) questions","question sentence","yes-no question",[[["aya", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], ["-qaa", "qaa"], [" ", "space"]], [["he", "mvv.s"], ["left ", "mvv.b"], ["", "mvv.b"]]]],

69:["kina taiga?","who is coming?",[["Insert", ["mv"], [[["tai-", 0, 0, 0]], "i", "Intrg", "Intrg0"]], ["Update", ["mv", "vs"], [3, 1, 1]]],"verb (+ noun) questions","question sentence","wh-question",[[["tai", "mvv.b"], ["ga", "mvv.m"], [" ", "space"]], [["who", "mvv.s"], ["is", "mvv.m"], ["he", "mvv.s"], ["who", "mvqWord"], ["is", "mvv.m"], ["coming here", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],
70:["kia nerellruagu akutaqa?","who ate my akutaq?",[["Insert", ["mv"], [[["nere-", 0, 2, 0], ["-llru¹-", 0, 0, 0]], "t", "Intrg", "Intrg0"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [1, 1, 0, 1]]]],"verb (+ noun) questions","question sentence","wh-question",[[["nere", "mvv.b"], ["llru", "mvv.1"], ["a", "mvv.m"], ["gu", "mvv.o"], [" ", "space"], ["akuta", "mvno00.b"], ["qa", "mvno00.ps"], [" ", "space"]], [["who", "mvv.s"], ["is", "mvv.m"], ["he", "mvv.s"], ["who", "mvqWord"], ["ate ", "mvv.b"], ["my", "mvno00.ps"], ["one", "mvno00.pd"], ["“Eskimo ice cream”", "mvno00.b"], ["", "mvv.b"], ["?", "questionMark"]]]],

72:["kitumek tangercit?","who (non-specific) do you see?",[["Insert", ["mv"], [[["tangerr-", 0, 1, 0]], "it", "Intrg", "Intrg1"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["tanger", "mvv.b"], ["ci", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["see", "mvv.b"], ["something", "mvv.abl"], ["", "mvv.b"], ["?", "questionMark"]]]],
73:["kina tangerciu?","who (specific) do you see?",[["Insert", ["mv"], [[["tangerr-", 0, 2, 0]], "t", "Intrg", "Intrg1"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 1]]],"verb (+ noun) questions","question sentence","wh-question",[[["tanger", "mvv.b"], ["ci", "mvv.m"], ["u", "mvv.o"], [" ", "space"]], [["you", "mvv.s"], ["see", "mvv.b"], ["him", "mvv.o"], ["", "mvv.b"], ["?", "questionMark"]]]],
74:["ca igta?","what fell?",[["Insert", ["mv"], [[["igte-", 0, 0, 0]], "i", "Intrg", "Intrg2"]], ["Update", ["mv", "vs"], [3, 1, 3]]],"verb (+ noun) questions","question sentence","wh-question",[[["igt", "mvv.b"], ["a", "mvv.m"], [" ", "space"]], [["what", "mvv.s"], ["is", "mvv.m"], ["it", "mvv.s"], ["that", "mvqWord"], ["fell", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],


77:["camek kiputellrusit?","what did you buy?",[["Insert", ["mv"], [[["kipute-", 0, 1, 0], ["-llru¹-", 0, 0, 0]], "it", "Intrg", "Intrg3"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["kipute", "mvv.b"], ["llru", "mvv.1"], ["si", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["bought ", "mvv.b"], ["something", "mvv.abl"], ["", "mvv.b"], ["?", "questionMark"]]]],
78:["camek tangercit?","what do you see?",[["Insert", ["mv"], [[["tangerr-", 0, 1, 0]], "it", "Intrg", "Intrg3"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["tanger", "mvv.b"], ["ci", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["see", "mvv.b"], ["something", "mvv.abl"], ["", "mvv.b"], ["?", "questionMark"]]]],
79:["nani iqvallrusit?","at where did you pick berries?",[["Insert", ["mv"], [[["iqvaq,iqvar-", 0, 1, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "Intrg6"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["iqva", "mvv.b"], ["llru", "mvv.1"], ["si", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["where", "mvqWord"], ["did", "past"], ["you", "mvv.s"], ["pick berries", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],
80:["naken taillrusit?","from where did you come?",[["Insert", ["mv"], [[["tai-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "Intrg7"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["tai", "mvv.b"], ["llru", "mvv.1"], ["si", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["from where", "mvqWord"], ["did", "past"], ["you", "mvv.s"], ["come here", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],
81:["natmun ayagcit?","toward where are you going?",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Intrg", "Intrg8"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["ayag", "mvv.b"], ["ci", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["to where", "mvqWord"], ["are", "mvv.m"], ["you", "mvv.s"], ["leaving", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],
82:["qangvaq tekitellrusit?","when (past) did you arrive?",[["Insert", ["mv"], [[["tekite-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "Intrg4"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["tekite", "mvv.b"], ["llru", "mvv.1"], ["si", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["when", "mvqWord"], ["did", "past"], ["you", "mvv.s"], ["arrive ", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],
83:["qaku ayagciqsit?","when (future) will you go?",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Intrg", "Intrg5"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["ayag", "mvv.b"], ["ciq", "mvv.1"], ["si", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["when will", "mvqWord"], ["you", "mvv.s"], ["(in the future)", "mvv.1"], ["leave ", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],
84:["ciin qavarnisit?","why are you sleepy?",[["Insert", ["mv"], [[["qavarni-", 0, 0, 0]], "i", "Intrg", "Intrg9"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["qavarni", "mvv.b"], ["si", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["why", "mvqWord"], ["are", "mvv.m"], ["you", "mvv.s"], ["being sleepy", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],
85:["qaillun akngirtellrusit?","how did you get hurt?",[["Insert", ["mv"], [[["akngirte-,aknirte-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "IntrgA"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question",[[["akngirte", "mvv.b"], ["llru", "mvv.1"], ["si", "mvv.m"], ["t", "mvv.s"], [" ", "space"]], [["how", "mvqWord"], ["did", "past"], ["you", "mvv.s"], ["get hurt", "mvv.b"], ["", "mvv.b"], ["?", "questionMark"]]]],


88:["neri","eat!",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative",[[["ner", "mvv.b"], ["i", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["eat", "mvv.b"], ["", "mvv.b"], ["(right now)", "mvv.com"]]]],
89:["taikina","come (in the future)!",[["Insert", ["mv"], [[["tai-", 0, 0, 0]], "i", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative",[[["tai", "mvv.b"], ["ki", "mvv.m"], ["na", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["come here", "mvv.b"], ["", "mvv.b"], ["(in the future)", "mvv.com"]]]],
90:["usviipiiqnak","stop being crazy!",[["Insert", ["mv"], [[["usviite-", 0, 0, 0]], "i", "Opt][PRS][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative",[[["usvii", "mvv.b"], ["piiqna", "mvv.m"], ["k", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["be crazy", "mvv.b"], ["", "mvv.b"], ["(right now)", "mvv.com"]]]],
91:["kuingiryaqunak","don't smoke!",[["Insert", ["mv"], [[["kuingiq,kuiniq,kuingir-,kuinir-", 0, 1, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative",[[["kuingir", "mvv.b"], ["yaquna", "mvv.m"], ["k", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["smoke", "mvv.b"], ["", "mvv.b"], ["(in the future)", "mvv.com"]]]],



95:["teguqerru","please take it",[["Insert", ["mv"], [[["tegu-", 0, 0, 0], ["-qar-", 0, 0, 0]], "t", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","optative",[[["tegu", "mvv.b"], ["qe", "mvv.1"], ["rru", "mvv.o"], [" ", "space"]], [["you", "mvv.s"], ["take", "mvv.b"], ["it", "mvv.o"], ["", "mvv.b"], ["please", "mvv.1"], ["(right now)", "mvv.com"]]]],

97:["aqumluten","please sit down",[["Insert", ["mv"], [[["aqume-", 0, 0, 0]], "i", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subordinative",[[["aqum", "mvv.b"], ["lu", "mvv.m"], ["ten", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", ", "mvv.m"], ["sit down", "mvv.b"], ["", "mvv.b"], ["(polite request)", "mvv.com"]]]],
98:["alingevkenak","don't be scared",[["Insert", ["mv"], [[["alinge-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subordinative",[[["alinge", "mvv.b"], ["vke", "mvv.1"], ["na", "mvv.m"], ["k", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", ", "mvv.m"], ["do not", "mvv.1"], ["be afraid", "mvv.b"], ["", "mvv.b"], ["(polite request)", "mvv.com"]]]],

100:["neri","eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only",[[["ner", "mvv.b"], ["i", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["eat", "mvv.b"], ["", "mvv.b"], ["(right now)", "mvv.com"]]]],
101:["nerkina","eat (in the future)",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only",[[["ner", "mvv.b"], ["ki", "mvv.m"], ["na", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["eat", "mvv.b"], ["", "mvv.b"], ["(in the future)", "mvv.com"]]]],
102:["nerviiqnak","stop eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][PRS][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only",[[["ner", "mvv.b"], ["viiqna", "mvv.m"], ["k", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["eat", "mvv.b"], ["", "mvv.b"], ["(right now)", "mvv.com"]]]],
103:["neryaqunak","don't eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only",[[["ner", "mvv.b"], ["yaquna", "mvv.m"], ["k", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["eat", "mvv.b"], ["", "mvv.b"], ["(in the future)", "mvv.com"]]]],
104:["nerqaa","please eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-qar-", 0, 0, 0]], "i", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only",[[["ner", "mvv.b"], ["qa", "mvv.1"], ["a", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], ["eat", "mvv.b"], ["", "mvv.b"], ["please", "mvv.1"], ["(right now)", "mvv.com"]]]],
105:["nerluten","please eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only",[[["ner", "mvv.b"], ["lu", "mvv.m"], ["ten", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", ", "mvv.m"], ["eat", "mvv.b"], ["", "mvv.b"], ["(polite request)", "mvv.com"]]]],
106:["nerevkenak","please don't eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "neg"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only",[[["nere", "mvv.b"], ["vke", "mvv.1"], ["na", "mvv.m"], ["k", "mvv.s"], [" ", "space"]], [["you", "mvv.s"], [", ", "mvv.m"], ["do not", "mvv.1"], ["eat ", "mvv.b"], ["", "mvv.b"], ["(polite request)", "mvv.com"]]]],

108:["taisgu","bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked",[[["tais", "mvv.b"], ["gu", "mvv.o"], [" ", "space"]], [["you", "mvv.s"], ["bring", "mvv.b"], ["it", "mvv.o"], ["over", "mvv.b"], ["(right now)", "mvv.com"]]]],
109:["taiskiu","bring it here (in the future)",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked",[[["tais", "mvv.b"], ["ki", "mvv.m"], ["u", "mvv.o"], [" ", "space"]], [["you", "mvv.s"], ["bring", "mvv.b"], ["it", "mvv.o"], ["over", "mvv.b"], ["(in the future)", "mvv.com"]]]],
110:["taipiiqnaku","stop bringing it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][PRS][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked",[[["tai", "mvv.b"], ["piiqna", "mvv.m"], ["ku", "mvv.o"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["bring", "mvv.b"], ["it", "mvv.o"], ["over", "mvv.b"], ["(right now)", "mvv.com"]]]],
111:["taicaqunaku","don't bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked",[[["taic", "mvv.b"], ["aquna", "mvv.m"], ["ku", "mvv.o"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["bring", "mvv.b"], ["it", "mvv.o"], ["over", "mvv.b"], ["(in the future)", "mvv.com"]]]],
112:["taiteqerru","please bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0], ["-qar-", 0, 0, 0]], "t", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked",[[["taite", "mvv.b"], ["qe", "mvv.1"], ["rru", "mvv.o"], [" ", "space"]], [["you", "mvv.s"], ["bring", "mvv.b"], ["it", "mvv.o"], ["over", "mvv.b"], ["please", "mvv.1"], ["(right now)", "mvv.com"]]]],
113:["tailluku","please bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked",[[["tai", "mvv.b"], ["llu", "mvv.m"], ["ku", "mvv.e"], [" ", "space"]], [["you", "mvv.s"], [", ", "mvv.m"], ["bring", "mvv.b"], ["it", "mvv.o"], ["over", "mvv.b"], ["(polite request)", "mvv.com"]]]],
114:["taitevkenaku","please don't bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "t", "Sbrd", "neg"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked",[[["taite", "mvv.b"], ["vke", "mvv.1"], ["na", "mvv.m"], ["ku", "mvv.e"], [" ", "space"]], [["you", "mvv.s"], [", ", "mvv.m"], ["do not", "mvv.1"], ["bring ", "mvv.b"], ["it", "mvv.o"], ["over", "mvv.b"], ["(polite request)", "mvv.com"]]]],


117:["ayagpailgan payugeskiu","before he leaves, take some food to her",[["Insert", ["mv"], [[["payugte-", 0, 0, 0]], "t", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 2]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [3, 1, 2]]],"verb + verb phrase sentence","connective verb","before...",[[["payuges", "mvv.b"], ["ki", "mvv.m"], ["u", "mvv.o"], [" ", "space"], ["ayag", "cvv.b"], ["pailg", "cvv.m"], ["an", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["take some food to", "mvv.b"], ["her", "mvv.o"], ["", "mvv.b"], ["(in the future)", "mvv.com"], ["before", "cvv.m"], ["she", "mvv.s"], ["leaves", "cvv.b"], ["", "cvv.b"]]]],
118:["ayagpailegpet kaassaq yuvrirniaran","before you go, check the gas",[["Insert", ["mv"], [[["yuvrir-", 0, 2, 0], ["@~+niar-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["kaassaq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","before...",[[["yuvrir", "mvv.b"], ["niar", "mvv.1"], ["a", "mvv.m"], ["n", "mvv.s"], [" ", "space"], ["kaassaq", "mvno00.b"], [" ", "space"], ["ayag", "cvv.b"], ["paileg", "cvv.m"], ["pet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["(in the future, suggestion)", "mvv.1"], ["examine ", "mvv.b"], ["the", "mvno00.ps"], ["one", "mvno00.pd"], ["gas", "mvno00.b"], ["", "mvv.b"], ["before", "cvv.m"], ["you", "mvv.s"], ["leave", "cvv.b"], ["", "cvv.b"]]]],
119:["anvailegpet aturarkaten yuvrirniaraten","before you go out, check the clothing you will use",[["Insert", ["mv"], [[["yuvrir-", 0, 2, 0], ["@~+niar-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 3, 1]], ["Insert", ["mv", "no"], [[["aturaq", 0, 0, 0], ["+kaq", 0, 0, 0]], [0, 0, 0, 3]]], ["Insert", ["cv"], [[["ane-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","before...",[[["yuvrir", "mvv.b"], ["niar", "mvv.1"], ["a", "mvv.m"], ["ten", "mvv.s"], [" ", "space"], ["aturar", "mvno00.b"], ["ka", "mvno00.1"], ["t", "mvno00.pd"], [" ", "space"], ["an", "cvv.b"], ["vaileg", "cvv.m"], ["pet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["(in the future, suggestion)", "mvv.1"], ["examine ", "mvv.b"], ["the", "mvno00.ps"], ["three or more", "mvno00.pd"], ["future", "mvno00.1"], ["articles of clothing", "mvno00.b"], ["", "mvv.b"], ["before", "cvv.m"], ["you", "mvv.s"], ["go out", "cvv.b"], ["", "cvv.b"]]]],
120:["kuimarpailegpet neryaqunak","do not eat before swimming",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["kuimar-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","before...",[[["ner", "mvv.b"], ["yaquna", "mvv.m"], ["k", "mvv.s"], [" ", "space"], ["kuimar", "cvv.b"], ["paileg", "cvv.m"], ["pet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["eat", "mvv.b"], ["", "mvv.b"], ["(in the future)", "mvv.com"], ["before", "cvv.m"], ["you", "mvv.s"], ["swim", "cvv.b"], ["", "cvv.b"]]]],



124:["kaigtuten nereksailavet nerevkarilriani","you're hungry because you didn't eat at the feast",[["Insert", ["mv"], [[["kaig-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["nere-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Insert", ["cv", "nObliques"], [[["nerevkari-", 0, 0, 0], ["-lria", 0, 0, 0]], [0, 0, 0, 3], "Loc"]]],"verb + verb phrase sentence","connective verb","because...",[[["kaig", "mvv.b"], ["tu", "mvv.m"], ["ten", "mvv.s"], [" ", "space"], ["nere", "cvv.b"], ["ksail", "cvv.1"], ["nga", "cvv.m"], ["vet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["are", "mvv.m"], [" hungry", "mvv.b"], ["", "mvv.b"], ["because", "cvv.m"], ["you", "mvv.s"], ["have", "past"], ["not", "cvv.1"], ["eaten ", "cvv.b"], ["", "cvv.b"]]]],
125:["utercugtua naulluungama","I want to go home because I am sick",[["Insert", ["mv"], [[["uterte-", 0, 0, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["naulluu-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","because...",[[["uterc", "mvv.b"], ["ug", "mvv.1"], ["tu", "mvv.m"], ["a", "mvv.s"], [" ", "space"], ["naulluu", "cvv.b"], ["nga", "cvv.m"], ["ma", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["want to", "mvv.1"], ["return ", "mvv.b"], ["", "mvv.b"], ["because", "cvv.m"], ["I", "mvv.s"], ["am", "mvv.m"], [" sick", "cvv.b"], ["", "cvv.b"]]]],

127:["cen̄irtaalaavet qusertuten","because you visit around, you have a cold",[["Insert", ["mv"], [[["quseq,quser-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["cen̄irtaar-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","because...",[[["quser", "mvv.b"], ["tu", "mvv.m"], ["ten", "mvv.s"], [" ", "space"], ["cen̄irtaa", "cvv.b"], ["la", "cvv.1"], ["a", "cvv.m"], ["vet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["have a cold", "mvv.b"], ["", "mvv.b"], ["because", "cvv.m"], ["you", "mvv.s"], ["regularly", "cvv.1"], ["visited around", "cvv.b"], ["", "cvv.b"]]]],
128:["kuuvviarpakaama qiivua","i'm shaky because i drank lots of coffee",[["Insert", ["mv"], [[["qiive-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["kuuvviaq,kuuvviar-", 0, 1, 0], ["@+pakar-|~vakar-,-qpakar-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","because...",[[["qiiv", "mvv.b"], ["u", "mvv.m"], ["a", "mvv.s"], [" ", "space"], ["kuuvviar", "cvv.b"], ["paka", "cvv.1"], ["a", "cvv.m"], ["ma", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["am", "mvv.m"], ["trembling", "mvv.b"], ["", "mvv.b"], ["because", "cvv.m"], ["I", "mvv.s"], ["drank coffee", "cvv.b"], ["", "cvv.b"], ["so much", "cvv.1"]]]],

130:["nunataqavet nemni uitayugngauten","whenever you come to the village, you can stay at my house",[["Insert", ["mv"], [[["uita-", 0, 0, 0], ["@~+yugnga-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["mv", "nObliques"], [[["[e]naᵉ,enaᵉ", 0, 0, 0]], [1, 1, 0, 1], "Loc"]], ["Insert", ["cv"], [[["nunate-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever...",[[["uita", "mvv.b"], ["yugnga", "mvv.1"], ["u", "mvv.m"], ["ten", "mvv.s"], [" ", "space"], ["nunat", "cvv.b"], ["aqa", "cvv.m"], ["vet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["are", "mvv.m"], ["able to", "mvv.1"], ["situate ", "mvv.b"], ["", "mvv.b"], ["whenever", "cvv.m"], ["you", "mvv.s"], ["visit in another village", "cvv.b"], ["", "cvv.b"]]]],
131:["ner'aqami cukangnaq'lartuq","whenever he eats, he tries to be quick",[["Insert", ["mv"], [[["cuka-", 0, 0, 0], ["-ngnaqe-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["nere-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever...",[[["cuka", "mvv.b"], ["ngnaq'", "mvv.1"], ["lar", "mvv.2"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["ner", "cvv.b"], ["'aqa", "cvv.m"], ["mi", "cvv.s"], [" ", "space"]], [["he", "mvv.s"], ["is", "mvv.m"], ["regularly", "mvv.2"], ["trying to", "mvv.1"], ["be fast", "mvv.b"], ["", "mvv.b"], ["whenever", "cvv.m"], ["subject", "mvv.s"], ["eats", "cvv.b"], ["", "cvv.b"]]]],
132:["maantaqavet nunaniryulartua","whenever you are here, i am joyful",[["Insert", ["mv"], [[["nunaniryug-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["maante-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever...",[[["nunaniryu", "mvv.b"], ["lar", "mvv.1"], ["tu", "mvv.m"], ["a", "mvv.s"], [" ", "space"], ["maant", "cvv.b"], ["aqa", "cvv.m"], ["vet", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["am", "mvv.m"], ["regularly", "mvv.1"], [" happy", "mvv.b"], ["", "mvv.b"], ["whenever", "cvv.m"], ["you", "mvv.s"], ["are", "mvv.m"], [" here", "cvv.b"], ["", "cvv.b"]]]],
133:["agiirtaqavet qiilertelartua","whenevery you come from the distance, i get excited",[["Insert", ["mv"], [[["qiilerte-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["agiirte-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever...",[[["qiilerte", "mvv.b"], ["lar", "mvv.1"], ["tu", "mvv.m"], ["a", "mvv.s"], [" ", "space"], ["agiirt", "cvv.b"], ["aqa", "cvv.m"], ["vet", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["am", "mvv.m"], ["regularly", "mvv.1"], [" gleeful", "mvv.b"], ["", "mvv.b"], ["whenever", "cvv.m"], ["you", "mvv.s"], ["approach", "cvv.b"], ["", "cvv.b"]]]],


136:["angulluarungermi uqilalartuq","even though he is an old man, he runs fast",[["Insert", ["mv"], [[["uqila-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["angulluaq", 0, 0, 0], [":~(ng)u-", 0, 0, 0]], "i", "Conc", "eventhough"]], ["Update", ["cv", "vs"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","even though...",[[["uqila", "mvv.b"], ["lar", "mvv.1"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["angulluar", "cvv.b"], ["u", "cvv.1"], ["nger", "cvv.m"], ["mi", "cvv.s"], [" ", "space"]], [["he", "mvv.s"], ["regularly", "mvv.1"], ["runs fast", "mvv.b"], ["", "mvv.b"], ["even though", "cvv.m"], ["subject", "mvv.s"], ["is", "mvv.m"], ["", "cvv.1"], ["a old man", "cvv.b"]]]],
137:["yaaqsingraan paqcugaqa","even if it is far away, i want to check it",[["Insert", ["mv"], [[["paqte-", 0, 2, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["cv"], [[["yaaqsig-", 0, 0, 0]], "i", "Conc", "evenif"]], ["Update", ["cv", "vs"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","even though...",[[["paqc", "mvv.b"], ["ug", "mvv.1"], ["a", "mvv.m"], ["qa", "mvv.s"], [" ", "space"], ["yaaqsi", "cvv.b"], ["ngra", "cvv.m"], ["an", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["want to", "mvv.1"], ["check ", "mvv.b"], ["it", "mvv.o"], ["", "mvv.b"], ["even if", "cvv.m"], ["it", "mvv.s"], ["is", "mvv.m"], [" distant", "cvv.b"], ["", "cvv.b"]]]],

139:["qiangermi iluteqenrituq","even though he is crying, he is not emotionally pained",[["Insert", ["mv"], [[["iluteqe-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["qia-", 0, 0, 0]], "i", "Conc", "eventhough"]], ["Update", ["cv", "vs"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","even though...",[[["iluteqe", "mvv.b"], ["nrit", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["qia", "cvv.b"], ["nger", "cvv.m"], ["mi", "cvv.s"], [" ", "space"]], [["he", "mvv.s"], ["does", "mvv.m"], ["not", "mvv.1"], ["grieve ", "mvv.b"], ["", "mvv.b"], ["even though", "cvv.m"], ["subject", "mvv.s"], ["cried", "cvv.b"], ["", "cvv.b"]]]],
140:["ellallingraan angyaryugtua","even if it is raining, i want to go by boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 1, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["ellallir-", 0, 0, 0]], "i", "Conc", "evenif"]], ["Update", ["cv", "vs"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","even though...",[[["angyar", "mvv.b"], ["yug", "mvv.1"], ["tu", "mvv.m"], ["a", "mvv.s"], [" ", "space"], ["ellalli", "cvv.b"], ["ngra", "cvv.m"], ["an", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["want to", "mvv.1"], ["go by boat", "mvv.b"], ["", "mvv.b"], ["even if", "cvv.m"], ["it", "mvv.s"], ["is", "mvv.m"], ["raining", "cvv.b"], ["", "cvv.b"]]]],

142:["tekiskuvet Mamterillermun kipusviggniartuten","when you arrive in Bethel, you'll go to the store",[["Insert", ["mv"], [[["kipusvik,kipuyvik", 0, 0, 0], ["+te¹-", 0, 0, 0], ["@~+niar-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["tekite-", 0, 0, 0]], "i", "Cond", "wheninthefuture"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Insert", ["cv", "nObliques"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]],"verb + verb phrase sentence","connective verb","if, when in the future...",[[["kipusvigg", "mvv.b"], ["niar", "mvv.2"], ["tu", "mvv.m"], ["ten", "mvv.s"], [" ", "space"], ["tekis", "cvv.b"], ["ku", "cvv.m"], ["vet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["(in the future, suggestion)", "mvv.2"], ["catch, go to", "mvv.1"], ["a store", "mvv.b"], ["when (in the future)", "cvv.m"], ["you", "mvv.s"], ["arrive", "cvv.b"], ["", "cvv.b"]]]],

144:["assikekuvgu qanruskia","if you like it, tell me",[["Insert", ["mv"], [[["qanrute-", 0, 2, 0]], "t", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [1, 1, 0]], ["Insert", ["cv"], [[["assike-", 0, 0, 0]], "t", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","if, when in the future...",[[["qanrus", "mvv.b"], ["ki", "mvv.m"], ["a", "mvv.o"], [" ", "space"], ["assike", "cvv.b"], ["ku", "cvv.m"], ["v", "cvv.s"], ["gu", "cvv.o"], [" ", "space"]], [["you", "mvv.s"], ["tell", "mvv.b"], ["me", "mvv.o"], ["", "mvv.b"], ["(in the future)", "mvv.com"], ["if", "cvv.m"], ["you", "mvv.s"], ["like", "cvv.b"], ["it", "mvv.o"], ["", "cvv.b"]]]],
145:["naspaayukuvgu ikircugngaan","if you want to try it, you can open it",[["Insert", ["mv"], [[["ikirte-", 0, 2, 0], ["@~+yugnga-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["cv"], [[["naspaa-", 0, 2, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "t", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","if, when in the future...",[[["ikirc", "mvv.b"], ["ugnga", "mvv.1"], ["a", "mvv.m"], ["n", "mvv.s"], [" ", "space"], ["naspaa", "cvv.b"], ["yu", "cvv.1"], ["ku", "cvv.m"], ["v", "cvv.s"], ["gu", "cvv.o"], [" ", "space"]], [["you", "mvv.s"], ["are", "mvv.m"], ["able to", "mvv.1"], ["open ", "mvv.b"], ["it", "mvv.o"], ["", "mvv.b"], ["if", "cvv.m"], ["you", "mvv.s"], ["want to", "cvv.1"], ["try ", "cvv.b"], ["it", "mvv.o"], ["", "cvv.b"]]]],
146:["kaigciquten nerenrilkuvet","you will be hungry if you don't eat",[["Insert", ["mv"], [[["kaig-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["nere-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","if, when in the future...",[[["kaig", "mvv.b"], ["ciq", "mvv.1"], ["u", "mvv.m"], ["ten", "mvv.s"], [" ", "space"], ["nere", "cvv.b"], ["nril", "cvv.1"], ["ku", "cvv.m"], ["vet", "cvv.s"], [" ", "space"]], [["you", "mvv.s"], ["will", "future"], ["be hungry", "mvv.b"], ["", "mvv.b"], ["if", "cvv.m"], ["you", "mvv.s"], ["do", "mvv.m"], ["not", "cvv.1"], ["eat ", "cvv.b"], ["", "cvv.b"]]]],
147:["nerciqut cen̄ireskuneng","they will eat when they visit",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Insert", ["cv"], [[["cen̄irte-,cenirte-", 0, 0, 0]], "i", "Cond", "wheninthefuture"]], ["Update", ["cv", "vs"], [4, 3, 0]]],"verb + verb phrase sentence","connective verb","if, when in the future...",[[["ner", "mvv.b"], ["ciq", "mvv.1"], ["u", "mvv.m"], ["t", "mvv.s"], [" ", "space"], ["cen̄ires", "cvv.b"], ["ku", "cvv.m"], ["neng", "cvv.s"], [" ", "space"]], [["they all (3+)", "mvv.s"], ["will", "future"], ["eat ", "mvv.b"], ["", "mvv.b"], ["when (in the future)", "cvv.m"], ["their own (3+)", "mvv.s"], ["go visiting", "cvv.b"], ["", "cvv.b"]]]],
148:["atuquvgu navegyaqunaku","if you use it, don't break it",[["Insert", ["mv"], [[["naveg-", 0, 2, 0]], "t", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["cv"], [[["atuq,atur-", 0, 3, 0]], "t", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","if, when in the future...",[[["naveg", "mvv.b"], ["yaquna", "mvv.m"], ["ku", "mvv.o"], [" ", "space"], ["atu", "cvv.b"], ["qu", "cvv.m"], ["v", "cvv.s"], ["gu", "cvv.o"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["break", "mvv.b"], ["it", "mvv.o"], ["", "mvv.b"], ["(in the future)", "mvv.com"], ["if", "cvv.m"], ["you", "mvv.s"], ["use", "cvv.b"], ["it", "mvv.o"], ["", "cvv.b"]]]],

150:["qavarningllerpeni anellruunga","when you were getting sleepy, i went out",[["Insert", ["mv"], [[["ane-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["qavarni-", 0, 0, 0], ["-nge-", 0, 1, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","when in the past...",[[["ane", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["nga", "mvv.s"], [" ", "space"], ["qavarni", "cvv.b"], ["ng", "cvv.1"], ["ller", "cvv.m"], ["peni", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["went out", "mvv.b"], ["", "mvv.b"], ["when", "cvv.m"], ["you", "mvv.s"], ["were", "past"], ["beginning to", "cvv.1"], ["be sleepy", "cvv.b"], ["", "cvv.b"]]]],

152:["maqillemni uutellruunga","when i took a maqi, i burned (flesh)",[["Insert", ["mv"], [[["uute-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["maqi-", 0, 0, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","when in the past...",[[["uute", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["nga", "mvv.s"], [" ", "space"], ["maqi", "cvv.b"], ["lle", "cvv.m"], ["mni", "cvv.s"], [" ", "space"]], [["I", "mvv.s"], ["burnt myself", "mvv.b"], ["", "mvv.b"], ["when", "cvv.m"], ["I", "mvv.s"], ["took a sweatbath", "cvv.b"], ["", "cvv.b"]]]],
153:["quyallruuq cen̄irtellratni","she was happy when they visited her",[["Insert", ["mv"], [[["quya-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 2]], ["Insert", ["cv"], [[["cen̄irte-,cenirte-", 0, 2, 0]], "t", "CtmpI"]], ["Update", ["cv", "vs"], [3, 3, 0]], ["Update", ["cv", "vo"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","when in the past...",[[["quya", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["cen̄irte", "cvv.b"], ["llr", "cvv.m"], ["at", "cvv.s"], ["ni", "cvv.o"], [" ", "space"]], [["she", "mvv.s"], ["was", "past"], ["thankful, glad", "mvv.b"], ["", "mvv.b"], ["when", "cvv.m"], ["they all (3+)", "mvv.s"], ["went to visit", "cvv.b"], ["subject", "mvv.o"], ["", "cvv.b"]]]],

155:["ayainanemni massiinaqa navellruuq","while i was going, my motor broke",[["Insert", ["mv"], [[["naveg-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["mv", "ns"], [[["massiinaq", 0, 0, 0]], [1, 1, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "CtmpII"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","while...",[[["massiina", "mvns00.b"], ["qa", "mvns00.ps"], [" ", "space"], ["nave", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["ayag", "cvv.b"], ["inane", "cvv.m"], ["mni", "cvv.s"], [" ", "space"]], [["my", "mvns00.ps"], ["one", "mvns00.pd"], ["machine", "mvns00.b"], ["broke ", "mvv.b"], ["", "mvv.b"], ["while", "cvv.m"], ["I", "mvv.s"], ["was", "past"], ["leaving", "cvv.b"], ["", "cvv.b"]]]],
156:["qianginanrani camek niitellruuq","while he were crying, he heard something",[["Insert", ["mv"], [[["niite-", 0, 1, 0], ["-llru¹-", 0, 0, 0]], "it", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["mv", "no"], [[["ca,ca-", 0, 0, 1]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["qia-", 0, 0, 0]], "i", "CtmpII"]], ["Update", ["cv", "vs"], [3, 1, 1]]],"verb + verb phrase sentence","connective verb","while...",[[["niite", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["ca", "mvno00.b"], ["mek", "mvno00.c"], [" ", "space"], ["qia", "cvv.b"], ["nginanr", "cvv.m"], ["ani", "cvv.s"], [" ", "space"]], [["he", "mvv.s"], ["heard ", "mvv.b"], ["(some)", "mvns00.c"], ["the", "mvno00.ps"], ["one", "mvno00.pd"], ["something", "mvno00.b"], ["", "mvv.b"], ["while", "cvv.m"], ["he", "mvv.s"], ["was", "past"], ["crying", "cvv.b"], ["", "cvv.b"]]]],



160:["cukaluni kiturtuq","it passed by quickly",[["Insert", ["mv"], [[["kitur-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["cuka-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["kitur", "mvv.b"], ["tu", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["cuka", "svv.b"], ["lu", "svv.m"], ["ni", "svv.s"], [" ", "space"]], [["he", "mvv.s"], ["passed by", "mvv.b"], ["", "mvv.b"], ["being fast", "svv.b"], ["", "svv.b"]]]],
161:["taiciquq piyualuni","he will come (by) walking",[["Insert", ["mv"], [[["tai-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["piyua-", 0, 0, 0]], "i", "Sbrd", "by"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["tai", "mvv.b"], ["ciq", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["piyua", "svv.b"], ["lu", "svv.m"], ["ni", "svv.s"], [" ", "space"]], [["he", "mvv.s"], ["will", "future"], ["come here", "mvv.b"], ["", "mvv.b"], ["by", "svv.subtype"], ["walking", "svv.b"], ["", "svv.b"]]]],
162:["ayallruuq cavluni","he went (by) rowing",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["cave-", 0, 0, 0]], "i", "Sbrd", "by"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["aya", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["cav", "svv.b"], ["lu", "svv.m"], ["ni", "svv.s"], [" ", "space"]], [["he", "mvv.s"], ["left ", "mvv.b"], ["", "mvv.b"], ["by", "svv.subtype"], ["rowing", "svv.b"], ["", "svv.b"]]]],
163:["itellruunga tangerrsugluku","i came in wanting to see her",[["Insert", ["mv"], [[["iter-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["sv"], [[["tangerr-", 0, 2, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "t", "Sbrd", "being"]], ["Update", ["sv", "vo"], [3, 1, 2]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["ite", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["nga", "mvv.s"], [" ", "space"], ["tangerr", "svv.b"], ["sug", "svv.1"], ["lu", "svv.m"], ["ku", "svv.e"], [" ", "space"]], [["I", "mvv.s"], ["came in", "mvv.b"], ["", "mvv.b"], ["wanting to", "svv.1"], ["see ", "svv.b"], ["", "svv.b"], ["her", "mvv.o"]]]],

165:["yurartuten assirluten","you are dancing well (literally: 'being good (at it)')",[["Insert", ["mv"], [[["yuraq,yurar¹-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["assir-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["yurar", "mvv.b"], ["tu", "mvv.m"], ["ten", "mvv.s"], [" ", "space"], ["assir", "svv.b"], ["lu", "svv.m"], ["ten", "svv.s"], [" ", "space"]], [["you", "mvv.s"], ["are", "mvv.m"], ["dancing", "mvv.b"], ["", "mvv.b"], ["being well", "svv.b"], ["", "svv.b"]]]],
166:["aqvaqurtut cukaluteng","they are running fast (being fast)",[["Insert", ["mv"], [[["aqvaqur-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Insert", ["sv"], [[["cuka-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["aqvaqur", "mvv.b"], ["tu", "mvv.m"], ["t", "mvv.s"], [" ", "space"], ["cuka", "svv.b"], ["lu", "svv.m"], ["teng", "svv.s"], [" ", "space"]], [["they all (3+)", "mvv.s"], ["are", "mvv.m"], ["running", "mvv.b"], ["", "mvv.b"], ["being fast", "svv.b"], ["", "svv.b"]]]],
167:["qenerrluni nunullrui","he scolded them angrily (being angry)",[["Insert", ["mv"], [[["nunur¹-", 0, 2, 0], ["-llru¹-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Update", ["mv", "vo"], [3, 3, 0]], ["Insert", ["sv"], [[["qenerte-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["nunu", "mvv.b"], ["llru", "mvv.1"], ["i", "mvv.o"], [" ", "space"], ["qenerr", "svv.b"], ["lu", "svv.m"], ["ni", "svv.s"], [" ", "space"]], [["he", "mvv.s"], ["scolded ", "mvv.b"], ["them all (3+)", "mvv.o"], ["", "mvv.b"], ["being angry", "svv.b"], ["", "svv.b"]]]],
168:["aqumgallruuq utaqaluni","he sat down waiting",[["Insert", ["mv"], [[["aqumga-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["utaqa-", 0, 0, 0]], "i", "Sbrd", "being"]]],"","","",[[["aqumga", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["utaqa", "svv.b"], ["lu", "svv.m"], ["ni", "svv.s"], [" ", "space"]], [["he", "mvv.s"], ["was", "past"], ["seated", "mvv.b"], ["", "mvv.b"], ["waiting", "svv.b"], ["", "svv.b"]]]],


171:["anellruuq nereksaunani","he went out without eating",[["Insert", ["mv"], [[["ane-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["nere-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Sbrd", "without"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["ane", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["nere", "svv.b"], ["ksai", "svv.1"], ["na", "svv.m"], ["ni", "svv.s"], [" ", "space"]], [["he", "mvv.s"], ["went out", "mvv.b"], ["", "mvv.b"], ["without", "svv.subtype"], ["having not", "svv.1"], ["eaten ", "svv.b"], ["", "svv.b"]]]],
172:["akluirpek'nak inarcaqunak","don't lay down without taking off your clothes",[["Insert", ["mv"], [[["inarte-", 0, 0, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["aklu,akluq,aklu-", 1, 0, 0], [":(ng)ir²-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "without"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["inarc", "mvv.b"], ["aquna", "mvv.m"], ["k", "mvv.s"], [" ", "space"], ["aklu", "svv.b"], ["ir", "svv.1"], ["pek'", "svv.2"], ["na", "svv.m"], ["k", "svv.s"], [" ", "space"]], [["you", "mvv.s"], [", do not", "mvv.m"], ["lay down", "mvv.b"], ["", "mvv.b"], ["(in the future)", "mvv.com"], ["without", "svv.subtype"], ["being deprived of", "svv.1"], ["clothing", "svv.b"]]]],
173:["qiallruuq taqevkenani","he cried without stopping",[["Insert", ["mv"], [[["qia-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["taqe-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "without"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["qia", "mvv.b"], ["llru", "mvv.1"], ["u", "mvv.m"], ["q", "mvv.s"], [" ", "space"], ["taqe", "svv.b"], ["vke", "svv.1"], ["na", "svv.m"], ["ni", "svv.s"], [" ", "space"]], [["he", "mvv.s"], ["cried ", "mvv.b"], ["", "mvv.b"], ["without", "svv.subtype"], ["finishing ", "svv.b"], ["", "svv.b"]]]],
174:["alingevkenak inareskina","lay down (in the future), not being scared",[["Insert", ["mv"], [[["inarte-", 0, 0, 0]], "i", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["alinge-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "notbeing"]]],"verb + verb phrase sentence","subordinative verb","adjectival",[[["inares", "mvv.b"], ["ki", "mvv.m"], ["na", "mvv.s"], [" ", "space"], ["alinge", "svv.b"], ["vke", "svv.1"], ["na", "svv.m"], ["k", "svv.s"], [" ", "space"]], [["you", "mvv.s"], ["lay down", "mvv.b"], ["", "mvv.b"], ["(in the future)", "mvv.com"], ["not", "svv.subtype"], ["being afraid", "svv.b"], ["", "svv.b"]]]],





}








































































































































































































































































































































































































































































































































































































































































































































































































































































































































export const sentenceTemplates = {
1:["qimugta","the dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","simple","simple"],

3:["qimugteka","my dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [1, 1, 0, 1], "Abs"]]],"noun phrase only","simple","possession"],
4:["qimugtem pamyua","the dog's tail",[["Insert", ["np"], [[["pamyuq,pamsuq", 0, 0, 0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", -1], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1]]]],"noun phrase only","simple","possession"],

6:["imarpigmi","in the ocean",[["Insert", ["np"], [[["imarpik,imarpak", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]],"noun phrase only","simple","oblique nouns"],
7:["kipusvigmun","to the store",[["Insert", ["np"], [[["kipusvik,kipuyvik", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]],"noun phrase only","simple","oblique nouns"],
8:["Mamterillermek","from Bethel",[["Insert", ["np"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod", "from"]]],"noun phrase only","simple","oblique nouns"],
9:["tengssuutekun","using, via an airplane",[["Insert", ["np"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]],"noun phrase only","simple","oblique nouns"],
10:["qimugtetun","like a dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]],"noun phrase only","simple","oblique nouns"],

12:["arnaq elitnaurista","the woman teacher",[["Insert", ["np"], [[["elitnaurista", 0, 0, 0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", 0, -1], [[["arnaq", 0, 0, 0]], [0, 0, 0, 1]]]],"noun phrase only","simple","descriptors"],

14:["piipirpak","the big baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-rpak,-rpag-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases"],
15:["piipicuar","the small baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-cuar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases"],
16:["piipiyagaq","the little/baby baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-ya(g)aq*,-yagaq*,-ya(g)ar-,-yagar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases"],
17:["piipiqegtaar","the good baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-kegtaar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases"],
18:["piipiruaq","the fake baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["+(ng)uaq,@~+(ng)uar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","noun-noun postbases"],

20:["pissulria","the one who is hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["-lria", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases"],
21:["pissurvik","the place to hunt",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~+vik,+(r)vik", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases"],
22:["pissurcuun","the device for hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["+cuun|+ssuun", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases"],
23:["pissuryaraq","the way of hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~+yaraq", 0, 1, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases"],
24:["pissutuli","the one that often hunts",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["+tuli,-tuli", 0, 1, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases"],
25:["pissuyuli","the one that is good at hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~-yuli", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases"],
26:["pissulleq","the act or state of hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["-lleq¹", 0, 1, 0]], [0, 0, 0, 1], "Abs"]]],"noun phrase only","postbases","verb-noun postbases"],


28:["ner'uq","he is eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","statement sentence","subject only"],
29:["piipiq ner'uq","the baby is eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject only"],

31:["ner'uq","he is eating something",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb"],
32:["piipiq ner'uq","the baby is eathing something",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb"],
33:["ner'uq akutamek","he is eating some akutaq",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb"],
34:["piipiq ner'uq akutamek","the baby is eating some akutaq",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject with object not marked on verb"],

36:["neraa","he is eating it",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb"],
37:["piipim neraa","the baby is eating it",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb"],
38:["neraa akutaq","he is eating the akutaq",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb"],
39:["piipim neraa akutaq","the baby is eating the akutaq",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],"verb (+ noun) statements","statement sentence","subject and object marked on verb"],

41:["ner'uq natermi","he is sitting at/on the floor",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["nateq", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun"],
42:["ayagtuq Mamterillermun","he is going to Bethel",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun"],
43:["utertuq elitnaurvigmek","he is returning from the school",[["Insert", ["mv"], [[["uterte-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["elitnaurvik", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod", "from"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun"],
44:["ayagtuq tengssuutekun","he is going using/via airplane",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun"],
45:["pangalegtuq qimugtetun","he is running on fours like a dog",[["Insert", ["mv"], [[["pangaleg-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]],"verb (+ noun) statements","statement sentence","verb + oblique noun"],

47:["nerciquq","he will eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],
48:["nerenrituq","he is not eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],
49:["neryugtuq","he wants to eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],
50:["neryugngauq","he can eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yugnga-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],
51:["nerengnaquq","he is trying to eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-ngnaqe-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],
52:["nerlartuq","he regularly eats",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],
53:["neryugnarquq","he is probably eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yugnarqe¹-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],
54:["nerrsiyaagtuq","he is excessively eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-ssiyaag-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","verb-verb postbases"],

56:["angyangqertuq","he has a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-ngqerr-", 0, 1, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases"],
57:["angyanguq","he acquired a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-nge-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases"],
58:["angyaliuq","he is making a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-li²-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases"],
59:["angyalirtuq","he has lots of boats",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-lir-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases"],
60:["tuntussurtuq","he is hunting caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+ssur-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases"],
61:["tuntuturtuq","he is eating caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+tur²-", 0, 0, 0]], "i", "Ind"]]],"verb (+ noun) statements","postbases","noun-verb postbases"],




66:["kaigtuten-qaa?","are you hungry?",[["Insert", ["mv"], [[["kaig-", 0, 0, 0]], "i", "Ind", "qaa"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","yes-no question"],
67:["ayallruuq-qaa?","did he go?",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind", "qaa"]], ["Update", ["mv", "vs"], [3, 1, 1]]],"verb (+ noun) questions","question sentence","yes-no question"],

69:["kina taiga?","who is coming?",[["Insert", ["mv"], [[["tai-", 0, 0, 0]], "i", "Intrg", "Intrg0"]], ["Update", ["mv", "vs"], [3, 1, 1]]],"verb (+ noun) questions","question sentence","wh-question"],
70:["kia nerellruagu akutaqa?","who ate my akutaq?",[["Insert", ["mv"], [[["nere-", 0, 2, 0], ["-llru¹-", 0, 0, 0]], "t", "Intrg", "Intrg0"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [1, 1, 0, 1]]]],"verb (+ noun) questions","question sentence","wh-question"],

72:["kitumek tangercit?","who (non-specific) do you see?",[["Insert", ["mv"], [[["tangerr-", 0, 1, 0]], "it", "Intrg", "Intrg1"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
73:["kina tangerciu?","who (specific) do you see?",[["Insert", ["mv"], [[["tangerr-", 0, 2, 0]], "t", "Intrg", "Intrg1"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 1]]],"verb (+ noun) questions","question sentence","wh-question"],
74:["ca igta?","what fell?",[["Insert", ["mv"], [[["igte-", 0, 0, 0]], "i", "Intrg", "Intrg2"]], ["Update", ["mv", "vs"], [3, 1, 3]]],"verb (+ noun) questions","question sentence","wh-question"],


77:["camek kiputellrusit?","what did you buy?",[["Insert", ["mv"], [[["kipute-", 0, 1, 0], ["-llru¹-", 0, 0, 0]], "it", "Intrg", "Intrg3"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
78:["camek tangercit?","what do you see?",[["Insert", ["mv"], [[["tangerr-", 0, 1, 0]], "it", "Intrg", "Intrg3"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
79:["nani iqvallrusit?","at where did you pick berries?",[["Insert", ["mv"], [[["iqvaq,iqvar-", 0, 1, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "Intrg6"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
80:["naken taillrusit?","from where did you come?",[["Insert", ["mv"], [[["tai-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "Intrg7"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
81:["natmun ayagcit?","toward where are you going?",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Intrg", "Intrg8"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
82:["qangvaq tekitellrusit?","when (past) did you arrive?",[["Insert", ["mv"], [[["tekite-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "Intrg4"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
83:["qaku ayagciqsit?","when (future) will you go?",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Intrg", "Intrg5"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
84:["ciin qavarnisit?","why are you sleepy?",[["Insert", ["mv"], [[["qavarni-", 0, 0, 0]], "i", "Intrg", "Intrg9"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],
85:["qaillun akngirtellrusit?","how did you get hurt?",[["Insert", ["mv"], [[["akngirte-,aknirte-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Intrg", "IntrgA"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) questions","question sentence","wh-question"],


88:["neri","eat!",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative"],
89:["taikina","come (in the future)!",[["Insert", ["mv"], [[["tai-", 0, 0, 0]], "i", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative"],
90:["usviipiiqnak","stop being crazy!",[["Insert", ["mv"], [[["usviite-", 0, 0, 0]], "i", "Opt][PRS][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative"],
91:["kuingiryaqunak","don't smoke!",[["Insert", ["mv"], [[["kuingiq,kuiniq,kuingir-,kuinir-", 0, 1, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","optative"],



95:["teguqerru","please take it",[["Insert", ["mv"], [[["tegu-", 0, 0, 0], ["-qar-", 0, 0, 0]], "t", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","optative"],

97:["aqumluten","please sit down",[["Insert", ["mv"], [[["aqume-", 0, 0, 0]], "i", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subordinative"],
98:["alingevkenak","don't be scared",[["Insert", ["mv"], [[["alinge-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subordinative"],

100:["neri","eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only"],
101:["nerkina","eat (in the future)",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only"],
102:["nerviiqnak","stop eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][PRS][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only"],
103:["neryaqunak","don't eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only"],
104:["nerqaa","please eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-qar-", 0, 0, 0]], "i", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only"],
105:["nerluten","please eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only"],
106:["nerevkenak","please don't eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "neg"]], ["Update", ["mv", "vs"], [2, 1, 0]]],"verb (+ noun) commands","command sentence","subject only"],

108:["taisgu","bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked"],
109:["taiskiu","bring it here (in the future)",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked"],
110:["taipiiqnaku","stop bringing it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][PRS][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked"],
111:["taicaqunaku","don't bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked"],
112:["taiteqerru","please bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0], ["-qar-", 0, 0, 0]], "t", "Opt][PRS"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked"],
113:["tailluku","please bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0]], "t", "Sbrd"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked"],
114:["taitevkenaku","please don't bring it here",[["Insert", ["mv"], [[["taite²-", 0, 3, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "t", "Sbrd", "neg"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]]],"verb (+ noun) commands","command sentence","subject and object marked"],


117:["ayagpailgan payugeskiu","before he leaves, take some food to her",[["Insert", ["mv"], [[["payugte-", 0, 0, 0]], "t", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 2]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [3, 1, 2]]],"verb + verb phrase sentence","connective verb","before..."],
118:["ayagpailegpet kaassaq yuvrirniaran","before you go, check the gas",[["Insert", ["mv"], [[["yuvrir-", 0, 2, 0], ["@~+niar-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["kaassaq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","before..."],
119:["anvailegpet aturarkaten yuvrirniaraten","before you go out, check the clothing you will use",[["Insert", ["mv"], [[["yuvrir-", 0, 2, 0], ["@~+niar-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 3, 1]], ["Insert", ["mv", "no"], [[["aturaq", 0, 0, 0], ["+kaq", 0, 0, 0]], [0, 0, 0, 3]]], ["Insert", ["cv"], [[["ane-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","before..."],
120:["kuimarpailegpet neryaqunak","do not eat before swimming",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["kuimar-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","before..."],



124:["kaigtuten nereksailavet nerevkarilriani","you're hungry because you didn't eat at the feast",[["Insert", ["mv"], [[["kaig-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["nere-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Insert", ["cv", "nObliques"], [[["nerevkari-", 0, 0, 0], ["-lria", 0, 0, 0]], [0, 0, 0, 3], "Loc"]]],"verb + verb phrase sentence","connective verb","because..."],
125:["utercugtua naulluungama","I want to go home because I am sick",[["Insert", ["mv"], [[["uterte-", 0, 0, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["naulluu-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","because..."],

127:["cen̄irtaalaavet qusertuten","because you visit around, you have a cold",[["Insert", ["mv"], [[["quseq,quser-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["cen̄irtaar-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","because..."],
128:["kuuvviarpakaama qiivua","i'm shaky because i drank lots of coffee",[["Insert", ["mv"], [[["qiive-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["kuuvviaq,kuuvviar-", 0, 1, 0], ["@+pakar-|~vakar-,-qpakar-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","because..."],

130:["nunataqavet nemni uitayugngauten","whenever you come to the village, you can stay at my house",[["Insert", ["mv"], [[["uita-", 0, 0, 0], ["@~+yugnga-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["mv", "nObliques"], [[["[e]naᵉ,enaᵉ", 0, 0, 0]], [1, 1, 0, 1], "Loc"]], ["Insert", ["cv"], [[["nunate-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever..."],
131:["ner'aqami cukangnaq'lartuq","whenever he eats, he tries to be quick",[["Insert", ["mv"], [[["cuka-", 0, 0, 0], ["-ngnaqe-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["nere-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever..."],
132:["maantaqavet nunaniryulartua","whenever you are here, i am joyful",[["Insert", ["mv"], [[["nunaniryug-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["maante-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever..."],
133:["agiirtaqavet qiilertelartua","whenevery you come from the distance, i get excited",[["Insert", ["mv"], [[["qiilerte-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["agiirte-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","whenever..."],


136:["angulluarungermi uqilalartuq","even though he is an old man, he runs fast",[["Insert", ["mv"], [[["uqila-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 0, 2, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["angulluaq", 0, 0, 0], [":~(ng)u-", 0, 0, 0]], "i", "Conc", "eventhough"]], ["Update", ["cv", "vs"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","even though..."],
137:["yaaqsingraan paqcugaqa","even if it is far away, i want to check it",[["Insert", ["mv"], [[["paqte-", 0, 2, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["cv"], [[["yaaqsig-", 0, 0, 0]], "i", "Conc", "evenif"]], ["Update", ["cv", "vs"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","even though..."],

139:["qiangermi iluteqenrituq","even though he is crying, he is not emotionally pained",[["Insert", ["mv"], [[["iluteqe-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["qia-", 0, 0, 0]], "i", "Conc", "eventhough"]], ["Update", ["cv", "vs"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","even though..."],
140:["ellallingraan angyaryugtua","even if it is raining, i want to go by boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 1, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["ellallir-", 0, 0, 0]], "i", "Conc", "evenif"]], ["Update", ["cv", "vs"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","even though..."],

142:["tekiskuvet Mamterillermun kipusviggniartuten","when you arrive in Bethel, you'll go to the store",[["Insert", ["mv"], [[["kipusvik,kipuyvik", 0, 0, 0], ["+te¹-", 0, 0, 0], ["@~+niar-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["tekite-", 0, 0, 0]], "i", "Cond", "wheninthefuture"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Insert", ["cv", "nObliques"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]],"verb + verb phrase sentence","connective verb","if, when in the future..."],

144:["assikekuvgu qanruskia","if you like it, tell me",[["Insert", ["mv"], [[["qanrute-", 0, 2, 0]], "t", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [1, 1, 0]], ["Insert", ["cv"], [[["assike-", 0, 0, 0]], "t", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","if, when in the future..."],
145:["naspaayukuvgu ikircugngaan","if you want to try it, you can open it",[["Insert", ["mv"], [[["ikirte-", 0, 2, 0], ["@~+yugnga-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["cv"], [[["naspaa-", 0, 2, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "t", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","if, when in the future..."],
146:["kaigciquten nerenrilkuvet","you will be hungry if you don't eat",[["Insert", ["mv"], [[["kaig-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["nere-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","if, when in the future..."],
147:["nerciqut cen̄ireskuneng","they will eat when they visit",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Insert", ["cv"], [[["cen̄irte-,cenirte-", 0, 0, 0]], "i", "Cond", "wheninthefuture"]], ["Update", ["cv", "vs"], [4, 3, 0]]],"verb + verb phrase sentence","connective verb","if, when in the future..."],
148:["atuquvgu navegyaqunaku","if you use it, don't break it",[["Insert", ["mv"], [[["naveg-", 0, 2, 0]], "t", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["cv"], [[["atuq,atur-", 0, 3, 0]], "t", "Cond", "if"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]],"verb + verb phrase sentence","connective verb","if, when in the future..."],

150:["qavarningllerpeni anellruunga","when you were getting sleepy, i went out",[["Insert", ["mv"], [[["ane-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["qavarni-", 0, 0, 0], ["-nge-", 0, 1, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [2, 1, 0]]],"verb + verb phrase sentence","connective verb","when in the past..."],

152:["maqillemni uutellruunga","when i took a maqi, i burned (flesh)",[["Insert", ["mv"], [[["uute-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["maqi-", 0, 0, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","when in the past..."],
153:["quyallruuq cen̄irtellratni","she was happy when they visited her",[["Insert", ["mv"], [[["quya-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 2]], ["Insert", ["cv"], [[["cen̄irte-,cenirte-", 0, 2, 0]], "t", "CtmpI"]], ["Update", ["cv", "vs"], [3, 3, 0]], ["Update", ["cv", "vo"], [4, 1, 0]]],"verb + verb phrase sentence","connective verb","when in the past..."],

155:["ayainanemni massiinaqa navellruuq","while i was going, my motor broke",[["Insert", ["mv"], [[["naveg-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["mv", "ns"], [[["massiinaq", 0, 0, 0]], [1, 1, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "CtmpII"]], ["Update", ["cv", "vs"], [1, 1, 0]]],"verb + verb phrase sentence","connective verb","while..."],
156:["qianginanrani camek niitellruuq","while he were crying, he heard something",[["Insert", ["mv"], [[["niite-", 0, 1, 0], ["-llru¹-", 0, 0, 0]], "it", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["mv", "no"], [[["ca,ca-", 0, 0, 1]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["qia-", 0, 0, 0]], "i", "CtmpII"]], ["Update", ["cv", "vs"], [3, 1, 1]]],"verb + verb phrase sentence","connective verb","while..."],



160:["cukaluni kiturtuq","it passed by quickly",[["Insert", ["mv"], [[["kitur-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["cuka-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
161:["taiciquq piyualuni","he will come (by) walking",[["Insert", ["mv"], [[["tai-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["piyua-", 0, 0, 0]], "i", "Sbrd", "by"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
162:["ayallruuq cavluni","he went (by) rowing",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["cave-", 0, 0, 0]], "i", "Sbrd", "by"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
163:["itellruunga tangerrsugluku","i came in wanting to see her",[["Insert", ["mv"], [[["iter-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["sv"], [[["tangerr-", 0, 2, 0], ["@~+yug-,+(r)yug-", 0, 1, 0]], "t", "Sbrd", "being"]], ["Update", ["sv", "vo"], [3, 1, 2]]],"verb + verb phrase sentence","subordinative verb","adjectival"],

165:["yurartuten assirluten","you are dancing well (literally: 'being good (at it)')",[["Insert", ["mv"], [[["yuraq,yurar¹-", 0, 1, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["assir-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
166:["aqvaqurtut cukaluteng","they are running fast (being fast)",[["Insert", ["mv"], [[["aqvaqur-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Insert", ["sv"], [[["cuka-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
167:["qenerrluni nunullrui","he scolded them angrily (being angry)",[["Insert", ["mv"], [[["nunur¹-", 0, 2, 0], ["-llru¹-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Update", ["mv", "vo"], [3, 3, 0]], ["Insert", ["sv"], [[["qenerte-", 0, 0, 0]], "i", "Sbrd", "being"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
168:["aqumgallruuq utaqaluni","he sat down waiting",[["Insert", ["mv"], [[["aqumga-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["utaqa-", 0, 0, 0]], "i", "Sbrd", "being"]]],"","",""],


171:["anellruuq nereksaunani","he went out without eating",[["Insert", ["mv"], [[["ane-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["nere-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Sbrd", "without"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
172:["akluirpek'nak inarcaqunak","don't lay down without taking off your clothes",[["Insert", ["mv"], [[["inarte-", 0, 0, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["aklu,akluq,aklu-", 1, 0, 0], [":(ng)ir²-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "without"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
173:["qiallruuq taqevkenani","he cried without stopping",[["Insert", ["mv"], [[["qia-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["taqe-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "without"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],
174:["alingevkenak inareskina","lay down (in the future), not being scared",[["Insert", ["mv"], [[["inarte-", 0, 0, 0]], "i", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["alinge-", 0, 0, 0], ["+peke-|+vke-,+pege-|+vke-", 0, 0, 0]], "i", "Sbrd", "notbeing"]]],"verb + verb phrase sentence","subordinative verb","adjectival"],





}




































































































































































































































































































































































































































































































































































































































































































































































































































































































































export const sentenceTemplates = {
1:["qimugta","the dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],

3:["qimugteka","my dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [1, 1, 0, 1], "Abs"]]]],
4:["qimugtem pamyua","the dog's tail",[["Insert", ["np"], [[["pamyuq,pamsuq", 0, 0, 0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", -1], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1]]]]],

6:["imarpigmi","in the ocean",[["Insert", ["np"], [[["imarpik,imarpak", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]]],
7:["kipusvigmun","to the store",[["Insert", ["np"], [[["kipusvik,kipuyvik", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]]],
8:["Mamterillermek","from Bethel",[["Insert", ["np"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod"]]]],
9:["tengssuutekun","using, via an airplane",[["Insert", ["np"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]]],
10:["qimugtetun","like a dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]]],

// 12:["arnaq elitnaurista","the woman teacher",[["Insert", ["np"], [["elitnaurista",0,0,0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", 0, -1], [[["arnaq", 0, 0, 0]], [0, 0, 0, 1]]]]],

14:["piipirpak","the big baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-rpak,-rpag-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
15:["piipicuar","the small baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-cuar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
16:["piipiyagaq","the little/baby baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-ya(g)aq*,-yagaq*,-ya(g)ar-,-yagar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
17:["piipiqegtaar","the good baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-kegtaar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
18:["piipiruaq","the fake baby",[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["+(ng)uaq,@~+(ng)uar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],

20:["pissulria","the one who is hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["-lria", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
21:["pissurvik","the place to hunt",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~+vik,+(r)vik", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
22:["pissurcuun","the device for hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["+cuun|+ssuun", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
23:["pissuryaraq","the way of hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~+yaraq", 1, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
24:["pissutuli","the one that often hunts",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["+tuli,-tuli", 1, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
25:["pissuyuli","the one that is good at hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["@~-yuli", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],
26:["pissulleq","the act or state of hunting",[["Insert", ["np"], [[["pissur-", 0, 0, 0], ["-lleq¹", 1, 0, 0]], [0, 0, 0, 1], "Abs"]]]],

28:["ner'uq","he is eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]]],
29:["piipiq ner'uq","the baby is eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]]],

31:["ner'uq","he is eating something",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]]]],
32:["piipiq ner'uq","the baby is eathing something",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]]],
33:["ner'uq akutamek","he is eating some akutaq",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]]],
34:["piipiq ner'uq akutamek","the baby is eating some akutaq",[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]]],

36:["neraa","he is eating it",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]]]],
37:["piipim neraa","the baby is eating it",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]]],
38:["neraa akutaq","he is eating the akutaq",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]]],
39:["piipim neraa akutaq","the baby is eating the akutaq",[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]]],

41:["ner'uq natermi","he is sitting at/on the floor",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["nateq", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]]],
42:["ayagtuq Mamterillermun","he is going to Bethel",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]]],
43:["utertuq elitnaurvigmek","he is returning from the school",[["Insert", ["mv"], [[["uterte-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["elitnaurvik", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod"]]]],
44:["ayagtuq tengssuutekun","he is going using/via airplane",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]]],
45:["pangalegtuq qimugtetun","he is running on fours like a dog",[["Insert", ["mv"], [[["pangaleg-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "nObliques"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]]],

47:["nerciquq","he will eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]]]],
48:["nerenrituq","he is not eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Ind"]]]],
49:["neryugtuq","he wants to eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yug-,+(r)yug-", 1, 1, 0]], "i", "Ind"]]]],
50:["neryugngauq","he can eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yugnga-", 0, 0, 0]], "i", "Ind"]]]],
51:["nerengnaquq","he is trying to eat",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-ngnaqe-", 0, 0, 0]], "i", "Ind"]]]],
52:["nerlartuq","he repeatedly eats",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Ind"]]]],
53:["neryugnarquq","he is probably eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["@~+yugnarqe¹-", 0, 0, 0]], "i", "Ind"]]]],
54:["nerrsiyaagtuq","he is excessively eating",[["Insert", ["mv"], [[["nere-", 0, 0, 0], ["-ssiyaag-", 0, 0, 0]], "i", "Ind"]]]],

56:["angyangqertuq","he has a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-ngqerr-", 1, 0, 0]], "i", "Ind"]]]],
57:["angyanguq","he acquired a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-nge-", 0, 0, 0]], "i", "Ind"]]]],
58:["angyaliuq","he is making a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-li²-", 0, 0, 0]], "i", "Ind"]]]],
59:["angyalirtuq","he has lots of boats",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-lir-", 0, 0, 0]], "i", "Ind"]]]],
60:["tuntussurtuq","he is hunting caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+ssur-", 0, 0, 0]], "i", "Ind"]]]],
61:["tuntuturtuq","he is eating caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+tur²-", 0, 0, 0]], "i", "Ind"]]]],





































99:["ayagpailgan payugeskiu","before he leaves, take some food to her",[["Insert", ["mv"], [[["payugte-", 0, 0, 0]], "t", "Opt][Trns][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 2]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [3, 1, 1]]]],
100:["ayagpailegpet kaassaq yuvrirniaran","before you go, check the gas",[["Insert", ["mv"], [[["yuvrir-", 0, 2, 0], ["@~+niar-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["kaassaq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],

102:["kuimarpailegpet neryaqunak","do not eat before swimming",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][Intr][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["kuimar-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
103:["maqaqluten aklurniartuten kangkiirpailegpet","dress warm before going ice skating",[["Insert", ["mv"], [[["nateq", 0, 0, 0], ["@~+niar-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["maqarqe-", 0, 0, 0]], "i", "Sbrd"]], ["Insert", ["cv"], [[["kankiiq,kankiitaq,kankiir-", 0, 1, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],

105:["upingaksailavet tengssuuten kingurautan","because you weren't ready, you missed your airplane",[["Insert", ["mv"], [[["kinguraute-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["tengssuun", 0, 0, 0]], [2, 1, 0, 1]]], ["Insert", ["cv"], [[["upinga-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
106:["kaigtuten nereksailavet nerevkarilriani","you're hungry because you didn't eat at the feast",[["Insert", ["mv"], [[["kaig-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["mv", "nObliques"], [[["nerevkari-", 0, 0, 0], ["-lria", 0, 0, 0]], [0, 0, 0, 1], "Loc"]], ["Insert", ["cv"], [[["nere-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
107:["cenirtaalaavet ciissiraaten","because you visit around, you got bugs",[["Insert", ["mv"], [[["ciissiq,ciissir-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["cen̄irtaar-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
108:["kuuvviarpakaama qiivua","i'm shaky because i drank lots of coffee",[["Insert", ["mv"], [[["qiive-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["kuuvviaq,kuuvviar-", 0, 1, 0], ["@+pakar-|~vakar-,-qpakar-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [1, 1, 0]]]],

















































}
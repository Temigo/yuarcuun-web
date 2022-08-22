export const sentenceTemplates = {
1:["qimugta","the dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]]],

3:["qimugteka","my dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [1, 1, 0, 1], "Abs"]]]],
4:["qimugtem pamyua","the dog's tail",[["Insert", ["np"], [[["pamyuq,pamsuq", 0, 0, 0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", -1], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1]]]]],

6:["imarpigmi","in the ocean",[["Insert", ["np"], [[["imarpik,imarpak", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]]],
7:["kipusvigmun","to the store",[["Insert", ["np"], [[["kipusvik,kipuyvik", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]]],
8:["Mamterillermek","from Bethel",[["Insert", ["np"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod"]]]],
9:["tengssuutekun","using, via an airplane",[["Insert", ["np"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]]],
10:["qimugtetun","like a dog",[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]]],

12:["arnaq elitnaurista","the woman teacher",[["Insert", ["np"], [["elitnaurista",0,0,0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", 0, -1], [[["arnaq", 0, 0, 0]], [0, 0, 0, 1]]]],

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
58:["angyiuq","he is making a boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-li²-", 0, 0, 0]], "i", "Ind"]]]],
59:["angyalirtuq","he has lots of boats",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 0, 0], ["-lir-", 0, 0, 0]], "i", "Ind"]]]],
60:["tuntussurtuq","he is hunting caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+ssur-", 0, 0, 0]], "i", "Ind"]]]],
61:["tuntuturtuq","he is eating caribou",[["Insert", ["mv"], [[["tuntu", 0, 0, 0], ["+tur²-", 0, 0, 0]], "i", "Ind"]]]],





































99:["ayagpailgan payugeskiu","before he leaves, take some food to her",[["Insert", ["mv"], [[["payugte-", 0, 0, 0]], "t", "Opt][FUT"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 2]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [3, 1, 1]]]],
100:["ayagpailegpet kaassaq yuvrirniaran","before you go, check the gas",[["Insert", ["mv"], [[["yuvrir-", 0, 2, 0], ["@~+niar-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["kaassaq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],

102:["kuimarpailegpet neryaqunak","do not eat before swimming",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["kuimar-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
103:["maqaqluten aklurniartuten kangkiirpailegpet","dress warm before going ice skating",[["Insert", ["mv"], [[["nateq", 0, 0, 0], ["@~+niar-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["maqarqe-", 0, 0, 0]], "i", "Sbrd"]], ["Insert", ["cv"], [[["kankiiq,kankiitaq,kankiir-", 0, 1, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],

105:["upingaksailavet tengssuuten kingurautan","because you weren't ready, you missed your airplane",[["Insert", ["mv"], [[["kinguraute-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["tengssuun", 0, 0, 0]], [2, 1, 0, 1]]], ["Insert", ["cv"], [[["upinga-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
106:["kaigtuten nereksailavet nerevkarilriani","you're hungry because you didn't eat at the feast",[["Insert", ["mv"], [[["kaig-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["mv", "nObliques"], [[["nerevkari-", 0, 0, 0], ["-lria", 0, 0, 0]], [0, 0, 0, 1], "Loc"]], ["Insert", ["cv"], [[["nere-", 0, 0, 0], ["-ksaite-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
107:["cenirtaalaavet ciissiraaten","because you visit around, you got bugs",[["Insert", ["mv"], [[["ciissiq,ciissir-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["cen̄irtaar-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
108:["kuuvviarpakaama qiivua","i'm shaky because i drank lots of coffee",[["Insert", ["mv"], [[["qiive-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["kuuvviaq,kuuvviar-", 0, 1, 0], ["@+pakar-|~vakar-,-qpakar-", 0, 0, 0]], "i", "Cnsq"]], ["Update", ["cv", "vs"], [1, 1, 0]]]],

110:["nunataqavet maani uitayugngauten","whenever you come to the village, you can stay here",[["Insert", ["mv"], [[["uita-", 0, 0, 0], ["@~+yugnga-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["mv", "nObliques"], [[], [0, 0, 0, 1], "Loc"]], ["Insert", ["cv"], [[["nunate-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
111:["ner'aqami cukangnaq'lartuq","whenever he eats, he tries to be quick",[["Insert", ["mv"], [[["cuka-", 0, 0, 0], ["-ngnaqe-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["nere-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [4, 1, 0]]]],
112:["maantaqavet nunaniryulartua","whenever you are here, i am joyful",[["Insert", ["mv"], [[["nunaniryug-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["maante-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
113:["agiirtaqavet qiilertelartua","whenevery you come from the distance, i get excited",[["Insert", ["mv"], [[["qiilerte-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["agiirte-", 0, 0, 0]], "i", "Cont"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],

115:["ak'allaunge'rmi aturyunaq'lartuq","even though it is old, it's reliable",[["Insert", ["mv"], [[["atuq,atur-", 0, 0, 0], ["@~-yunarqe-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["cv"], [[["ak'allau-", 0, 0, 0]], "i", "Conc"]], ["Update", ["cv", "vs"], [4, 1, 0]]]],
116:["angulluarungermi uqilalartuq","even though he is an old man, he runs fast",[["Insert", ["mv"], [[["uqila-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["cv"], [[["angulluaq", 0, 0, 0], [":~(ng)u-", 0, 0, 0]], "i", "Conc"]], ["Update", ["cv", "vs"], [4, 1, 0]]]],
117:["yaaqsingraan paqcugaqa","even though it is far away, i want to check it",[["Insert", ["mv"], [[["paqte-", 0, 2, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["cv"], [[["yaaqsig-", 0, 0, 0]], "i", "Conc"]], ["Update", ["cv", "vs"], [3, 1, 3]]]],
118:["nuvkutengramegnuk kenkut'lartukuk","even though we argue, we love each other",[["Insert", ["mv"], [[["kenka,kenke-", 0, 1, 0], ["@:(u)te⁵-", 0, 0, 0], ["~+lar-,@~+lar-,-lar-", 2, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 2, 0]], ["Insert", ["cv"], [[["nuvkute-", 0, 0, 0]], "i", "Conc"]], ["Update", ["cv", "vs"], [1, 2, 0]]]],
119:["qiangermi iluteqenrituq","even though he is crying, he is not emotionally pained",[["Insert", ["mv"], [[["iluteqe-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["qia-", 0, 0, 0]], "i", "Conc"]], ["Update", ["cv", "vs"], [4, 1, 0]]]],
120:["ellallingraan angyaryugtua","even though it is raining, i want to go by boat",[["Insert", ["mv"], [[["angyaq,angyar-", 0, 1, 0], ["@~+yug-,+(r)yug-", 1, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["ellallir-", 0, 0, 0]], "i", "Conc"]], ["Update", ["cv", "vs"], [3, 1, 0]]]],

122:["tekiskuvet Mamterillermun kipusvigniartuten","when you arrive in Bethel, you'll go to the store",[["Insert", ["mv"], [[["kipusvik", 0, 0, 0], ["+te¹-", 0, 0, 0], ["@~+niar-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["tekite-", 0, 0, 0]], "i", "Cond"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Insert", ["cv", "nObliques"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]]],
123:["kenkekuvgu qalaruciiqan","if you love them, you will talk to them",[["Insert", ["mv"], [[["qalarte-", 0, 0, 0], ["@:(u)te⁵-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["cv"], [[["kenka,kenke-", 0, 1, 0]], "t", "Cond"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 1]]]],
124:["assikekuvgu qanruskia","if you like it, tell me",[["Insert", ["mv"], [[["qanrute-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["cv"], [[["assike-", 0, 0, 0]], "t", "Cond"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [1, 1, 0]]]],
125:["naspaayukuvgu ikircugngaan","if you want to try it, you can open it",[["Insert", ["mv"], [[["ikirte-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["cv"], [[["naspaa-", 0, 2, 0], ["@~+yug-,+(r)yug-", 1, 0, 0]], "t", "Cond"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]]],
126:["kaigciquten nerenrilkuvet","you will be hungry if you don't eat",[["Insert", ["mv"], [[["kaig-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["cv"], [[["nere-", 0, 0, 0], ["-nrite-", 0, 0, 0]], "i", "Cond"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
127:["nerciqut ceńireskuneng","they will eat if they visit",[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Insert", ["cv"], [[["cen̄irte-,cenirte-", 0, 0, 0]], "i", "Cond"]], ["Update", ["cv", "vs"], [4, 3, 0]]]],
128:["atuquvgu navegyaqunaku","if you use it, don't break it",[["Insert", ["mv"], [[["naveg-", 0, 2, 0]], "t", "Opt][FUT][NEG"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["cv"], [[["atuq,atur-", 0, 3, 0]], "t", "Cond"]], ["Update", ["cv", "vs"], [2, 1, 0]], ["Update", ["cv", "vo"], [3, 1, 3]]]],

130:["qavarningllerpeni anellruunga","when you were getting sleepy, i went out",[["Insert", ["mv"], [[["ane-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["qavarni-", 0, 0, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [2, 1, 0]]]],
131:["ulellrani iqsagyallruut","when the tide came in, they went fishing",[["Insert", ["mv"], [[["iqsak,iqsag-", 0, 1, 0], ["@~+yar-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Insert", ["cv"], [[["ule-", 0, 0, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [3, 1, 3]]]],
132:["maqillemni uutellruunga","when i took a maqi, i burned (flesh)",[["Insert", ["mv"], [[["uute-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["cv"], [[["maqi-", 0, 0, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [1, 1, 0]]]],

134:["ayainanemni massiinaqa navellruuq","while i was going, my motor broke",[["Insert", ["mv"], [[["naveg-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 3]], ["Insert", ["mv", "ns"], [[["massiinaq", 0, 0, 0]], [1, 1, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [1, 1, 0]]]],
135:["qianginanrani camek niitellruuq","while he were crying, he heard something",[["Insert", ["mv"], [[["niite-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "it", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["mv", "no"], [[["ca,ca-", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["qia-", 0, 0, 0]], "i", "CtmpI"]], ["Update", ["cv", "vs"], [3, 1, 1]]]],



139:["cukaluni  kiturtuq","it passed by quickly",[["Insert", ["mv"], [[["kitur-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["cuka-", 0, 0, 0]], "i", "Sbrd"]]]],
140:["tai-ciq-uq piyua-luni","(by) walking",[["Insert", ["mv"], [[["tai-", 0, 0, 0], ["+ciqe-|@ciiqe-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["piyua-", 0, 0, 0]], "i", "Sbrd"]]]],
141:["aya-llru-uq cav-luni","(by) rowing",[["Insert", ["mv"], [[["ayag¹-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["cave-", 0, 0, 0]], "i", "Sbrd"]]]],
142:["ite-llru-unga tangerr-sug-luku","wanting to see her",[["Insert", ["mv"], [[["iter-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [1, 1, 0]], ["Insert", ["sv"], [[["tangerr-", 0, 2, 0], ["@~+yug-,+(r)yug-", 1, 0, 0]], "t", "Sbrd"]], ["Update", ["sv", "vs"], [3, 1, 3]]]],
143:["qit'v-u-lluta qalarute-llru-akut","speaking English to us,",[["Insert", ["mv"], [[["qalarte-", 0, 0, 0], ["@:(u)te⁵-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Update", ["mv", "vo"], [1, 3, 0]], ["Insert", ["sv"], [[["qitevte-", 0, 0, 0], ["@:(u)te⁵-", 0, 0, 0]], "t", "Sbrd"]], ["Update", ["sv", "vs"], [1, 3, 0]]]],
144:["yurar-tuten assir-luten","well (literally: 'being good (at it)')",[["Insert", ["mv"], [[["yuraq,yurar¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Insert", ["sv"], [[["assir-", 0, 0, 0]], "i", "Sbrd"]]]],
145:["aqvaqur-tut cuka-luteng","fast (being fast)",[["Insert", ["mv"], [[["aqvaqur-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 3, 0]], ["Insert", ["sv"], [[["cuka-", 0, 0, 0]], "i", "Sbrd"]]]],
146:["qenerr-luni nunu-llru-i","angrily (being angry)",[["Insert", ["mv"], [[["nunur¹-", 0, 2, 0], ["-llru¹-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Update", ["mv", "vo"], [3, 3, 0]], ["Insert", ["sv"], [[["qenerte-", 0, 0, 0]], "i", "Sbrd"]]]],
147:["aqumga-llru-uq utaqa-luni","waiting",[["Insert", ["mv"], [[["aqumga-", 0, 0, 0], ["-llru¹-", 0, 0, 0]], "i", "Ind"]], ["Update", ["mv", "vs"], [3, 1, 1]], ["Insert", ["sv"], [[["utaqa-", 0, 0, 0]], "i", "Sbrd"]]]],










}
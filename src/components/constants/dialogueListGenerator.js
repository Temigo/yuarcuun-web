import {dialogueList} from "./dialogueList.js";

// npm i --save finnlp
// npm install en-inflectors --save
// import * as Fin from "finnlp";
import { Inflectors } from "en-inflectors";

const lessonChunks = {
	0:"Featured", 
	1:"Basic Questions",
	2:"Introductions",
	3:"At Home",
	4:"Talking to Others",
	5:"At School",
	6:"Gathering",
	7:"Hunting",
	8:"Fishing",
	9:"Vehicles",
};


export function dialogueGenerator() {
	var lessons = [];
	var dialogues = {};
	var bagOfWords = {
		'v':{'yup':new Set(),
			 'eng':new Set()},
		'n':{'yup':new Set(),
			 'eng':new Set()},
		'p':{'yup':new Set(),
			 'eng':new Set()},
		'e':{'yup':new Set(),
			 'eng':new Set()},
	};

	var currentLesson = "";
	var lessonDialogues = [];
	// var lessonExercises = [];

	var previousDialogue = "";
	var dialogueIndex = 2

	var order_out;
	var title_out = "";
	var context_out = "";
	// var matchingYug_out = [];
	// var matchingEng_out = [];

	for (const d in dialogueList) {
		// Chapter	Lesson	Number	Turn	Person	
		const ch = dialogueList[d][0]
		const lsn = dialogueList[d][1]
		const num = dialogueList[d][2]
		const turn = dialogueList[d][3]
		const per = dialogueList[d][4]
		// Yugtun	English	Audio-Full	
		const yug = dialogueList[d][5]
		const eng = dialogueList[d][6]
		const audio = dialogueList[d][7]
		// Order	Title	Context	
		const order = dialogueList[d][8]
		const title = dialogueList[d][9]
		const context = dialogueList[d][10]
		// Base-Yugtun	Base-Yugtun-Choose	Base-English	Base-English-Choose	
		const baseYug = dialogueList[d][11]
		// const baseYugCh = dialogueList[d][12]
		const baseEng = dialogueList[d][13]
		// const baseEngCh = dialogueList[d][14]
		// Ending-Yugtun	Ending-Yugtun-Choose	Ending-English	Ending-English-Choose
		// const endingYug = dialogueList[d][15]
		// const endingYugCh = dialogueList[d][16]
		// const endingEng = dialogueList[d][17]
		// const endingEngCh = dialogueList[d][18]
		// Fill-in-Blank 1	Fill-in-Blank 2	
		// const fib1 = dialogueList[d][19]
		// const fib2 = dialogueList[d][20]		
		// Matching-Yugtun	Matching-English
		// const matchingYug = dialogueList[d][21]
		// const matchingEng = dialogueList[d][22]
		// Exercise 1	Exercise 2
		// const exercise1 = dialogueList[d][23]
		// const exercise2 = dialogueList[d][24]
		// const exercise3 = dialogueList[d][25]
		// const exercise4 = dialogueList[d][26]
		// baseType
		const baseType = dialogueList[d][27]



		const lesson = `${ch}-${lsn}-${num}`;
		var dialogue = `qaneryaurci-${ch}-${lsn}-${num}-${turn}-${per}`;
		
		if (currentLesson === "") {
			currentLesson = lesson;
		}
		else if (currentLesson !== lesson) {
			// const matching = matchingYug_out.length === 1 ? [] : [matchingYug_out,matchingEng_out]
			
			lessons.push({
				"order":order_out, 
				"title":title_out, 
				"context":context_out, 
				"dialogues":lessonDialogues, 
				// "exercises":lessonExercises, 
				// "matching":matching
			});

			currentLesson = lesson;
			lessonDialogues = [];
			// lessonExercises = [];
		}

		// first line in lesson
		if (turn === 1 && per === "a" && dialogue !== previousDialogue) {
			title_out = title;
			if (title_out === '') {
				title_out = `Qaneryaurci Ch${ch}-${lsn} #${num}`;
			}
			context_out = context;
			order_out = order;
			// matchingYug_out = matchingYug.split(";");
			// matchingEng_out = matchingEng.split(";");
		}

		if (dialogue === previousDialogue) {
			dialogue += `-${dialogueIndex}`
			dialogueIndex++;
			lessonDialogues[lessonDialogues.length-1].push(dialogue)
		} else {
			lessonDialogues.push([dialogue,])
			// lessonExercises.push([exercise1,exercise2,exercise3,exercise4])
			previousDialogue = dialogue;
			dialogueIndex = 2
		}

		// add to bag of words
		const baseYug_bow = baseYug.match(/<.*?>/)[0].slice(1,-1)
		const baseEng_bow = baseEng.match(/<.*?>/)[0].slice(1,-1)
		bagOfWords[baseType]['yup'].add(baseYug_bow.toLowerCase())
		bagOfWords[baseType]['eng'].add(baseEng_bow.toLowerCase())

		dialogues[dialogue] = {
			"speaker":per,
			"yupik":yug,
			"english":eng,
			"audio":audio,
			"baseType": baseType,
			"baseYupik":baseYug,
			// "baseYupikChoose":baseYugCh.split(";"),
			"baseEnglish":baseEng,
			// "baseEnglishChoose":baseEngCh.split(";"),
			// "endingYupik":endingYug,
			// "endingYupikChoose":endingYugCh.split(";"),
			// "endingEnglish":endingEng,
			// "endingEnglishChoose":endingEngCh.split(";"),
			// "fillinblank1":fib1,
			// "fillinblank2":fib2,
		}
	}
	lessons = lessons.filter(a => a.order !== undefined)
	lessons = lessons.sort((a,b) => (a.order > b.order) ? 1 : -1);
	lessons = addHeaders(lessons)
	console.log("DialogueGenerator",{lessons, dialogues, bagOfWords});
	return {lessons, dialogues, bagOfWords};
}

function addHeaders(lsns) {
	var lsns_out = [];
	var currChunk = -1;
	for (let l in lsns) {
		const newChunk = Math.floor(lsns[l].order/100)
		if (newChunk !== currChunk) {
			currChunk = newChunk
			lsns_out.push({
				"title":lessonChunks[currChunk],
				"context":"chunk"
			})
		}
		lsns_out.push(lsns[l])
	}
	return lsns_out
}



export function exerciseGenerator(lesson,dialogueList,bagOfWords) {
	var dialogues = {};

	// ADD NEW
	// 1. shuffle multi dialogues in lesson
	// englishQuestion  ["Are you ",6,"?"]  (6 is length of hungry) (always have leftText, middleInt, rightText)
	// englishQuestionOptions  ["happy", "come", "hungry", "go"] (4 RANDOMLY GENERATED)
	// englishQuestionCorrect  "hungry"
	// yupikQuestion  ["",4,"tuten-qaa?"] (always have leftText, middleInt, rightText)
	// yupikQuestionOptions  ["Kaig", "Ane", "Ayag", "Tune"] (4 RANDOMLY GENERATED) (add capitalization fixes)
	// yupikQuestionCorrect  "Kaig"

	let shuffleArray = (array) => {
	    for (let i = array.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [array[i], array[j]] = [array[j], array[i]];
	    }
	    return array;
	}
	let startsWithCapital = (word) => {
    	return /[A-Z]/.test(word.charAt(0))
	}
	let capitalizeFirstLetter = (word) => {
    	return word.charAt(0).toUpperCase() + word.slice(1)
	}
	let lowercaseFirstLetter = (word) => {
    	return word.charAt(0).toLowerCase() + word.slice(1)
	}


	for (let d_list in lesson.dialogues) { // list
		if (lesson.dialogues[d_list].length > 1) {
			shuffleArray(lesson.dialogues[d_list])
		}
		for (let d in lesson.dialogues[d_list]) { // list
			const dialogue = lesson.dialogues[d_list][d];

			var dialogue_out = dialogueList[dialogue];
			const yug_bow = dialogue_out.baseYupik.match(/<.*?>/)[0]
			const eng_bow = dialogue_out.baseEnglish.match(/<.*?>/)[0]
			var yug_span = dialogue_out.baseYupik.split(yug_bow)
			if (yug_span.length === 1) {
				yug_span.push('');
			}
			yug_span.splice(1,0,yug_bow.slice(1,-1).length);
			var eng_span = dialogue_out.baseEnglish.split(eng_bow)
			if (eng_span.length === 1) {
				eng_span.push('');
			}
			eng_span.splice(1,0,eng_bow.slice(1,-1).length);

			let yup_words = Array.from(bagOfWords[dialogue_out.baseType]['yup'].values());
			var yup_options_all = shuffleArray(yup_words);
			var yup_options = [yug_bow.slice(1,-1),];
			for (let i in yup_options_all) {
				if (yup_options.length >= 4) {
					break
				}
				let correctWord = yug_bow.slice(1,-1);
				var checkWord = "";
				if (startsWithCapital(correctWord)) {
					checkWord = capitalizeFirstLetter(yup_options_all[i])
				} else {
					checkWord = lowercaseFirstLetter(yup_options_all[i])
				}
				if (!yup_options.includes(checkWord)) {
					yup_options.push(checkWord)
				}
			}
			let eng_words = Array.from(bagOfWords[dialogue_out.baseType]['eng'].values())
			let eng_options_all = shuffleArray(eng_words);
			var eng_options = [eng_bow.slice(1,-1),];
			for (let i in eng_options_all) {
				if (eng_options.length >= 4) {
					break
				}
				let correctWord = eng_bow.slice(1,-1);
				var checkWord2 = "";
				if (startsWithCapital(correctWord)) {
					checkWord2 = capitalizeFirstLetter(eng_options_all[i])
				} else {
					checkWord2 = lowercaseFirstLetter(eng_options_all[i])
				}
				if (!eng_options.includes(checkWord2)) {
					eng_options.push(checkWord2)
				}
			}

			// make smarter english options
			if (dialogue_out.baseType === 'v') {

				// let processed = new Fin.Run(eng_options[0]);
				// let tag = processed.sentences[0].tags[0];
				// console.log('',eng_options[0],tag)
				// for (let i in eng_options) {
				// 	if (['VB','VBP'].includes(tag)) {
				// 		eng_options[i] = new Inflectors(eng_options[i]).conjugate("VBP"); // toPresent
				// 	} else if (tag === 'VBD') {
				// 		eng_options[i] = new Inflectors(eng_options[i]).conjugate("VBD"); // toPast
				// 	} else if (tag === 'VBN') {
				// 		eng_options[i] = new Inflectors(eng_options[i]).conjugate("VBN"); // toPastParticiple
				// 	} else if (tag === 'VBZ') {
				// 		eng_options[i] = new Inflectors(eng_options[i]).conjugate("VBZ"); // toPresentS
				// 	} else if (tag === 'VBG') {
				// 		eng_options[i] = new Inflectors(eng_options[i]).conjugate("VBG"); // toGerund
				// 	}
				// }

			} else if (dialogue_out.baseType === 'n') {
				let word = new Inflectors(eng_options[0]);
				for (let i in eng_options) {
					if (word.isSingular()) {
						const instance = new Inflectors(eng_options[i]);
						eng_options[i] = instance.toSingular();
					} else {
						const instance = new Inflectors(eng_options[i]);
						eng_options[i] = instance.toPlural();
					}
				}
			}

			dialogue_out['yupikQuestion'] = yug_span;
			dialogue_out['yupikQuestionOptions'] = shuffleArray(yup_options);
			dialogue_out['yupikQuestionCorrect'] = yug_bow.slice(1,-1);
			dialogue_out['englishQuestion'] = eng_span;
			dialogue_out['englishQuestionOptions'] = shuffleArray(eng_options);
			dialogue_out['englishQuestionCorrect'] = eng_bow.slice(1,-1);

			dialogues[dialogue] = dialogue_out;
		}

	}

	console.log("ExerciseGenerator",{lesson,dialogues});

	return {lesson,dialogues}
}


export default dialogueGenerator;

import {dialogueList} from "./dialogueList.js";

const lessonChunks = {
	0:"Test", 
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






function dialogueGenerator() {
	var lessons = [];
	var dialogues = {};

	var currentLesson = "";
	var lessonDialogues = [];
	var lessonExercises = [];

	var previousDialogue = "";
	var dialogueIndex = 2

	var order_out;
	var title_out = "";
	var context_out = "";
	var matchingYug_out = [];
	var matchingEng_out = [];

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
		const baseYugCh = dialogueList[d][12]
		const baseEng = dialogueList[d][13]
		const baseEngCh = dialogueList[d][14]
		// Ending-Yugtun	Ending-Yugtun-Choose	Ending-English	Ending-English-Choose
		const endingYug = dialogueList[d][15]
		const endingYugCh = dialogueList[d][16]
		const endingEng = dialogueList[d][17]
		const endingEngCh = dialogueList[d][18]
		// Fill-in-Blank 1	Fill-in-Blank 2	
		const fib1 = dialogueList[d][19]
		const fib2 = dialogueList[d][20]		
		// Matching-Yugtun	Matching-English
		const matchingYug = dialogueList[d][21]
		const matchingEng = dialogueList[d][22]
		// Exercise 1	Exercise 2
		const exercise1 = dialogueList[d][23]
		const exercise2 = dialogueList[d][24]
		const exercise3 = dialogueList[d][25]
		const exercise4 = dialogueList[d][26]



		const lesson = `${ch}-${lsn}-${num}`;
		var dialogue = `qaneryaurci-${ch}-${lsn}-${num}-${turn}-${per}`;
		
		if (currentLesson === "") {
			currentLesson = lesson;
		}
		else if (currentLesson !== lesson) {
			const matching = matchingYug_out.length === 1 ? [] : [matchingYug_out,matchingEng_out]
			
			lessons.push({
				"order":order_out, 
				"title":title_out, 
				"context":context_out, 
				"dialogues":lessonDialogues, 
				"exercises":lessonExercises, 
				"matching":matching});

			currentLesson = lesson;
			lessonDialogues = [];
			lessonExercises = [];
		}

		// first line in lesson
		if (turn === 1 && per === "a" && dialogue !== previousDialogue) {
			title_out = title;
			if (title_out === '') {
				title_out = `Qaneryaurci Ch${ch}-${lsn} #${num}`;
			}
			context_out = context;
			order_out = order;
			matchingYug_out = matchingYug.split(";");
			matchingEng_out = matchingEng.split(";");
		}

		if (dialogue === previousDialogue) {
			dialogue += `-${dialogueIndex}`
			dialogueIndex++;
			lessonDialogues[lessonDialogues.length-1].push(dialogue)
		} else {
			lessonDialogues.push([dialogue,])
			lessonExercises.push([exercise1,exercise2,exercise3,exercise4])
			previousDialogue = dialogue;
			dialogueIndex = 2
		}

		dialogues[dialogue] = {
			"speaker":per,
			"yup":yug,
			"eng":eng,
			"audio":audio,
			"baseYupik":baseYug,
			"baseYupikChoose":baseYugCh.split(";"),
			"baseEnglish":baseEng,
			"baseEnglishChoose":baseEngCh.split(";"),
			"endingYupik":endingYug,
			"endingYupikChoose":endingYugCh.split(";"),
			"endingEnglish":endingEng,
			"endingEnglishChoose":endingEngCh.split(";"),
			"fillinblank1":fib1,
			"fillinblank2":fib2,
		}
	}
	lessons = lessons.filter(a => a.order !== undefined)
	lessons = lessons.sort((a,b) => (a.order > b.order) ? 1 : -1);
	lessons = addHeaders(lessons)
	return {lessons, dialogues};
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

export default dialogueGenerator;

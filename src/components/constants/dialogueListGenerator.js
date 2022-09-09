


import {dialogueList} from "./dialogueList.js";

function dialogueGenerator() {
	var lessons = [];
	var dialogues = {};

	var currentLesson = "";
	var lessonDialogues = [];

	var previousDialogue = "";
	var dialogueIndex = 2

	var title_out = "";
	var context_out = "";

	for (const d in dialogueList) {
		// 0-4 Chapter	Lesson	Number	Turn	Person	
		const ch = dialogueList[d][0]
		const lsn = dialogueList[d][1]
		const num = dialogueList[d][2]
		const turn = dialogueList[d][3]
		const per = dialogueList[d][4]
		// 5-7 Yugtun	English	Audio-Full	
		const yug = dialogueList[d][5]
		const eng = dialogueList[d][6]
		const audio = dialogueList[d][7]
		// 8-12 Choose-Base	Choose-Base-Options	Choose-Ending	Choose-Ending-Options	Choose-Ending-English	
		const chBase = dialogueList[d][8]
		const chBaseOp = dialogueList[d][9]
		const chEnding = dialogueList[d][10]
		const chEndingOp = dialogueList[d][11]
		const chEndingEng = dialogueList[d][12]
		// 13-14 Fill-in-Blank 1	Fill-in-Blank 2	
		const fib1 = dialogueList[d][13]
		const fib2 = dialogueList[d][14]
		// 15-16 Title	Context
		const title = dialogueList[d][15]
		const context = dialogueList[d][16]

		const lesson = `${ch}-${lsn}-${num}`;
		var dialogue = `qaneryaurci-${ch}-${lsn}-${num}-${turn}-${per}`;
		
		if (currentLesson === "") {
			currentLesson = lesson;
		}
		else if (currentLesson !== lesson) {
			if (title_out === '') {
				title_out = `Qaneryaurci Ch${ch}-${lsn} #${num}`;
			}
			lessons.push({"title":title_out, "context":context_out, "dialogues":lessonDialogues});
			currentLesson = lesson;
			lessonDialogues = [];
		}

		// first line in lesson
		if (turn === 1 && per === "a" && dialogue !== previousDialogue) {
			title_out = title;
			context_out = context;
		}

		if (dialogue === previousDialogue) {
			dialogue += `-${dialogueIndex}`
			dialogueIndex++;
			lessonDialogues[lessonDialogues.length-1].push(dialogue)
		} else {
			lessonDialogues.push([dialogue,])
			previousDialogue = dialogue;
			dialogueIndex = 2
		}

		dialogues[dialogue] = {
			"speaker":per,
			"yup":yug,
			"eng":eng,
			"audio":audio,
			"chooseBase":chBase,
			"chooseBaseOptions":chBaseOp.split(";"),
			"chooseEnding":chEnding,
			"chooseEndingOptions":chEndingOp.split(";"),
			"chooseEndingEnglish":chEndingEng,
			"fillInBlank1":fib1,
			"fillInBlank2":fib2,
		}
	}
	return {lessons, dialogues};
}

export default dialogueGenerator;

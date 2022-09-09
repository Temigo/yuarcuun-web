


import {dialogueList} from "./dialogueList.js";
// 0-4 [Chapter,Lesson,Number,Turn,"Person",
// 5-6 "Yugtun","English",
// 7-10 "Choose-Base","Choose-Base-Options","Choose-Ending","Choose-Ending-Options",
// 11-12 "Fill-in-Blank 1","Fill-in-Blank 2",
// 13-14 "Title","Context"],



function dialogueGenerator() {
	var lessons = [];
	var dialogues = {};

	var currentLesson = "";
	var lessonDialogues = [];

	var previousDialogue = "";
	var dialogueIndex = 2

	var title = "";
	// var titleIndex = 0;
	var context = "";

	for (const d in dialogueList) {
		const lesson = `${dialogueList[d][0]}-${dialogueList[d][1]}-${dialogueList[d][2]}`;
		var dialogue = `qaneryaurci-${dialogueList[d][0]}-${dialogueList[d][1]}-${dialogueList[d][2]}-${dialogueList[d][3]}-${dialogueList[d][4]}`;
		
		if (currentLesson === "") {
			currentLesson = lesson;
		}
		else if (currentLesson !== lesson) {
			if (title === '') {
				title = `Qaneryaurci Ch${dialogueList[d][0]}-${dialogueList[d][1]} #${dialogueList[d][2]}`;
			}
			lessons.push({"title":title, "context":context, "dialogues":lessonDialogues});
			currentLesson = lesson;
			lessonDialogues = [];
		}

		// first line in lesson
		if (dialogueList[d][3] === 1 && dialogueList[d][4] === "a" && dialogue !== previousDialogue) {
			title = dialogueList[d][13];
			context = dialogueList[d][14];
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
			"yup":dialogueList[d][5],
			"eng":dialogueList[d][6],
			"speaker":dialogueList[d][4],
			"audio":dialogueList[d][6],
			"chooseBase":dialogueList[d][7],
			"chooseBaseOptions":dialogueList[d][8],
			"chooseEnding":dialogueList[d][9],
			"chooseEndingOptions":dialogueList[d][10],
			"fillInBlank1":dialogueList[d][11],
			"fillInBlank2":dialogueList[d][12],
		}
	}
	return {lessons, dialogues};
}

export default dialogueGenerator;

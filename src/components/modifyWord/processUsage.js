export const processUsage = (usage, event, data) => {
  let new_state = {};
  let res = usage;
  var rx1 = /\[([^\]]+)]/; // regex to match [text]
  var rx2 = /<([^\]]+)>/; // regex to match (text)
  let subject = usage.match(rx1);
  let object = usage.match(rx2);
  if (subject !== null) {
    res = res.split(rx1);
    new_state = {...new_state, subjectExists: true};
    if (res[1] === 'he') {
      new_state = {
        ...new_state,
        value1: "31-1(1)",
        people: 1,
        person: 3,
        text1: res[0]
      }
    } else if (res[1] === 'she') {
      new_state = {
        ...new_state,
        value1: "31-2(1)",
        people: 1,
        person: 3,
        text1: res[0]
      }
    } else if (res[1] === 'it') {
      new_state = {
        ...new_state,
        value1: "31-3(1)",
        people: 1,
        person: 3,
        text1: res[0]
      }
    } else if (res[1] === 'his') {
      new_state = {
        ...new_state,
        value1: "31-1(3)",
        people: 1,
        person: 3,
        text1: res[0],
        possessiveSubject: true
      }
    } else if (res[1] === 'they') {
      new_state = {
        ...new_state,
        value1: "33(1)",
        people: 3,
        person: 3,
        text1: res[0]
      }
    } else if (res[1] === 'they2') {
      new_state = {
        ...new_state,
        value1: "32(1)",
        people: 2,
        person: 3,
        text1: res[0]
      }
    } else if (res[1] === 'he or it') {
      new_state = {
        ...new_state,
        value1: "31-3(1)",
        people: 1,
        person: 3,
        text1: res[0]
      }
    }
    res = res[2];
  }
  if (object !== null) {
    res = res.split(rx2);
    new_state = {...new_state, objectExists: true};
    if (res[1] === 'it') {
      new_state = {
        ...new_state,
        value2_text: "it",
        value2: "31-3(2)",
        objectPeople: 1,
        objectPerson: 3,
        text2: res[0],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'her or it') {
      new_state = {
        ...new_state,
        value2_text: "it",
        value2: "31-3(2)",
        objectPeople: 1,
        objectPerson: 3,
        text2: res[0],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'him or it') {
      new_state = {
        ...new_state,
        value2_text: "it",
        value2: "31-3(2)",
        objectPeople: 1,
        objectPerson: 3,
        text2: res[0],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'them') {
      new_state = {
        ...new_state,
        value2_text: "them all (3+)",
        value2: "33(2)",
        objectPeople: 3,
        objectPerson: 3,
        text2: res[0],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'him') {
      new_state = {
        ...new_state,
        value2_text: "him",
        value2: "31-1(2)",
        objectPeople: 1,
        objectPerson: 3,
        possessiveObject: false,
        text2: res[0],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'her*') {
      new_state = {
        ...new_state,
        value2_text: "her",
        value2: "31-2(2)",
        objectPeople: 1,
        objectPerson: 3,
        possessiveObject: false,
        text2: res[0],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'them') {
      new_state = {
        ...new_state,
        value2_text: "them all (3+)",
        value2: '33(2)',
        objectPeople: 3,
        objectPerson: 3,
        possessiveObject: false,
        text2: res[0],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'its') { //possessive
      new_state = {
        ...new_state,
        value2_text: "its",
        value2: "31-3(3)",
        objectPeople: 1,
        objectPerson: 3,
        possessiveObject: true,
        text2: res[1],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'his') { //possessive
      new_state = {
        ...new_state,
        value2_text: "his",
        value2: "31-1(3)",
        objectPeople: 1,
        objectPerson: 3,
        possessiveObject: true,
        text2: res[1],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    } else if (res[1] === 'her') { //possessive
      new_state = {
        ...new_state,
        value2_text: "her",
        value2: "31-2(3)",
        objectPeople: 1,
        objectPerson: 3,
        possessiveObject: true,
        text2: res[1],
        originalText2: res[0],
        text3: res[2],
        originalText3: res[2],
      }
    }
  }
  else {
    new_state = {
      ...new_state,
      text2: res,
      originalText2: res
    }
  }
  return new_state;
};

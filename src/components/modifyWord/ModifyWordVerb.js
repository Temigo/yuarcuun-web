export const pronounEnding = (value1, pronountype) => {
  if (pronountype === 'self') {
    if (value1 === '31-1(1)') {
      return 'himself'
    } else if (value1 === '31-2(1)') {
      return 'herself'
    } else if (value1 === '31-3(1)') {
      return 'itself'
    } else if (value1 === '21(1)') {
      return 'yourself'
    } else if (value1 === '22(1)' || value1 === '23(1)') {
      return 'yourselves'
    } else if (value1 === "32(1)" || value1 === "33(1)") {
      return 'themselves'
    } else if (value1 === '11(1)') {
      return 'myself'
    } else if (value1 === '12(1)' || value1 === '13(1)') {
      return 'ourselves'
    }
  } else if (pronountype === 'possessive') {
    if (value1 === '31-1(1)') {
      return 'his'
    } else if (value1 === '31-2(1)') {
      return 'her'
    } else if (value1 === '31-3(1)') {
      return 'its'
    } else if (value1 === '21(1)') {
      return 'your'
    } else if (value1 === '22(1)' || value1 === '23(1)') {
      return 'your'
    } else if (value1 === "32(1)" || value1 === "33(1)") {
      return 'their'
    } else if (value1 === '11(1)') {
      return 'my'
    } else if (value1 === '12(1)' || value1 === '13(1)') {
      return 'our'
    }
  } else if (pronountype === 'asis') {
    if (value1 === '31-1(1)') {
      return 'he'
    } else if (value1 === '31-2(1)') {
      return 'she'
    } else if (value1 === '31-3(1)') {
      return 'it'
    } else if (value1 === '21(1)') {
      return 'you'
    } else if (value1 === '22(1)' || value1 === '23(1)') {
      return 'you all'
    } else if (value1 === "32(1)" || value1 === "33(1)") {
      return 'they'
    } else if (value1 === '11(1)') {
      return 'I'
    } else if (value1 === '12(1)' || value1 === '13(1)') {
      return 'we'
    }
  }
};

export const getsubjectis = (currentPostbases, person, tenseN, peopleN, personN, doesN) => {
  let subjectis = '';
  if (doesN==='does') {
    if (peopleN === 1 && personN === 3) {
      if (tenseN === 'past') {
        subjectis = 'did'
      } else if (tenseN === 'future') {
        subjectis = 'will'
      } else {
        subjectis = 'does'
      }
    } else {
      subjectis = 'do'
    }
  } else if (doesN==='had' && tenseN !=='future') {
    if (peopleN === 1 && personN === 3) {
      subjectis = 'had'
    } else {
      subjectis = 'have'
    }
  } else if (doesN==='has') {
    if (tenseN === 'future') {
      subjectis = 'have'
    } else if (tenseN === 'past') {
      subjectis = 'had'
    } else {
      subjectis = 'has'
    }
  } else if (doesN === 'be') {
    if (tenseN === 'future' && currentPostbases[0] !== 23) {
      subjectis = ' be'
    } else {
      subjectis = ''
    }
  } else if (doesN === 'prewho') {
    if (peopleN === 1 && person === 1) {
      subjectis = 'am'
    } else if (peopleN === 1 && personN === 3) {
      subjectis = 'is'
    } else {
      subjectis = 'are'
    }
  } else if (tenseN === 'present') {
    if (peopleN === 1 && personN === 1) {
      subjectis = 'am'
    } else if (peopleN === 1 && personN === 3) {
      subjectis = 'is'
    } else {
      subjectis = 'are'
    }
  } else if (tenseN === 'past') {
    if (peopleN === 1 && personN === 1) {
      subjectis = 'was'
    } else if (peopleN === 1 && personN === 3) {
      subjectis = 'was'
    } else {
      subjectis = 'were'
    }
  } else if (tenseN === 'future') {
    subjectis = 'will'
  }
  return subjectis
};

export const processPostbases = (currentPostbases, base, postbases, word) => {
  return currentPostbases.map((p,i) => {
    if (postbases[p].conditional_rule === 'attaching_to_te') {
      if (currentPostbases.length === 1 || currentPostbases.length === 0) {
        base = word
      } else {
        if (i !== 0) {
          base = postbases[currentPostbases[i-1]].expression
        } else {
          base = word
        }
      }
      if (base.slice(base.length-3,base.length-1)==='te') {
        return postbases[p].expression_conditional
      } else {
        return postbases[p].expression
      }
    } else {
      return postbases[p].expression
    };
  });
 };

export const pushEnding = (infinitive_new_adj, gerund_new_adj, new_adj, englishEnding, thisMood, index) => {
 if (index === 0) {///FIX THIS!!!
   if (thisMood==='i') {
     englishEnding.push(infinitive_new_adj)
   } else if (thisMood ==='g') {
     englishEnding.push(gerund_new_adj)
   } else {
     englishEnding.push(new_adj)
   }
 }
};

export const addedWord = (moodSpecific, objectExists, objectPeople, people) => {
  let added_word = '';
  if (moodSpecific==='who' && objectExists) {
    if (objectPeople === 1) {
      added_word='kina'
    } else if (objectPeople === 2) {
      added_word='kinkuk'
    } else {
      added_word='kinkut'
    }
  } else if (moodSpecific==='who') {
    if (people === 1) {
      added_word='kina'
    } else if (people === 2) {
      added_word='kinkuk'
    } else {
      added_word='kinkut'
    }
  } else if (moodSpecific==='when (in past)') {
    added_word='qangvaq'
    // newText2 = nlp(newText2).sentences().toPastTense().out()
  } else if (moodSpecific==='when (in future)') {
    added_word='qaku'
    // newText2 = nlp(newText2).sentences().toFutureTense().out()
  } else if (moodSpecific==='at where') {
    added_word='nani'
  } else if (moodSpecific==='from where') {
    added_word='naken'
  } else if (moodSpecific==='toward where') {
    added_word='natmun'
  } else if (moodSpecific==='why') {
    added_word='ciin'
  } else if (moodSpecific==='how') {
    added_word='qaillun'
  } else {
    added_word=''
  }
  return added_word;
}

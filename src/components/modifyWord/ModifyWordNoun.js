import { absolutive_endings, localis_endings, relative_endings, ablative_endings, terminalis_endings, vialis_endings, equalis_endings } from '../constants/constants_verbs.js';

export const processPostbases = (currentPostbases, base, nounPostbases) => {
  return currentPostbases.map((p) => {
    if (nounPostbases[p].conditional_rule === 'attaching_to_te') {
      if (base.slice(base.length-3,base.length-1)==='te') {
        return nounPostbases[p].expression_conditional_postbase
      } else {
        return nounPostbases[p].expression_postbase
      }
    } else {
      return nounPostbases[p].expression_postbase
    };
  });
 };

 export const isvowel = (l) => {
   if (l === 'a' || l === 'e' || l === 'i' || l === 'u') {
     return true
   } else {
     return false
   }
 };

export const returnEnding = (postbasesList, value4, possessorPerson, possessorPeople, mood) => {
  if (mood === 'absolutive') {
   return [absolutive_endings[value4][possessorPerson][possessorPeople]]
  } else if (mood === 'localis') {
   return [localis_endings[value4][possessorPerson][possessorPeople]]
  } else if (mood === 'terminalis') {
   return [terminalis_endings[value4][possessorPerson][possessorPeople]]
  } else if (mood === 'relative') {
   return [relative_endings[value4][possessorPerson][possessorPeople]]
  } else if (mood === 'equalis') {
   return [equalis_endings[value4][possessorPerson][possessorPeople]]
  } else if (mood === 'vialis') {
   if (value4 === 1 && possessorPerson === 2 && possessorPeople === 1 && postbasesList.length > 1) {
     if (isvowel(postbasesList[postbasesList.length-1][postbasesList[postbasesList.length-1].length-2])) {
       return ['-vkun']
     } else {
       return [vialis_endings[value4][possessorPerson][possessorPeople]]
     }
   } else if (value4 === 1 && possessorPerson === 2 && possessorPeople === 1 && postbasesList.length === 0) {
     if (isvowel(this.state.currentWord[this.state.currentWord.length-1])) {
       return ['-vkun']
     } else {
       return [vialis_endings[value4][possessorPerson][possessorPeople]]
     }
   } else {
     return [vialis_endings[value4][possessorPerson][possessorPeople]]
   }
  } else if (mood === 'ablative') {
   return [ablative_endings[value4][possessorPerson][possessorPeople]]
  }
};

export const getsubjectis = (does, people, person) => {
  let subjectis = '';
  if (does) {
    if (people === 1 && person === 3) {
      subjectis = 'has'
    } else {
      subjectis = 'have'
    }
  } else {
    if (people === 1 && person === 1) {
      subjectis = 'am'
    } else if (people === 1 && person === 3) {
      subjectis = 'is'
    } else {
      subjectis = 'are'
    }
  }
  return subjectis
};

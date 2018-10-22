import { options1, options2, options3 } from './constants.js';

export const removeCombos = (dict1, dict2, dict3, verb, value1, value2, mood, possessiveObject, objectExists) => {
  for (var i = 0; i < 14; i++) { // this portion of the code is meant to remove options that are not possible in subject/object combos
    let flag1 = false;
    let flag2 = false;
    if (verb === false) {
      if (options1[i].value[0]!=4) { //subject 4th person not allowed
        dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
      }
      dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text});
    } else if (mood == 'indicative' || mood == 'subordinative') {
      if (value1[0]=='1' && options2[i].value[0]=='1' || value1[0]=='2' && options2[i].value[0]=='2') { //process options2 and options3 first
        flag1 = true
      }
      if (options2[i].value[0]!=4) { //object 4th person not allowed
        if (possessiveObject) {
          dict2.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
        } else {
          dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
        }
      }
      if (value2[0]=='1' && options1[i].value[0]=='1' || value2[0]=='2' && options1[i].value[0]=='2') { //process options1 next
        flag2 = true
      }
      if (mood == 'subordinative') {
        if (options1[i].value[0]!=3) { //subject 3rd person not allowed
          dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
        }
      } else {
        if (options1[i].value[0]!=4) { //subject 4th person not allowed
          dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
        }
      }
    } else if (mood == 'optative') {
      if (value1[0]=='1' && options2[i].value[0]=='1' || value1[0]=='2' && options2[i].value[0]=='2') { //process options2 and options3 first
        flag1 = true
      }
      if (options2[i].value[0]!=4) { //object 4th person not allowed
        if (possessiveObject) {
          dict2.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
        } else {
          dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
        }
      }
      if (options3[i].value[0]!=4) { //object 4th person not allowed for possessive form
        dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
      }
      if (value2[0]=='1' && options1[i].value[0]=='1' || value2[0]=='2' && options1[i].value[0]=='2') { //process options1 next
        flag2 = true
      }
      if (options1[i].value[0]!=4) { //subject 4th person not allowed
        dict1.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag2});
      }
    } else if (mood == 'interrogative') {
      if (objectExists) {
        if (value1[0]=='1' && options2[i].value[0]=='1' || value1[0]=='2' && options2[i].value[0]=='2'){ //process options2 and options3 first
          flag1 = true
        }
        if (options2[i].value[0]!=4) { //object 4th person not allowed
          if (possessiveObject) {
            dict2.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
          } else {
            dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
          }
        }
        if (options3[i].value[0]!=4) { //object 4th person not allowed for possessive form
          dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
        }
        if ((value2[0]=='1' && options1[i].value[0]=='1' || value2[0]=='2' && options1[i].value[0]=='2') || options1[i].value[0]=='1')  { //process options1 next
          flag2 = true
        }
        if (options1[i].value[0]!=4) { //subject 4th person not allowed
          dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
        }
      } else {
        if (options1[i].value[0]!=4) { //subject 4th person not allowed
          dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
        }
      }
    } else { //all connective moods
      if ((value1[0]=='1' && options2[i].value[0]=='1') || (value1[0]=='2' && options2[i].value[0]=='2') || (value1[0]=='4' && options2[i].value[0]=='4')) { //process options2 and options3 first
        flag1 = true
      }
      if (possessiveObject) {
        dict2.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
      } else {
        dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
      }
      dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
      if ((value2[0]=='1' && options1[i].value[0]=='1') || (value2[0]=='2' && options1[i].value[0]=='2') || (value2[0]=='4' && options1[i].value[0]=='4')) { //process options1 next
        flag2 = true
      }
      dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
    }
  }
};

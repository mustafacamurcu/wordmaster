import words from './words'

var englishSet = new Set(require('an-array-of-english-words'));
var popularSet = new Set(words.filter(word => word.length > 3 && word.length < 9));

const Levels = [
  {
    explanation: "starts with 'a'.",
    number: 0,
    isCorrect: word => word[0] == 'a',
    correctsRequired: 5
  },
  {
    explanation: "longer than 5 characters.",
    number: 1,
    isCorrect: word => word.length > 5,
    correctsRequired: 5
  },
  {
    explanation: "doesn't have 'e'.",
    number: 2,
    isCorrect: word => !(new Set(word.split('')).has('e')),
    correctsRequired: 5
  },
  {
    explanation: "all unique letters.",
    number: 3,
    isCorrect: word => word.length == new Set(word.split('')).size,
    correctsRequired: 7
  },
  {
    explanation: "starts with 'a'.",
    number: 4,
    isCorrect: word => popularSet.has(word.split('').reverse().join('')) && word.length > 4,
    correctsRequired: 7
  },
];

export default Levels;

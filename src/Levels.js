import popularWords from './words'

// var englishSet = new Set(require('an-array-of-english-words'));
var popularSet = new Set(popularWords);

var vowels = new Set('aeiou'.split(''));
var consonants = new Set('bcdfghjklmnpqrstvwxyz'.split(''));
var holes = new Set('abdegopq'.split(''));

const Levels = [
  {
    explanation: "longer than 5 characters",
    number: 0,
    isCorrect: word => word.length > 5,
    progressWord: 'newbie',
    isValid: word => word.length >= 3 && word.length <= 8 && word.length !== 5
  },
  {
    explanation: "starts with a wovel",
    number: 1,
    isCorrect: word => new Set('aeiou').has(word[0]),
    progressWord: 'novice',
    isValid: word => word.length >= 4 && word.length <= 8
  },
  {
    explanation: "no 'e' allowed",
    number: 2,
    isCorrect: word => !(new Set(word.split('')).has('e')),
    progressWord: 'starter',
    isValid: word => word.length > 5 && word.length <= 8
  },
  {
    explanation: "all unique letters",
    number: 3,
    isCorrect: word => word.length === new Set(word.split('')).size,
    progressWord: 'trainee',
    isValid: word => word.length > 5 && word.length <= 8
  },
  {
    explanation: "adjacent vowels",
    number: 4,
    isCorrect: word => word.match(/[aeiou]{2,}/),
    progressWord: 'student',
    isValid: word => word.length >= 5 && word.length <= 8
  },
  {
    explanation: "reversable",
    number: 5,
    isCorrect: word => popularSet.has(word.split('').reverse().join('')),
    progressWord: 'recruit',
    isValid: word => word.length === 3
  },
  {
    explanation: "still a word without first letter",
    number: 6,
    isCorrect: word => popularSet.has(word.slice(1)),
    progressWord: 'disciple',
    isValid: word => word.length === 6
  },
  {
    explanation: "three consonants in a row",
    number: 7,
    isCorrect: word => word.match(/[b-df-hj-np-tv-z]{3,}/),
    progressWord: 'graduate',
    isValid: word => word.length > 5 && !new Set(word.slice('')).has('y')
  },
  {
    explanation: "equal number of vowels and consonants",
    number: 8,
    isCorrect: word => word.split('').filter(l => consonants.has(l)).length === word.split('').filter(l => vowels.has(l)).length,
    progressWord: 'apprentice',
    isValid: word => word.length > 3
  },
  {
    explanation: "no holes",
    number: 9,
    isCorrect: word => word.split('').filter(l => holes.has(l)).length === 0,
    progressWord: 'wordmaster',
    isValid: word => word.length === 6 && !new Set(word.slice('')).has('y')
  },
];

export default Levels;

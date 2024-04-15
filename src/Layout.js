import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';

import Kart from "./Kart"
import Row from "./Row"
import popularWords from './words'

const Layout = ({ level }) => {
  const [words, setWords] = useState([]);
  const [addedWords, setAddedWords] = useState([]);
  const [progressMask, setProgressMask] = useState(new Array(level.progressWord.length).fill(false));
  const [win, setWin] = useState(false);

  const renderCorrectEntries = (addedWords) => {
    return renderEntries(addedWords.filter((word) => level.isCorrect(word)), true);
  }

  const renderWrongEntries = (addedWords) => {
    return renderEntries(addedWords.filter((word) => !level.isCorrect(word)), false);
  }

  const renderEntries = (addedWords, isCorrect) => {
    return addedWords.slice(0, 20).map((word) => {
      return <Row key={word} word={word} isCorrect={isCorrect} > </Row >
    });
  }

  // const checkBox = <CheckBoxIcon fontSize="inherit" style={{ fontSize: 100, color: "green" }} />;
  // const emptyBox = <CheckBoxOutlineBlankIcon fontSize="inherit" style={{ fontSize: 100 }} />;

  // const checkA = <span style={{ fontSize: 100, color: "green" }}>A</span>
  // const emptyA = <span style={{ fontSize: 100 }}>A</span>;

  const renderProgress = (progressMask) => {
    return level.progressWord.split('').map((letter, i) =>
      !progressMask[i] ?
        <span key={i}
          style={{
            lineHeight: .8,
            letterSpacing: 15,
            fontSize: 150,
            fontWeight: 600,
            fontFamily: "Sedan",
            color: "grey",
          }
          } >
          {letter}
        </span >
        :
        <span key={i}
          style={{
            lineHeight: .8,
            fontSize: 150,
            letterSpacing: 15,
            fontWeight: 600,
            fontFamily: "Sedan",
            color: "MediumSeaGreen"
          }} >
          {letter}
        </span >);
  };

  // const renderProgress = (progressMask) => {
  //   let ticks = new Array(progress).fill(checkA);
  //   let empties = new Array(Math.max(level.correctsRequired - progress, 0)).fill(emptyA);
  //   return ticks.concat(empties);
  // };

  // NOT EFFICIENT - FIX FOR PERFORMANCE IF NECESSARY
  const randomWord = () => popularWords.filter(level.isValid)[Math.floor(Math.random() * (popularWords.filter(level.isValid).length - 1))];

  const randomWordPair = () => Math.random() > 0.5 ? [randomCorrectWord(), randomWrongWord()] : [randomWrongWord(), randomCorrectWord()];

  const randomCorrectWord = () => {
    let cnt = 10000;
    let skip = 100;
    while (cnt) {
      let rw = randomWord();
      if (new Set(addedWords).has(rw) && skip > 0) {
        skip--;
        continue;
      }
      if (level.isCorrect(rw)) {
        console.log(cnt);
        return rw;
      }
      cnt--;
    }
  }

  const randomWrongWord = () => {
    let cnt = 10000;
    let skip = 100;
    while (cnt) {
      let rw = randomWord();
      if (new Set(addedWords).has(rw) && skip > 0) {
        skip--;
        continue;
      }
      if (!level.isCorrect(rw)) {
        return rw;
      }
      cnt--;
    }
  }

  if (words.length === 0) setWords(randomWordPair());

  const addToAddedWords = (word) => {
    let tempWords = [...addedWords];
    var index = tempWords.indexOf(word);
    if (index !== -1) {
      tempWords.splice(index, 1);
    }
    setAddedWords([word, ...tempWords]);
  }



  const updateProgress = (word) => {
    if (level.isCorrect(word)) {
      if (progressMask.filter((a) => !a).length === 1) {
        setWin(true);
      }
      let cnt = 1000;
      while (cnt) {
        let randIndex = Math.floor(Math.random() * progressMask.length);
        if (!progressMask[randIndex]) {
          setProgressMask([...progressMask.slice(0, randIndex), true, ...progressMask.slice(randIndex + 1)])
          break;
        }
        cnt--;
      }
    } else {
      setProgressMask(Array(level.progressWord.length).fill(false));
    }
  }

  const clicked = (word) => {
    updateProgress(word);
    addToAddedWords(word);
    setWords(randomWordPair());
  };

  const renderCards = (words) => words.map(
    word =>
      <Kart key={word} word={word} clicked={clicked}></Kart>
  );

  return (
    <Box style={{ marginTop: "20px" }}>
      <Typography style={{ color: "grey", fontSize: "50px" }}>
        Training for:
      </Typography>
      <Stack direction="row" justifyContent="center">
        {renderProgress(progressMask)}
      </Stack>
      <Divider />
      {win ?
        <Box style={{ padding: "30px" }}>
          <Typography style={{ fontWeight: 500, fontSize: 60, letterSpacing: "2px", color: "green", lineHeight: "1" }} >
            well done!
            <br />
            you found the pattern:
            <br />
            <span style={{ fontSize: 150, fontWeight: 600, color: "black" }}>
              {level.explanation}
            </span>
            <br />
            <a href={"/" + (level.number + 1)}>
              <span
                style={{ fontSize: 100, color: "red" }}>
                next training?
              </span>
            </a>
          </Typography>
        </Box>
        :
        <Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
          {renderCards(words)}
        </Stack >
      }
      <Divider orientation='horizontal' />
      <Stack direction="row" justifyContent="space-evenly">
        <Stack direction="column">
          <Typography variant='h3' style={{ fontWeight: 600, color: "DarkGreen" }}>
            beautiful words
          </Typography>
          <Divider />
          <Stack direction="column" useFlexGap flexWrap="wrap" maxHeight={420} maxWidth={350}>
            {renderCorrectEntries(addedWords)}
          </Stack>
        </Stack>
        <Divider orientation='vertical' flexItem />
        <Stack direction="column">
          <Typography variant='h3' style={{ fontWeight: 600, color: "Maroon" }}>
            unpleasant words
          </Typography>
          <Divider />
          <Stack direction="column" useFlexGap flexWrap="wrap" maxHeight={420} maxWidth={350}>
            {renderWrongEntries(addedWords)}
          </Stack>
        </Stack>
      </Stack >

    </Box >
  );
}

export default Layout;
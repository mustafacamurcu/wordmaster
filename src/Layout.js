import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Kart from "./Kart"
import Row from "./Row"
import { words } from 'popular-english-words'
import { Typography } from '@mui/material';

const popularWords = words.getMostPopularFilter(10000, word => word.length > 3 && word.length < 9);

const Layout = ({ level }) => {
  const [words, setWords] = useState([]);
  const [addedWords, setAddedWords] = useState([]);
  const [progress, setProgress] = useState(0);
  const [win, setWin] = useState(false);

  const renderCorrectEntries = (addedWords) => {
    return renderEntries(addedWords.filter((word) => level.isCorrect(word)), true);
  }

  const renderWrongEntries = (addedWords) => {
    return renderEntries(addedWords.filter((word) => !level.isCorrect(word)), false);
  }

  const renderEntries = (addedWords, isCorrect) => {
    return addedWords.slice(0, 36).map((word) => {
      return <Row word={word} isCorrect={isCorrect} > </Row >
    });
  }

  const checkBox = <CheckBoxIcon fontSize="inherit" style={{ fontSize: 50, color: "green" }} />;
  const emptyBox = <CheckBoxOutlineBlankIcon fontSize="inherit" style={{ fontSize: 50 }} />;

  const renderProgress = (progress) => {
    let ticks = new Array(progress).fill(checkBox);
    let empties = new Array(Math.max(level.correctsRequired - progress, 0)).fill(emptyBox);
    return ticks.concat(empties);
  };

  const randomWord = () => popularWords[Math.floor(Math.random() * (popularWords.length - 1))];

  const randomCorrectWord = () => {
    while (true) {
      let rw = randomWord();
      if (level.isCorrect(rw) && !addedWords.find(w => w == rw)) {
        return rw;
      }
    }
  }

  const randomWrongWord = () => {
    while (true) {
      let rw = randomWord();
      if (!level.isCorrect(rw) && !addedWords.find(w => w == rw)) {
        return rw;
      }
    }
  }

  if (words.length == 0) setWords(Math.random() > 0.5 ? [randomCorrectWord(), randomWrongWord()] : [randomWrongWord(), randomCorrectWord()]);

  const clicked = (word) => {
    if (level.isCorrect(word)) {
      if (progress == level.correctsRequired - 1) {
        setWin(true);
      }
      setProgress(progress + 1);
    } else {
      setProgress(0);
    }
    setAddedWords([word, ...addedWords]);
    setWords(Math.random() > 0.5 ? [randomCorrectWord(), randomWrongWord()] : [randomWrongWord(), randomCorrectWord()]);
  };

  const renderCards = (words) => words.map(
    word =>
      <Kart word={word} clicked={clicked}></Kart>
  );


  return (
    <Box style={{ marginTop: "20px" }}>
      {win ?
        <Typography style={{ fontWeight: 500, fontSize: 30, letterSpacing: "2px", color: "green", lineHeight: "1" }} >
          well done!
          <br />
          you found the pattern:
          <br />
          <span style={{ fontSize: 80, fontWeight: 600, color: "black" }}>
            {level.explanation}
          </span>
          <br />
          <a href={"/" + (level.number + 1)}>
            <span style={{ color: "red" }}>another?</span>
          </a>
        </Typography>
        :
        <Stack direction="row" justifyContent="space-evenly">
          {renderCards(words)}
        </Stack >
      }

      <Stack direction="row" justifyContent="center" margin="20px">
        {renderProgress(progress)}
      </Stack>
      <Stack direction="row" justifyContent="space-evenly">
        <Stack direction="column" useFlexGap flexWrap="wrap" maxHeight={400} maxWidth={300}>
          {renderCorrectEntries(addedWords)}
        </Stack>
        <Stack direction="column" useFlexGap flexWrap="wrap" maxHeight={400} maxWidth={300}>
          {renderWrongEntries(addedWords)}
        </Stack>
      </Stack >

    </Box >
  );
}

export default Layout;
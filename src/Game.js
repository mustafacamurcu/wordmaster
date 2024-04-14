import './App.css';
import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import Layout2 from "./Layout"
import Levels from "./Levels"

function Game() {
  const level = Math.min(useLoaderData(), Levels.length);

  const dec2bin = (dec) => {
    return (dec >>> 0).toString(2);
  }
  const title = (level) => {
    let mask = dec2bin(level).split('');
    let fullmask = new Array(10 - mask.length).fill(0).concat(mask);
    let t = "wordmaster".split('').map((letter, i) =>
      fullmask[i] == 0 ?
        letter
        :
        <span
          style={{ color: "#EFBC9B" }} >
          {letter}
        </span >);
    console.log(t);
    return t;
  };

  return (
    <div style={{ textAlign: "center", display: "grid" }}>
      <Box>
        <Typography style={{ fontWeight: 400, fontSize: 180, letterSpacing: "-20px", color: "#FBF3D5", lineHeight: ".75" }} >
          {title(level)}
        </Typography>
        <Typography style={{ fontWeight: 500, fontSize: 30, letterSpacing: "2px", color: "#FBF3D5", lineHeight: "1" }} >
          find the pattern
        </Typography>
        <br></br>
        <Divider />
        <Layout2 level={Levels[level]} />
      </Box >
    </div >
  );
}

export default Game;

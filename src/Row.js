import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const Row = ({ word, isCorrect, count }) => {

  return (
    <>
      <Typography variant="h5">
        <Stack direction="row" spacing={2} justifyContent="center">
          <span style={{
            width: 100,
            textAlign: "left",
            marginRight: 30,
            color: isCorrect ? "green" : "red"
          }}>{word}</span>
        </Stack>
      </Typography >
    </>
  )
}

export default Row;
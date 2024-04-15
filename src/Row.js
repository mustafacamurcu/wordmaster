import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Row = ({ word, isCorrect, count }) => {

  return (
    <>
      <Typography variant="h4">
        <Stack direction="row" spacing={2} justifyContent="center">
          <span style={{
            width: 180,
            textAlign: "center",
            color: isCorrect ? "green" : "red"
          }}>{word}</span>
        </Stack>
      </Typography >
    </>
  )
}

export default Row;
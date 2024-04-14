import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(() => ({
  width: 350,
  alignContent: "center",
  height: 160,
  backgroundColor: "#9CAFAA",
  borderRadius: 16,
}));

const StyledTypography = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 75,
  color: "#EFBC9B",
  letterSpacing: "-2px",
}));



const Kart = ({ word, clicked }) => {

  return (
    <>
      <StyledCard onClick={() => clicked(word)} color={"#203f52"} variant="elevation">
        <CardContent>
          <StyledTypography variant="h1" component="div">
            {word}
          </StyledTypography>
        </CardContent>
      </StyledCard >
    </>
  )
}

export default Kart;
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(() => ({
  width: 800,
  alignContent: "center",
  height: 350,
  backgroundColor: "#EFBC9B",
  borderRadius: 16,
  margin: 20
}));

const StyledTypography = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 180,
  color: "#8CAF9A",
  letterSpacing: "-7px",
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
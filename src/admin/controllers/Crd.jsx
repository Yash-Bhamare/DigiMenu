import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import axios from "axios"
import { useState, useEffect } from "react"
import "./Crd.css" 

export default function Crd() {

const [mcnt, setMcnt] = useState(0);//Hooks //var
const [fcnt, setFcnt] = useState(0);
const [qcnt, setQcnt] = useState(0);

  function cntapi() {
    axios.get("http://localhost:3000/cnt")
      .then(response => {
        setMcnt(response.data.menu_cnt);
        setFcnt(response.data.foodcat_cnt);
        setQcnt(response.data.qty_cnt);
        //console.log(ar)
      })
  }

  useEffect(() => { //onload()
    cntapi();
  }, [])//

  const cards = [
  {
    id: 1,
    title: 'Total Menu',
    description: <h2 id="t">{mcnt}</h2>,
  },
  {
    id: 2,
    title: 'Total Category',
    description: <h2 id="t">{fcnt}</h2>,
  },
  {
    id: 3,
    title: 'Total Quntity ',
    description:  <h2 id="t">{qcnt}</h2>,
  },
];
const [selectedCard, setSelectedCard] = React.useState(0);
  return (
  
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))',
        gap: 2,
      }}
    >
      <center/>
      {cards.map((card, index) => (
       <Card id="b" key={index}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }} >
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" id="t">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}


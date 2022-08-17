import React from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../../resources/stormbreaker-min.jpg'
import fastjep from '../../resources/fastjep-min.jpg'
import redjep from '../../resources/redjep.jpeg'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Jepai({diff,onClick}){
  return(
    <Button
      disableElevation
      sx={{
        borderRadius: '50%',
        width: '70px',
        aspectRatio: 1,
      }}
      variant="contained"
      color={diff ? "greyLight" : "greenLight"}
      onClick={onClick}
    >
      <img
        src={logo}
        alt='jorj'
        style={{
          width: '60px',
          borderRadius: '50%',
          aspectRatio: 1
        }}
        draggable="false"
      />
    </Button>
  )
}

export function FastJepai({diff, onClick}){
  return(
    <Button
      disableElevation
      sx={{
        borderRadius: '50%',
        width: '70px',
        aspectRatio: 1,
      }}
      variant="contained"
      color={diff ? "greyLight" : "yellowLight"}
      onClick={onClick}
    >
      <img
        src={fastjep}
        alt='jorj'
        style={{
          width: '60px',
          borderRadius: '50%',
          aspectRatio: 1
        }}
        draggable="false"
      />
    </Button>
  )
}

export function RedJepai({diff, onClick}) {
  return(
    <Button
      disableElevation
      sx={{
        borderRadius: '50%',
        width: '70px',
        aspectRatio: 1,
      }}
      variant="contained"
      color={diff ? 'greyLight' : "third"}
      // color="transparent"
      onClick={onClick}
    >
      <img
        src={redjep}
        alt='jorj'
        style={{
          width: '60px',
          borderRadius: '50%',
          aspectRatio: 1
        }}
        draggable="false"
      />
    </Button>
  )
}

function GamePlay() {
  return (
    <div>
      <Container maxWidth="sm">
        <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center',
        }}        
        >
          <Jepai/>
          <Typography
            variant='body1'
            color="primary"
            align="center"
            sx={{
              mb: 1,
            }}
          >
            Tap green Jepais to get points. No penalty is given if a green Jepai is not tapped. Disappears in 1 second.
          </Typography>
        </Box>
        <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center'
        }}        
        >
          <FastJepai/>
          <Typography
            variant='body1'
            color="primary"
            align="center"
            sx={{
              mb: 1
            }}
          >
            Tap yellow Jepais to get more points. Game is over if a yellow Jepai is <b>not tapped</b>. Disappears in 1 second. 
          </Typography>
        </Box>
        <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center'
        }}        
        >
          <RedJepai/>
          <Typography
            variant='body1'
            color="primary"
            align="center"
            sx={{
              mb: 1
            }}
          >
            Don't tap red Jepais. Game is over if a red Jepai is <b>tapped</b>. Disappears in 1 second.
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

export default GamePlay
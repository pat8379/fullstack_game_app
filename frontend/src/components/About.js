import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


function About() {
  return (
    <div>
      <Container
        maxWidth='sm'
      >
        <Typography
          variant='body1'
          sx={{my: 1}}
          color="primary"
        >
        A simple game app made with React and Material UI. 
          
        </Typography>
        <Typography
          variant='body1'
          sx={{my: 1}}
          color="primary"

        >
          The app utilizes Node.js for the backend along with multiple authorization techniques using Passport local and OAuth.
        </Typography>
        <Typography
          variant='body1'
          sx={{my: 1}}
          color="primary"

        >
          User data such as credentials and highscores are stored in a MongoDB database. 
        </Typography>
        <Typography
          variant='body1'
          sx={{my: 1}}
          color="primary"

        >
          All passwords are encrypted with bcrypt.js.
        </Typography>
        <Typography
          variant='body1'
          sx={{mt: 3}}
          align="center"
          color="primary"

        >
          Source code in GitHub
        </Typography>
        <Box
        sx={{
          display: "flex",
          flexDirection: 'row',
          justifyContent: "center",
          
        }}>
          <IconButton color="primary">
            <Link href="https://github.com/pat8379/fullstack_game_app" target="_blank">
              <GitHubIcon sx={{fontSize: '40px'}}/>
            </Link>
          </IconButton>
        </Box>
      </Container>
    </div>
  )
}

export default About
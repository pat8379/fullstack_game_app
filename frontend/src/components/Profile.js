import { Container } from '@mui/system'
import React from 'react'
import GamePlay from './gamePlay/GamePlay'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, selectUser } from '../features/userSlice';
import { selectUserState } from '../features/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';

function Profile() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectUserState).isLoading
  const handleLogOut = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST'
      })   
      // console.log(results)
      dispatch(addUser())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container
      sx={{
        mt:1,
        // border: '1px solid black'
      }}
      maxWidth='md'
    >
      <Typography
        align='center'
        variant="h5"
        color="primary"
        sx={{
          mb: 1,
        }}
      >
        Welcome to Tap the Jepai
      </Typography>
      <Typography
        variant='body1'
        color="primary"
        align="center"
        sx={{
          mb: 1,
        }}
      >
        Press the Play button to play the game.
      </Typography>
      <Typography
        variant='body1'
        color="primary"
        align="center"
        sx={{
          mb: 1,
        }}
      >
        <Link to={'/login'}>Login</Link> to keep track of your high score and compare with other users.
      </Typography>
      <Typography
        variant='body1'
        color="primary"
        align="center"
        sx={{
          mb: 1,
        }}
      >
        Visit Leaderboard to see where your high score stands among other users.
      </Typography>
      <Typography
        variant='body1'
        color="primary"
        align="center"
        sx={{
          mb: 2,
        }}
      >
        Visit About for more details on the code.
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Link to={'/play'} style={{
          color: "#ffffff",
          textDecoration: 'none'
        }}
        >
          <Button
            variant='contained'
            color='third'
            disableElevation
            sx={{
              mb: 2,
              mx: 1
            }}
          >
          Play 
          </Button>
        </Link>
        <Link to={'/login'} style={{
          color: "#ffffff",
          textDecoration: 'none'
        }}>
          <Button 
                align='center'
                variant="contained"
                color="primary"
                disableElevation
                startIcon={<LoginIcon/>}
                sx={{
                    mb: 2,
                    mx:1 ,
                    color: 'white'
                }}
            >Login</Button>
        </Link>
      </Box>
      {isLoading && 
      <Typography
        align='center'
        variant='body1'
        color='third'
      >
        Loading
      </Typography>}
      <Typography
        align="center"
        variant="body1"
        color="third"
        sx={{
          mb: 1,
        }}
      >
        Username: {user ? (user.username || user.displayName) : 'not logged in'} <br/> High Score: {user ? user.score : 'not logged in'}
      </Typography>
      {user && 
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 2
      }}>
        <Button
          align="center"
          variant='contained'
          color='primary'
          disableElevation
          onClick={handleLogOut}
          startIcon={<LogoutIcon/>}
        >
          Logout
        </Button>
      </Box>
      }
      <Typography
        align='center'
        variant="h5"
        color="primary"
        sx={{
          mb: 1,
          pt: 1,
          borderTop: '1.5px solid #e0e0e0'
        }}
      >
        How to Play
      </Typography>
      <GamePlay/>
    </Container>
  )
}

export default Profile
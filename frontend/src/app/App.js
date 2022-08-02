import './App.css';
import { Outlet,useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'




function App() {
  let navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname)

  // console.log(location.pathname)

  return (
    <div className="App">
      <Container component="main" maxWidth="xs" 
      >
        <Typography
        variant='h2'
        color="primary.main"
        component="h1"
        sx={{
          
          textAlign: "center",
          // maxWidth: "230px"
        }}
        
        >Poke the Jepai</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',
         display: "flex",
         flexDirection: 'row',
         justifyContent: "center"
        }}>
          <Button
          onClick={() => {
            setValue('/')
            navigate('/')
          }}
          sx={{
            px: 2,
            py: 1,
            borderRadius: 0,
            borderBottom: value === '/' ? '2px solid black' : '2px solid transparent'
          }}>
            Home
          </Button>
          <Button
          onClick={() => {
            setValue('/leaderboard')
            navigate('/leaderboard')
          }}
          sx={{
            px: 2,
            py: 1,
            borderRadius: 0,
            borderBottom: value === '/leaderboard' ? '2px solid black' : '2px solid transparent'
          }}>
            LeaderBoard
          </Button>
          <Button
          onClick={() => {
            setValue('/about')
            navigate('/about')
          }}
          sx={{
            px: 2,
            py: 1,
            borderRadius: 0,
            borderBottom: value === '/about' ? '2px solid black' : '2px solid transparent'
          }}>
            About
          </Button>
        </Box>
        <Outlet/>
      </Container>
    </div>
  );
}

export default App;

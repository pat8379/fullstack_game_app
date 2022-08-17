import './App.css';
import { Outlet,useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, addUser, startLoading, stopLoading } from '../features/userSlice';


function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const location = useLocation();
  const [value, setValue] = useState(location.pathname)

  useEffect(() => {
    if (user) {
      return
    }
    const fetchData = async () => {
      dispatch(startLoading())
      try {
        const data = await fetch('/api/users/info')
        const result = await data.json()
        dispatch(stopLoading())
        if (data.status === 200) {
          dispatch(addUser(result))
        }        
      } catch (error) {
        dispatch(stopLoading())
        console.log(error)
      }
      return
    }

    fetchData()
    // console.log('app load')
  }, [])

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
        
        >Tap the Jepai</Typography>
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
      </Container>
      <Outlet/>
    </div>
  );
}

export default App;

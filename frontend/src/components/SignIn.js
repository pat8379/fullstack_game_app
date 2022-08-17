import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom'
import Switch from '@mui/material/Switch';
import HomeIcon from '@mui/icons-material/Home';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser } from '../features/userSlice';


export default function SignIn() {
  let navigate = useNavigate();
  let user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [username2,setUsername2] = useState('')
  const [password2, setPassword2] = useState('')
  const [errMsg, setErrMsg] = useState()
  const [errMsg2, setErrMsg2] = useState()
  const [newUser, setNewUser] = useState(false)

  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const [showPass,setShowPass] = useState(false)
  const [showPass2,setShowPass2] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      if (!password){
        return setErrMsg('* Fill in Username and Password *')
      } else {
        return setErrMsg('* Fill in Username *')
      }
    } else {
      if (!password){
        return setErrMsg('* Fill in Password *')
      } else {
        setErrMsg('')
      }
    }
    
    setLoading(true)

    try {
      const body = {
        username: username,
        password: password.toString()
      }

      const results = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })


      setLoading(false)
      if (results.status !== 200) {
        setErrMsg('User not found or incorrect password')
        return
      }
      const jsonResult = await results.json()
      if (user) {
        dispatch(addUser(jsonResult))
      }
      // console.log(results)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    // console.log('first')

  };

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!username2) {
      if (!password2){
        return setErrMsg2('* Fill in Username and Password *')
      } else {
        return setErrMsg2('* Fill in Username *')
      }
    } else {
      if (!password2){
        return setErrMsg2('* Fill in Password *')
      } else {
        setErrMsg2('')
      }
    }

    setLoading2(true)

    try {
      const body = {
        username: username2,
        password: password2.toString()
      }

      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const results = await response.json()

      if (results.message) {
        setLoading2(false)
        setErrMsg2('Username already exists')
        return
      }

      const results1 = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      setLoading2(false)
      if (results1.status !== 200) {
        setErrMsg2('User not found or incorrect password')
        return
      }
      const jsonResult1 = await results1.json()

      if (user) {
        dispatch(addUser(jsonResult1))
      }

      navigate('/')
    } catch (error) {
      setLoading2(false)
      console.log(error)
    }
  }

  return (
    <div style={{backgroundColor: '#feffe6'}}>
      <Container component="main" maxWidth="xs" 
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            mx: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 240,
            // border: "1px solid black"
          }}
        >
          <Grid 
            container
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LoginIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
          </Grid>  
          <Box component="form" onSubmit={handleSubmit} fullWidth noValidate sx={{
             mt: 1 ,
             borderBottom: "1px solid grey",
            //  display: 'flex',
            //  flexDirection: 'column',
            //  alignItems: 'center',
            //   minWidth: 240,
             }}
          >
            <TextField
              margin="normal"
              required
              value={username} onChange={(e) => setUsername(e.target.value)}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              color="secondary"
              inputProps={{maxLength: 20}}
              sx={{borderColor: 'light.main'}}
            />
            {username.length === 20 && 
              <Typography
                variant="body2"
                align= "center"
                sx={{
                  color:"rgba(0, 0, 0, 0.6)",
                  mb: -1,
                  // border: "1px solid black"

                }}
                fullWidth
              >* Max characters reached *</Typography>
            }
            <TextField
              margin="normal"
              required
              value={password} onChange={(e) => setPassword(e.target.value)}
              fullWidth
              name="password"
              label="Password"
              type={showPass ? 'text' : 'password'}
              id="password"
              color='secondary'
            />
            <Grid 
            container
            justifyContent="center"
            alignItems="center"
            >
              <Typography
                variant="body2"
                sx={{
                  color:"rgba(0, 0, 0, 0.6)",
                }}
              >
                Show Password
              </Typography>
              <Switch defaultChecked={false} onChange={() => setShowPass(prev => !prev)}/>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2}}
            >
              Login
            </Button>
            {loading && 
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <CircularProgress color='primary'/>
            </Box>}
            {errMsg && 
              <Typography
                variant="body2"
                align= "center"
                sx={{
                  color:"rgba(0, 0, 0, 0.6)",
                  mt: -1,
                  mb: 1,
                  // border: "1px solid black"
                }}
                fullWidth
              >{errMsg}</Typography>
            }
            <Button 
             startIcon={<GoogleIcon/>}
             variant="contained"
             color="third"
             sx={{color: "#ffffff",
                mb: 2
              }}
             fullWidth
             href="http://localhost:5001/auth/google"
            >
                Login with Google
            </Button>
          </Box>
          <Typography
            variant='body2'
            sx={{
              color:"rgba(0, 0, 0, 0.6)",
              mt: 1
            }}
          >
            or if you are a new user
          </Typography>
          <Box
            sx={{
              mx: 1,
              // border: "1px solid black"
            }}
          >
            <Button
            fullWidth
            variant="outlined"
            startIcon={<ArrowDropDownIcon/>}
            sx={{ mt: 1, mb: 1}}
            onClick={() => {
              setNewUser(prev => !prev)
              // myRef.scrollIntoView()
              // executeScroll()
            }}
            >
              Create Account
            </Button>
          </Box>

          { newUser &&
          <>
            <Grid 
              container
              justifyContent="center"
              alignItems="center"
              // sx={{border: "1px solid black"}}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <PersonAddAlt1Icon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign Up
              </Typography>
            </Grid>  
            <Box component="form" onSubmit={handleSignUp} fullWidth noValidate sx={{
              mt: 1 ,
              // borderBottom: "1px solid grey"
              }}
            >
              <TextField
                margin="normal"
                required
                value={username2} onChange={(e) => setUsername2(e.target.value)}
                fullWidth
                id="username2"
                label="Username"
                name="username2"
                color="secondary"
                inputProps={{maxLength: 20}}
                sx={{borderColor: 'light.main'}}
              />
              {username2.length === 20 && 
                <Typography
                  variant="body2"
                  align= "center"
                  sx={{
                    color:"rgba(0, 0, 0, 0.6)",
                    mb: -1,
                  }}
                  fullWidth
                >* Max characters reached *</Typography>
              }
              <TextField
                margin="normal"
                required
                value={password2} onChange={(e) => setPassword2(e.target.value)}
                fullWidth
                name="password2"
                label="Password"
                type={showPass2 ? "text" : "password"}
                id="password2"
                color='secondary'
              />
              <Grid 
              container
              justifyContent="center"
              alignItems="center"
              >
                <Typography
                  variant="body2"
                  sx={{
                    color:"rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Show Password
                </Typography>
                <Switch defaultChecked={false} onChange={() => setShowPass2(prev => !prev)}/>
              </Grid>              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2}}
                // ref={myRef}
              >
                Sign Up
              </Button>
              {loading2 && 
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <CircularProgress color='primary'/>
            </Box>}
              {errMsg2 && 
              <Typography
                variant="body2"
                align= "center"
                sx={{
                  color:"rgba(0, 0, 0, 0.6)",
                  mt: -1,
                  mb: 1
                }}
                fullWidth
              >{errMsg2}</Typography>
              }
            </Box>
            </>
          }
          <Box>
            <Button 
              align='center'
              variant="contained"
              color="primary"
              disableElevation
              startIcon={<HomeIcon/>}
              onClick={() => navigate('/')}
              sx={{
                  my: 1,
                  color: 'white'
              }}
            >Home</Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
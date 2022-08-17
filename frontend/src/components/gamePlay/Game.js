import React, {useEffect, useState} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Jepai, FastJepai, RedJepai } from './GamePlay';
import { Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { randomizer, getAllIndexes } from './helper';
import { selectScore, addScore } from '../../features/scoreSlice';
import { selectUser, updateScoreDB, selectUserState } from '../../features/userSlice';

// 0 = jepai
// 1 = fast jepai (yellow)
// 2 = red jepai

function Game() {
    let highScore = useSelector(selectScore).score
    let isLoading = useSelector(selectUserState).isLoading
    const user = useSelector(selectUser)
    if (user) {
        if (isLoading) {
            highScore = 'loading'
        } else {
            highScore = user.score
        }
    }
    const dispatch = useDispatch()

    const [point, setPoint] = useState(0)
    const [visible, setVisible] = useState({
        pattern: [3,3,3,3,3,3,3,3,3],
        flag: true
    })

    const [start, setStart] = useState(false)
    const [fastCount, setFastCount] = useState([])
    
    const [errMsg, setErrMsg] = useState()
    useEffect(()=> {
        if (start) {
        // console.log('before timer')
        const timer = setTimeout(() => {
            if (!visible.flag) {
                setVisible({
                    pattern: [3,3,3,3,3,3,3,3,3],
                    flag: true
                })

            } else {
                if (fastCount.length !== 0) {
                    // console.log('zero')
                    restart()
                    setErrMsg('*You did not tap all yellow Jepais*')
                    return
                }
                let pattern = randomizer(point)
                // let pattern = randomizerTest()
                setFastCount(getAllIndexes(pattern,1))
                setVisible({
                    pattern: pattern,
                    flag: false
                })
            }
        }, 1000)
        // console.log('after timer')

        return () => clearTimeout(timer)
        }

    }, [start, visible])

    const restart = () => {
        if (point > highScore) {
            if (user) {
                dispatch(updateScoreDB(point))
            } else {
                dispatch(addScore(point))
            }
        }
        setPoint(0)
        setFastCount([])
        setStart(false)
        setVisible({
            pattern: [3,3,3,3,3,3,3,3,3],
            flag: true
        })
    }

    const handleStart = (e) => {
        e.preventDefault()
        if (point > highScore) {
            if (user) {
                dispatch(updateScoreDB(point))
            } else {
                dispatch(addScore(point))
            }
        }
        setPoint(0)
        setFastCount([])
        if (start) {
            setStart(false)
            setVisible({
                pattern: [3,3,3,3,3,3,3,3,3],
                flag: true
            })
            return
        }
        setErrMsg()
        setStart(true)
    }

  return (
    <Container maxWidth='sm'
        // sx={{border: '1px solid black'}}
    >
        <Container
            align='center'
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        > 
            <Container>
                <Button 
                    align='center'
                    onClick = {handleStart}
                    variant="contained"
                    color="third"
                    disableElevation
                    sx={{
                        my: 1,
                        color: 'white'
                    }}
                >
                {start ? 'Stop' : 'Start'}
                </Button>
            </Container>
            <Typography
                sx={{
                    // border: '1px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'center',
                    my: 1,
                }}
                // align='center'
                variant='body1'
                color='primary'
            >
                Score: {point} <br/> High score: {highScore} <br/> {errMsg}
            </Typography>
        </Container>

        <Grid container spacing={0} columns={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 1,
            // border: '1px solid black'
        }}>
            {[0,1,2,3,4,5,6,7,8].map((i) => {
                return (
                    <Grid item xs={1} sx={{
                        py: 1,
                        backgroundColor: start ? '#ffffff' : '#87807f',
                        border: '1px solid black',
                        alignItems: 'center',
                        display: 'flex',
                        height: '90px',
                        justifyContent: 'center',
                        
                    }}
                >
                    {(visible.pattern[i] === 0) && <Jepai onClick={() => setPoint(prev => prev + 5)}/>}
                    {(visible.pattern[i] === 1) && <FastJepai onClick={() => {
                        setPoint(prev => prev + 10)
                        // console.log('fast jepai is clicked')
                        setFastCount(oldArray => oldArray.filter(n => n !== i))
                    }}/>}
                    {(visible.pattern[i] === 2) && <RedJepai onClick={() => {
                        restart()
                        setErrMsg('*Do not tap a red Jepai*')
                        }}/>}
                </Grid>
                )
            })}
        </Grid>
        <Container
            align='center'
        >
            <Link to={'/'}
            style={{
                color: "#ffffff",
                textDecoration: 'none'
            }}>
                <Button 
                    align='center'
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<HomeIcon/>}
                    sx={{
                        my: 3,
                        color: 'white'
                    }}
                >Home</Button>
            </Link>
            {/* <Button
                onClick={() => dispatch(addScore(10))}
            >
                Dispatch Test
            </Button> */}
        </Container>
    </Container>
  )
}

export default Game
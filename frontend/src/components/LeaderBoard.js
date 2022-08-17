import React, {useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectLeaderBoards, selectGeneralLB, fetchLeaderboard } from '../features/leaderBoardSlice';

import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { selectUser } from '../features/userSlice';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '@media (max-width:400px)': {
      fontSize: '12px'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    '@media (max-width:400px)': {
      fontSize: '11px'
    }
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function LeaderBoard() {
  const leaderBoardSelector = useSelector(selectLeaderBoards)
  const isLoading = useSelector(selectGeneralLB).isLoading
  const user = useSelector(selectUser)
  const isError = useSelector(selectGeneralLB).isError
  const dispatch = useDispatch()
  let rank

  const handleRefresh = () => {
    dispatch(fetchLeaderboard())
  }

  useEffect(()=> {
    if(leaderBoardSelector) {
      return
    }
    dispatch(fetchLeaderboard())
  },[])

  if (user && leaderBoardSelector) {
    if (user.username) {
      rank = leaderBoardSelector.findIndex(x => x.username === user.username) + 1
    } else if (user.displayName) {
      rank = leaderBoardSelector.findIndex(x => x.displayName === user.displayName) + 1
    }
  }

  return (
    <div>
      <Container maxWidth="sm">
      {isLoading &&
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m:2
      }}>
        <CircularProgress color='primary'/>
      </Box>}
      {isError &&
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m:2
      }}>
        <Typography>
          {isError}
        </Typography>
      </Box>
      }
      <Typography
        align='center'
        variant='body1'
        sx={{
          m: 1
        }}
      >
        Username: {user ? (user.username || user.displayName) : 'not logged in'} <br/>
        Rank: {rank ? rank : 'not logged in'}
      </Typography>
      <TableContainer component={Paper} sx={{my: 1}}>
        <Table aria-label="leaderboard">
          <TableHead>
            <TableRow>
              <StyledTableCell align='left' sx={{width: '20px'}}>Rank</StyledTableCell>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="right">Highscore</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>            
            {leaderBoardSelector && leaderBoardSelector.map((row, index) => (
              <StyledTableRow key={index + 1}>
                <StyledTableCell component="th" scope="row" width="5%">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{row.username || row.displayName}</StyledTableCell>
                <StyledTableCell align="right">{row.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: 2
        }}
      >
        <Button
          color='primary'
          variant="contained"
          startIcon={<RefreshIcon/>}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>
      </Container>
    </div>
  )
}

export default LeaderBoard
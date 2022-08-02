import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectLeaderBoards } from '../../features/leaderBoardSlice';
import UserOnBoard from './UserOnBoard';


function LeaderBoard() {
    const leaderBoardSelector = useSelector(selectLeaderBoards)
    const dispatch = useDispatch()
  return (
    <div>leaderBoard</div>
  )
}

export default LeaderBoard
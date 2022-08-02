import { configureStore } from "@reduxjs/toolkit";
import scoreSlicer from '../features/scoreSlice'
import leaderBoardSlicer from '../features/leaderBoardSlice'

export default configureStore({
    reducer: {
      scores: scoreSlicer,
      leaderBoard: leaderBoardSlicer
    },
  });
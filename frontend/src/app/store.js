import { configureStore } from "@reduxjs/toolkit";
import scoreSlice from '../features/scoreSlice'
import leaderBoardSlice from '../features/leaderBoardSlice'
import userSlice from "../features/userSlice";

export default configureStore({
    reducer: {
      score: scoreSlice,
      leaderboard: leaderBoardSlice,
      user: userSlice
    },
  });
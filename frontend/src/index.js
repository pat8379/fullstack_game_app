import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store'
import Profile from './components/profile/Profile';
import About from './components/about/About';
import LeaderBoard from './components/leaderBoards/LeaderBoard';
import GamePlay from './components/gamePlay/GamePlay';
import ErrorPage from './components/error_pages/ErrorPage';
import SignIn from './components/SignIn';
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
      primary: {
          main: '#34003D'
      },
      secondary: {
          // main: 'CA4E79'
          main: '#CA4E79',
      },
      light: {
          main: '#f096ff'
      },
      third: {
          main: '#ff2424'
      }
  }
});

theme.typography.h2 = {
  fontFamily: [
    'Mouse Memoirs'
  ],
  '@media (min-width:400px)': {
    fontSize: '60px',
  },
  fontSize: '45px'
}

theme.typography.a = {
  fontFamily: [
    'Roboto'
  ],
  '@media (max-width:400px)': {
    fontSize: '11px'
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<Profile/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='leaderboard' element={<LeaderBoard/>}/>
          </Route>
          <Route path='/play' element={<GamePlay/>}/>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store'
import Profile from './components/Profile';
import About from './components/About';
import LeaderBoard from './components/LeaderBoard';
import Game from './components/gamePlay/Game';
import ErrorPage from './components/ErrorPage';
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
      },
      greenLight: {
        main: '#12ed02'
      },
      yellowLight: {
        main: '#ffff00'
      },
      greyLight : {
        main: '#deded7'
      },
      darkGrey: {
        main: '#87807f'
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

theme.typography.h5 = {
  fontFamily: [
    'Roboto'
  ],
  '@media (max-width:400px)': {
    fontSize: '18px',
  },
  fontSize: '24px',
  fontWeight: 400,
}

theme.typography.a = {
  fontFamily: [
    'Roboto'
  ],
  '@media (max-width:400px)': {
    fontSize: '11px'
  }
}

theme.typography.body1 = {
  fontFamily: [
    'Roboto'
  ],
  '@media (max-width:400px)': {
    fontSize: '14px',
  },
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App/>}>
              <Route index element={<Profile/>}/>
              <Route path='about' element={<About/>}/>
              <Route path='leaderboard' element={<LeaderBoard/>}/>
            </Route>
            <Route path='/play' element={<Game/>}/>
            <Route path='/login' element={<SignIn/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);



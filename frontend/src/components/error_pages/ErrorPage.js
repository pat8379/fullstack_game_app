import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'


function ErrorPage() {
  let navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault()
    navigate('/')
  }
  return (
    <div>
      <Container maxWidth="sm"
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',}}
      >
        <Typography
          variant='h2'
          color="primary.main"
          component="h1"
          sx={{textAlign: 'center', mb: 3}}
        >
          Error 404 Page not Found
        </Typography>
        <Button
          variant="contained"
          onClick={handleNavigate}
        >
          Back to Home
        </Button>
      </Container>
    </div>
  )
}

export default ErrorPage
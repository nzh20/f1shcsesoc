  import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components'
import { LandingScreen, ClassScreen, CompleteScreen, DNDScreen, SuggestionsScreen, ReportScreen } from '.'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { ReactComponent as Logo } from '../assets/just-bird.svg'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#000',
    },
  },
})
const Container = styled.div(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  flexDirection: 'column',
  background:
    "url('https://images.unsplash.com/photo-1525498128493-380d1990a112?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80')",
  backgroundSize: 'cover',
}))

const Header = styled.div(() => ({
  position: 'relative',
  width: 320,
  height: 64,
  background: 'white',
  borderRadius: 120,
  marginBottom: 24,
  display: 'flex',
  boxShadow: `
    0 1px 2px rgba(0,0,0,0.02), 
    0 2px 4px rgba(0,0,0,0.02), 
    0 4px 8px rgba(0,0,0,0.02), 
    0 8px 16px rgba(0,0,0,0.02),
    0 16px 32px rgba(0,0,0,0.02), 
    0 32px 64px rgba(0,0,0,0.02)`,
}))

const HeaderInner = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 24,
  justifyContent: 'space-evenly',
  flexGrow: 1,
}))

function MarkScreen() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [data, setData] = useState()
  const [report, setReport] = useState({
    feedback: '',
    suggestions: [],
    similarQuestions: [],
  })
  const goNext = () => {
    if (currentScreen < screens.length - 1) setCurrentScreen(currentScreen + 1)
  }

  const goBack = () => {
    if (currentScreen > 0) setCurrentScreen(currentScreen - 1)
  }
  const screens = [
    <DNDScreen setData={setData} onFinish={goNext} />,
    <SuggestionsScreen
      data={data}
      setReport={setReport}
      report={report}
      onFinish={goNext}
    />,
    <ReportScreen report={report} onFinish={goNext} />,
  ]
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <Logo style={{ width: 64 }} />
          <HeaderInner>
            {currentScreen > 0 && <ArrowBackIosRoundedIcon onClick={goBack} />}
            {currentScreen !== 0 && (
              <HomeRoundedIcon onClick={() => setCurrentScreen(0)} />
            )}
          </HeaderInner>
        </Header>
        {screens[currentScreen]}
      </Container>
    </ThemeProvider>
  )

    
}

export default MarkScreen

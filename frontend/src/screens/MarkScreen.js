import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled from 'styled-components'
import {
  LandingScreen,
  ClassScreen,
  CompleteScreen,
  DNDScreen,
  SuggestionsScreen,
  ReportScreen,
} from '.'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { ReactComponent as Logo } from '../assets/just-bird.svg'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
const theme = createTheme({
  palette: {
    primary: {
      main: '#5540ea',
    },
    secondary: {
      main: '#5540ea',
    },
  },
})
const Container = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
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
  justifyContent: 'flex-end',
  flexGrow: 1,
}))

function MarkScreen({ setShowClassroom }) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [data, setData] = useState()
  const [report, setReport] = useState({
    feedback: '',
    suggestions: [],
    similarQuestions: [],
  })

  const goNext = () => {
    if (currentScreen < screens.length - 1) setCurrentScreen(currentScreen + 1)
    setShowClassroom(false)
  }

  const goBack = () => {
    if (currentScreen === 1) setShowClassroom(true)
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
        {currentScreen !== 0 && (
          <Header>
            <Logo style={{ width: 64 }} />
            <HeaderInner>
              {currentScreen > 0 && (
                <ArrowBackIosRoundedIcon
                  style={{ marginRight: 16, cursor: 'pointer' }}
                  onClick={goBack}
                />
              )}
              {currentScreen !== 0 && (
                <HomeRoundedIcon
                  style={{ marginRight: 24, cursor: 'pointer' }}
                  onClick={() => setCurrentScreen(0)}
                />
              )}
            </HeaderInner>
          </Header>
        )}
        {screens[currentScreen]}
      </Container>
    </ThemeProvider>
  )
}

export default MarkScreen

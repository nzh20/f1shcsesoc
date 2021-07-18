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
  MarkScreen,
  CompleteScreen,
  DNDScreen,
  SuggestionsScreen,
  Report,
} from './screens'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { ReactComponent as Logo } from './assets/just-bird.svg'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
const theme = createTheme({
  palette: {
    primary: {
      main: '#5540ea',
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
  width: 280,
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
  justifyContent: 'flex-start',
  flexGrow: 1,
  fontFamily: 'sans-serif',
}))

const SplitScreen = styled.div(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}))

function App() {
  const [showClassroom, setShowClassroom] = useState(true)

  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path='/'>
            <ThemeProvider theme={theme}>
              <SplitScreen>
                {showClassroom && (
                  <div style={{ marginRight: 24 }}>
                    <LandingScreen />
                  </div>
                )}
                <MarkScreen setShowClassroom={setShowClassroom} />
              </SplitScreen>
            </ThemeProvider>
          </Route>
          <Route path='/classes/:id'>
            <ClassScreen />
          </Route>
          <Route path='/mark'>
            <MarkScreen setShowClassroom={() => {}} forceNav={true} />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App

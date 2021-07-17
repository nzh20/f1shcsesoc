import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components'
import { LandingScreen, ClassScreen, CompleteScreen, DNDScreen, SuggestionsScreen } from './screens'

const Container = styled.div(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  background:
    "url('https://images.unsplash.com/photo-1525498128493-380d1990a112?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80')",
  backgroundSize: 'cover',
}))

function App() {
  const [data, setData] = useState()
  const [currentScreen, setCurrentScreen] = useState(0)

  return (
    <Router>
      <Container>
        <Switch>
          <Route
            exact path='/'>
            <LandingScreen/>
          </Route>
          <Route path='/classes/:id'>
            <ClassScreen/>
          </Route>
          <Route path='/mark'>
            {/* <MarkScreen/> */}
          </Route>
        </Switch>
      </Container>
    </Router>
    
     
     
    
  )
}

export default App

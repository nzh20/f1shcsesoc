import { useState } from 'react'
import styled from 'styled-components'
import { CompleteScreen, DNDScreen, SuggestionsScreen } from './screens'

const Container = styled.div(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  background: "url('https://source.unsplash.com/random')",
  backgroundSize: 'cover',
}))

function App() {
  const [data, setData] = useState()
  const [currentScreen, setCurrentScreen] = useState(0)
  return (
    <Container>
      {!data ? (
        <DNDScreen setData={setData} />
      ) : (
        <SuggestionsScreen data={data} />
      )}
    </Container>
  )
}

export default App

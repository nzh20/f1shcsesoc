import { useState } from 'react'
import Page from '../common/Page'
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import SuggestionBox from './SuggestionBox'
const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
})

export default function Paper({ data }) {
  const student1 = data[0]
  const entries1 = Object.entries(student1)
  const [timestamp, score, ...qna] = entries1
  const dictionary = qna.map(([question, answer]) => ({ question, answer }))

  const [qIndex, setQIndex] = useState(0)
  const Question = styled.div(() => ({
    fontSize: 18,
    margin: 16,
    fontWeight: 700,
  }))
  const AnswerBox = styled.div(() => ({
    boxShadow: `
    0 1px 2px rgba(0,0,0,0.02), 
    0 2px 4px rgba(0,0,0,0.02), 
    0 4px 8px rgba(0,0,0,0.02), 
    0 8px 16px rgba(0,0,0,0.02),
    0 16px 32px rgba(0,0,0,0.02), 
    0 32px 64px rgba(0,0,0,0.02)`,
    borderRadius: 4,
    padding: 32,
    fontSize: 12,
    lineHeight: 2,
  }))

  const Response = styled(Page)(() => ({
    flexDirection: 'column',
    width: 640,
    margin: 12,
  }))

  const Navigation = () => {
    const NavButton = styled.button(() => ({
      padding: 12,
      border: 0,
      borderRadius: 12,
      background: 'black',
      color: 'white',
      cursor: 'pointer',
    }))

    const handleNext = () => {
      if (qIndex < dictionary.length) {
        setQIndex(qIndex + 1)
      }
    }

    const handlePrev = () => {
      if (qIndex > 0) {
        setQIndex(qIndex - 1)
      }
    }

    const NavContainer = styled.div(() => ({
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    }))

    return (
      <NavContainer>
        {qIndex > 0 && <NavButton onClick={handlePrev}>Previous</NavButton>}
        {qIndex < dictionary.length - 1 && (
          <NavButton onClick={handleNext}>Next</NavButton>
        )}
      </NavContainer>
    )
  }

  const renderQuestion = (idx, { question, answer }) => (
    <Response>
      <div style={{ width: '100%' }}>
        <ThemeProvider theme={theme}>
          <LinearProgress
            variant='determinate'
            value={((idx + 1) / (dictionary.length + 1)) * 100}
          />
        </ThemeProvider>
      </div>

      <Question>
        Q{idx + 1}. {question}
      </Question>
      <AnswerBox>{answer}</AnswerBox>
      <SuggestionBox answer={answer} />
      <Navigation />
    </Response>
  )
  return <div>{renderQuestion(qIndex, dictionary[qIndex])}</div>
}

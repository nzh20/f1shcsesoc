import { useState } from 'react'
import Page from '../common/Page'
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Teacher from './Teacher'
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
  const renderQuestion = (idx, { question, answer }) => (
    <div>
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
      </Response>
      <Teacher
        qIndex={qIndex}
        answer={answer}
        handleNext={handleNext}
        handlePrev={handlePrev}
        dictionary={dictionary}
      />
    </div>
  )
  return <div>{renderQuestion(qIndex, dictionary[qIndex])}</div>
}

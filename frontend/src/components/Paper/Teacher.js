import { useState } from 'react'
import styled from 'styled-components'
import Page from '../common/Page'
import SuggestionBox from './SuggestionBox'
import TextField from '@material-ui/core/TextField'

const Container = styled(Page)(() => ({
  width: 640,
  margin: 12,
  flexDirection: 'column',
}))

export default function Teacher({
  qIndex,
  handleNext,
  handlePrev,
  handleFinish,
  report,
  setReport,
  dictionary,
  answer,
}) {
  const [feedback, setFeedback] = useState('')
  const finishReport = () => {
    setReport({
      ...report,
      feedback,
    })
    handleFinish()
  }
  const Navigation = () => {
    const NavButton = styled.button(() => ({
      padding: 12,
      border: 0,
      borderRadius: 12,
      background: 'black',
      color: 'white',
      cursor: 'pointer',
    }))

    const NavContainer = styled.div(() => ({
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
    }))

    return (
      <NavContainer>
        {qIndex > 0 && (
          <NavButton style={{ marginRight: 'auto' }} onClick={handlePrev}>
            Previous
          </NavButton>
        )}
        {qIndex < dictionary.length - 1 && (
          <NavButton onClick={handleNext}>Next</NavButton>
        )}
        {qIndex === dictionary.length - 1 && (
          <NavButton onClick={finishReport}>Finish</NavButton>
        )}
      </NavContainer>
    )
  }

  const handleFeedback = (e) => {
    setFeedback(e.target.value)
  }

  const Label = styled.span(() => ({
    fontSize: 12,
  }))
  return (
    <Container>
      <SuggestionBox answer={answer} report={report} setReport={setReport} />
      <TextField
        onChange={handleFeedback}
        style={{ width: '100%', margin: 12 }}
        label={<Label>Your Feedback</Label>}
        multiline
        variant='outlined'
      />
      <Navigation />
    </Container>
  )
}

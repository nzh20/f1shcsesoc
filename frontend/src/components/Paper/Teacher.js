import styled from 'styled-components'
import Page from '../common/Page'
import SuggestionBox from './SuggestionBox'
import TextField from '@material-ui/core/TextField'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
})

const Container = styled(Page)(() => ({
  width: 640,
  margin: 12,
  flexDirection: 'column',
}))

export default function Teacher({
  qIndex,
  handleNext,
  handlePrev,
  dictionary,
  answer,
}) {
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
          <NavButton onClick={() => {}}>Finish</NavButton>
        )}
      </NavContainer>
    )
  }
  return (
    <Container>
      <SuggestionBox answer={answer} />
      <ThemeProvider theme={theme}>
        <TextField
          style={{ width: '100%', margin: 12 }}
          label='Your Feedback'
          multiline
          variant='outlined'
        />
      </ThemeProvider>
      <Navigation />
    </Container>
  )
}

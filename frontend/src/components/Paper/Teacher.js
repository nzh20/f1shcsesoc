import styled from 'styled-components'
import Page from '../common/Page'
import SuggestionBox from './SuggestionBox'
const Container = styled(Page)(() => ({
  width: 640,
  margin: 12,
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
  return (
    <Container>
      <SuggestionBox answer={answer} />
      <Navigation />
    </Container>
  )
}

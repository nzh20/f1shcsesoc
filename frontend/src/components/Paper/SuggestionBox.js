import styled from 'styled-components'
import mockSuggestions from './suggestions.json'

export default function SuggestionBox({ answer }) {
  const analyseQuestion = () => {}

  const SuggestionContainer = styled.div(() => ({
    display: 'flex',
    width: '100%',
    marginTop: 16,
  }))

  const HalfBox = styled.div(() => ({
    width: '50%',
    padding: 12,
  }))

  const Heading = styled.div(() => ({
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 700,
  }))

  const Item = styled.div(() => ({
    fontSize: 10,
  }))

  const Suggestions = () => (
    <HalfBox>
      <Heading>Suggestions</Heading>
      <Item>Textbook Chapter 15 - The Ozone Layer</Item>
    </HalfBox>
  )

  const SimilarQuestions = () => (
    <HalfBox>
      <Heading>Similar Questions</Heading>
      <Item>2014 HSC Paper A - Part B, Question 12</Item>
      <Item>2013 HSC Paper B - Part A, Question 16</Item>
    </HalfBox>
  )

  return (
    <SuggestionContainer>
      <Suggestions />
      <SimilarQuestions />
    </SuggestionContainer>
  )
}

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import mockSuggestions from './suggestions.json'
export default function SuggestionBox({ answer }) {
  const [suggestions, setSuggestions] = useState([])
  const [similarQuestions, setSimilarQuestions] = useState([])

  useEffect(() => {
    const analyseQuestion = () => {
      // do logic stuff
      setSuggestions(['fasdfasdfasdf'])
      setSimilarQuestions(['fasdfsadf sd asdfasdf'])
    }
    analyseQuestion()
  }, [])

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
      {suggestions.map((suggestion) => (
        <Item>{suggestion}</Item>
      ))}
    </HalfBox>
  )

  const SimilarQuestions = () => (
    <HalfBox>
      <Heading>Similar Questions</Heading>
      {similarQuestions.map((similarQuestion) => (
        <Item>{similarQuestion}</Item>
      ))}
    </HalfBox>
  )

  return (
    <SuggestionContainer>
      <Suggestions />
      <SimilarQuestions />
    </SuggestionContainer>
  )
}

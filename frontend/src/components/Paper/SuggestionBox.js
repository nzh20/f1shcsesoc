import { useState, useEffect } from 'react'
import styled from 'styled-components'
import mockSuggestions from './suggestions.json'
export default function SuggestionBox({ answer }) {
  const [suggestions, setSuggestions] = useState([])
  const [similarQuestions, setSimilarQuestions] = useState([])

  useEffect(() => {
    const analyseQuestion = () => {
      // do logic stuff
      console.log(mockSuggestions)
      const questionWords = answer.split(" ")
      for (const word of questionWords) {
        for (const mockSuggestion of mockSuggestions) {
          console.log(mockSuggestion)
          if (mockSuggestion.keywords.includes(word)) {
            setSuggestions(mockSuggestion.suggestions)
            setSimilarQuestions(mockSuggestion.similarQuestions)
          }
        }
        
      }
    }
    analyseQuestion()
  }, [answer])

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

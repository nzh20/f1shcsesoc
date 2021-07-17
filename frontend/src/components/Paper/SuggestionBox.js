import { useState, useEffect } from 'react'
import styled from 'styled-components'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined'
import CategoryIcon from '@material-ui/icons/Category'
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
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  }))

  const Item = styled.div(() => ({
    fontSize: 12,
  }))

  const Title = styled.div(() => ({
    marginLeft: 4,
  }))

  const Suggestions = () => (
    <HalfBox>
      <Heading>
        <EmojiObjectsOutlinedIcon />
        <Title>Suggestions</Title>
      </Heading>
      {suggestions.map((suggestion) => (
        <Item>{suggestion}</Item>
      ))}
    </HalfBox>
  )

  const SimilarQuestions = () => (
    <HalfBox>
      <Heading>
        <CategoryIcon />
        <Title>Similar Questions</Title>
      </Heading>
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

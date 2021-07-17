import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined'
import CategoryIcon from '@material-ui/icons/Category'
import mockSuggestions from './suggestions.json'

export default function SuggestionBox({ answer, report, setReport }) {
  const [suggestions, setSuggestions] = useState([])
  const [similarQuestions, setSimilarQuestions] = useState([])

  const handleAddSuggestion = (s) => {
    const originalSuggestions = report?.suggestions || []
    const newSuggestions = [...new Set([...originalSuggestions, s])]
    const newReport = {
      ...report,
      suggestions: newSuggestions,
    }
    console.log('new', newReport)
    setReport(newReport)
  }

  const handleRemoveSuggestion = (s) => {
    const originalSuggestions = report?.suggestions || []
    const newSuggestions = originalSuggestions.filter((x) => x !== s)
    const newReport = {
      ...report,
      suggestions: newSuggestions,
    }
    setReport(newReport)
  }

  const handleAddSimilarQuestion = (sq) => {
    const originalSimilarQuestions = report?.similarQuestions || []
    const newSimilarQuestions = [...new Set([...originalSimilarQuestions, sq])]
    const newReport = {
      ...report,
      similarQuestions: newSimilarQuestions,
    }
    setReport(newReport)
  }

  const handleRemoveSimilarQuestion = (sq) => {
    const originalSimilarQuestions = report?.similarQuestions || []
    const newSimilarQuestions = originalSimilarQuestions.filter((x) => x !== sq)
    const newReport = {
      ...report,
      similarQuestions: newSimilarQuestions,
    }
    setReport(newReport)
  }

  useEffect(() => {
    const analyseQuestion = () => {
      // do logic stuff
      setSuggestions([])
      setSimilarQuestions([])
      const questionWords = answer.split(' ')
      for (const word of questionWords) {
        for (const mockSuggestion of mockSuggestions) {
          if (mockSuggestion.keywords.includes(word)) {
            const newSuggestions = [
              ...suggestions,
              ...mockSuggestion.suggestions,
            ]
            const newSimilarQuestions = [
              ...similarQuestions,
              ...mockSuggestion.similarQuestions,
            ]
            setSuggestions(newSuggestions)
            setSimilarQuestions(newSimilarQuestions)
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

  const SuggestionComponent = ({ suggestion }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={report?.suggestions?.includes(suggestion)}
            size='small'
            onChange={(e) => {
              if (e.target.checked) {
                handleAddSuggestion(suggestion)
              } else {
                handleRemoveSuggestion(suggestion)
              }
            }}
          />
        }
        label={<Item>{suggestion}</Item>}
      />
    )
  }

  const SimilarQuestionComponent = ({ similarQuestion }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={report?.similarQuestions?.includes(similarQuestion)}
            size='small'
            onChange={(e) => {
              if (e.target.checked) {
                handleAddSimilarQuestion(similarQuestion)
              } else {
                handleRemoveSimilarQuestion(similarQuestion)
              }
            }}
          />
        }
        label={<Item>{similarQuestion}</Item>}
      />
    )
  }

  const Suggestions = () => (
    <HalfBox>
      <Heading>
        <EmojiObjectsOutlinedIcon />
        <Title>Suggestions</Title>
      </Heading>
      {suggestions.map((suggestion, idx) => {
        return <SuggestionComponent key={idx} suggestion={suggestion} />
      })}
    </HalfBox>
  )

  const SimilarQuestions = () => (
    <HalfBox>
      <Heading>
        <CategoryIcon />
        <Title>Similar Questions</Title>
      </Heading>
      {similarQuestions.map((similarQuestion, idx) => {
        return (
          <SimilarQuestionComponent
            key={idx}
            similarQuestion={similarQuestion}
          />
        )
      })}
    </HalfBox>
  )

  return (
    <SuggestionContainer>
      <Suggestions />
      <SimilarQuestions />
    </SuggestionContainer>
  )
}

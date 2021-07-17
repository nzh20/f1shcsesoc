import Page from '../components/common/Page'
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined'
import CategoryIcon from '@material-ui/icons/Category'

const Container = styled(Page)(() => ({
  width: 640,
  margin: 12,
  flexDirection: 'column',
  whiteSpace: 'pre-line',
  alignItems: 'flex-start',
  fontSize: 12,
}))

const Title = styled.h1(() => ({
  textTransform: 'uppercase',
}))

const Subtitle = styled.h3(() => ({
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
}))
export default function ReportScreen({ data, report, onFinish }) {
  const { feedback, suggestions, similarQuestions } = report

  return (
    <Container>
      <Title>Feedback Summary</Title>
      <div>{feedback}</div>

      {!!suggestions?.length && (
        <>
          <Subtitle>
            <EmojiObjectsOutlinedIcon style={{ marginRight: 8 }} />
            Suggestions
          </Subtitle>
          {suggestions?.map((s, idx) => (
            <div key={idx}>{s}</div>
          ))}
        </>
      )}

      {!!similarQuestions?.length && (
        <>
          <Subtitle>
            <CategoryIcon style={{ marginRight: 8 }} />
            Similar Questions
          </Subtitle>
          {similarQuestions?.map((sq, idx) => (
            <div key={idx}>{sq}</div>
          ))}
        </>
      )}

      <div style={{ width: '100%', marginTop: 80, position: 'relative' }}>
        <Fab
          color='primary'
          style={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          <SendRoundedIcon />
        </Fab>
      </div>
    </Container>
  )
}

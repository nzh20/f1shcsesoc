import Page from '../components/common/Page'
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined'
import CategoryIcon from '@material-ui/icons/Category'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import { ReactComponent as ReportBackground } from '../assets/report.svg'
const Container = styled(Page)(() => ({
  width: 640,
  margin: 12,
  flexDirection: 'column',
  whiteSpace: 'pre-line',
  alignItems: 'flex-start',
  fontSize: 12,
  display: 'flex',
  backgroundColor: 'white',
  position: 'relative',
}))

const Title = styled.h1(() => ({
  textTransform: 'uppercase',
}))

const Subtitle = styled.h3(() => ({
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  marginTop: 4,
}))

const Box = styled.div(() => ({
  borderRadius: 8,
  border: 'solid 1px #eee',
  padding: 24,
  marginTop: 24,
  width: 588,
  background: 'white',
  zIndex: 1,
}))
export default function ReportScreen({ data, report, onFinish }) {
  const { feedback, suggestions, similarQuestions } = report

  return (
    <Container>
      <Title>Feedback Summary</Title>
      <Box>
        <Subtitle>
          <CreateRoundedIcon style={{ marginRight: 8 }} />
          Feedback
        </Subtitle>
        {feedback}
      </Box>

      {!!suggestions?.length && (
        <Box>
          <Subtitle>
            <EmojiObjectsOutlinedIcon style={{ marginRight: 8 }} />
            Suggestions
          </Subtitle>
          {suggestions?.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </Box>
      )}

      {!!similarQuestions?.length && (
        <Box>
          <Subtitle>
            <CategoryIcon style={{ marginRight: 8 }} />
            Similar Questions
          </Subtitle>
          {similarQuestions?.map((sq, idx) => (
            <li key={idx}>{sq}</li>
          ))}
        </Box>
      )}
      <ReportBackground
        style={{
          position: 'absolute',
          top: 0,
          right: 12,
          opacity: 0.4,
          width: 400,
        }}
      />

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

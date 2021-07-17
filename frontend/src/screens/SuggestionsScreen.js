import Paper from '../components/Paper'

export default function SuggestionsSreen({
  data,
  report,
  setReport,
  onFinish,
}) {
  return (
    <Paper
      data={data}
      report={report}
      setReport={setReport}
      onFinish={onFinish}
    />
  )
}

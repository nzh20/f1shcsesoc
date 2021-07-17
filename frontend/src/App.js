import { useState } from 'react'
import DragAndDrop from './components/DragAndDrop'

function App() {
  const [data, setData] = useState()
  const handleDrop = (f) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      setData(e.target.result)
    }
    reader.readAsText(f[0])
  }

  return (
    <div>
      <DragAndDrop handleDrop={handleDrop}>
        <div style={{ height: 600, width: 600 }}>{data || 'DROP HERE'}</div>
      </DragAndDrop>
    </div>
  )
}

export default App

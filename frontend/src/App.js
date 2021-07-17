import { useState } from 'react'
import DragAndDrop from './components/DragAndDrop'

function App() {
  const [files, setFiles] = useState(['lachlan.png'])
  const handleDrop = (f) => {
    let fileList = files
    console.log('files', files)
    f.forEach((file) => {
      if (!file?.name) return
      fileList.push(file?.name)
    })
    setFiles(fileList)
  }
  return (
    <div>
      <DragAndDrop handleDrop={handleDrop}>
        <div style={{ height: 300, width: 250 }}>
          {files.map((file, i) => (
            <div key={i}>{file}</div>
          ))}
        </div>
      </DragAndDrop>
    </div>
  )
}

export default App

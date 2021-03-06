import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded'
const Hotspot = styled.div(() => ({
  border: 'dashed black 4px',
  backgroundColor: 'rgba(255,255,255,.8)',
  position: 'absolute',
  borderRadius: 16,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  pointerEvents: 'none',
}))

const Hint = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  fontSize: 16,
  background: 'white',
  fontFamily: 'sans-serif',
  pointerEvents: 'none',
  textTransform: 'uppercase',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  borderRadius: 16,
}))

export default function DragAndDropWrapper({
  children,
  handleDrop: dropHandler,
}) {
  const [drag, setDrag] = useState(false)
  const dropRef = useRef()

  const handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(true)
    console.log('1')
  }
  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    console.log('2')
  }
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('3')
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('4')
    setDrag(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      dropHandler(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
  }

  useEffect(() => {
    let div = dropRef.current
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)

    return () => {
      let div = dropRef.current
      if (!div) return
      div.removeEventListener('dragenter', handleDragIn)
      div.removeEventListener('dragleave', handleDragOut)
      div.removeEventListener('dragover', handleDrag)
      div.removeEventListener('drop', handleDrop)
    }
  }, [])

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
      }}
      ref={dropRef}
    >
      {drag && (
        <Hotspot>
          <Hint>
            <div>Drop Here</div>
            <AddBoxRoundedIcon style={{ marginTop: 12 }} />
          </Hint>
        </Hotspot>
      )}
      {children}
    </div>
  )
}

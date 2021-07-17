import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Hotspot = styled.div(() => ({
  border: 'dashed grey 4px',
  backgroundColor: 'rgba(255,255,255,.8)',
  position: 'absolute',
  borderRadius: 16,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
}))

const Hint = styled.div(() => ({
  position: 'absolute',
  top: '50%',
  right: 0,
  left: 0,
  textAlign: 'center',
  color: 'grey',
  fontSize: 36,
  fontFamily: 'sans-serif',
  zIndex: 9998,
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
  }
  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
  }
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
      style={{ display: 'inline-block', position: 'relative' }}
      ref={dropRef}
    >
      {drag && (
        <Hotspot>
          <Hint>drop here :)</Hint>
        </Hotspot>
      )}
      {children}
    </div>
  )
}

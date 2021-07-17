import React, { useEffect, useRef, useState } from 'react'

export default function DragAndDrop({ children, handleDrop: dropHandler }) {
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
      let div = this.dropRef.current
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
        <div
          style={{
            border: 'dashed grey 4px',
            backgroundColor: 'rgba(255,255,255,.8)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              left: 0,
              textAlign: 'center',
              color: 'grey',
              fontSize: 36,
            }}
          >
            <div>drop here :)</div>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

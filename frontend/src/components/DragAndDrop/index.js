import { useState } from 'react'
import Wrapper from './Wrapper'
import styled from 'styled-components'

const Container = styled.div(() => ({
  height: 800,
  width: 640,
  fontFamily: 'sans-serif',
  boxShadow: `
    0 1px 2px rgba(0,0,0,0.02), 
    0 2px 4px rgba(0,0,0,0.02), 
    0 4px 8px rgba(0,0,0,0.02), 
    0 8px 16px rgba(0,0,0,0.02),
    0 16px 32px rgba(0,0,0,0.02), 
    0 32px 64px rgba(0,0,0,0.02)`,
  padding: 32,
  borderRadius: 16,
}))

export default function DragAndDrop() {
  const [data, setData] = useState()
  const handleDrop = (f) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      setData(e.target.result)
    }
    reader.readAsText(f[0])
  }

  return (
    <Wrapper handleDrop={handleDrop}>
      <Container>{data || 'DROP HERE'}</Container>
    </Wrapper>
  )
}

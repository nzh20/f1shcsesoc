import { useState } from 'react'
import Wrapper from './Wrapper'
import styled from 'styled-components'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'
import Papa from 'papaparse'
import Page from '../common/Page'

const Container = styled(Page)(() => ({
  height: 320,
  width: 320,
  pointerEvents: 'none',
}))

const Inner = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  pointerEvents: 'none',
  lineHeight: 2,
}))

export default function DragAndDrop({ setData, onFinish }) {
  const handleDrop = (f) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const csv = Papa.parse(e.target.result, { header: true })
      setData(csv?.data)
      onFinish()
    }
    reader.readAsText(f[0])
  }

  return (
    <Wrapper handleDrop={handleDrop}>
      <Container>
        <Inner>
          <div>ALREADY HAVE A CSV FILE?</div>
          <div>DRAG CSV FILE HERE</div>
          <AttachFileRoundedIcon style={{ marginTop: 12 }} />
        </Inner>
      </Container>
    </Wrapper>
  )
}

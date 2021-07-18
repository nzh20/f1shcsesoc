// POSSIBLE IMPORTS
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import Page from '../components/common/Page'

const Container = styled.div(() => ({
  display: 'flex',
  'flex-direction': 'column',
  width: 800,
}))

const LinkWrapper = styled.div(() => ({
  transition: '200ms',
  color: 'black',
  ':hover': {
    transition: '400ms',
    color: '#5540ea',
    cursor: 'pointer',
  },
}))

const Right = styled.div(() => ({
  display: 'flex',
  'flex-direction': 'column',
  color: '#5540ea',
}))

const SyncedTo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  padding: 12,
  marginBottom: 24,
  borderRadius: 8,
  border: '1px solid #eee',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0px 0px 40px 0px #B4B1EF',
    border: '1px solid transparent',
  },
  cursor: 'pointer',
  justifyContent: 'space-between',
}))

function startMarking(spreadsheetLink) {
  window.open(spreadsheetLink, '_blank')
  window.location.href = '/mark'
}

export default function ClassScreen() {
  let { id } = useParams()
  const [classData, setClassData] = useState(null)
  const [coursework, setCoursework] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/class?id=${id}`)
      .then((response) => response.json())
      .then((data) => setClassData(data))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:5000/coursework?class_id=${id}`)
      .then((response) => response.json())
      .then((data) => setCoursework(data))
  }, [classData])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Logo style={{ width: 128, marginBottom: 24 }} />

      <Page>
        <Container>
          {classData ? (
            <>
              <h1>{classData.name}</h1>
              <LinkWrapper
                onClick={() => window.open(classData.alternateLink, '_blank')}
              >
                {classData.alternateLink}
              </LinkWrapper>
            </>
          ) : null}
          {
            coursework.courseWork
              ? coursework.courseWork.map((cw) => {
                  return (
                    <Tooltip title='Mark coursework'>
                      <SyncedTo
                        aria-label='Click to mark coursework'
                        onClick={() =>
                          startMarking(cw.materials[0].form.responseUrl)
                        }
                      >
                        <h3>{cw.title}</h3>
                        <Right>
                          {`Due ${cw.dueTime.hours}:${cw.dueTime.minutes} ${cw.dueDate.year}/${cw.dueDate.month}/${cw.dueDate.day}`}
                          <p>
                            {`${Math.floor(
                              Math.random() * 4
                            )}/3 students have completed this.`}
                          </p>
                        </Right>
                      </SyncedTo>
                    </Tooltip>
                  )
                })
              : null // do loading
          }
        </Container>
      </Page>
    </div>
  )
}

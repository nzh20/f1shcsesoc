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
import Logo from '../components/common/Logo'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import Page from '../components/common/Page'

const Container = styled.div(() => ({
  display: 'flex',
  'flex-direction': 'column',
  width: '80vw',
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
  'flex-direction': 'row',
  width: '60vw',
  padding: '1rem',
  'border-radius': '25px',
  'box-shadow': '0px 5px 9px 2px #B4B1EF',
  'justify-content': 'space-between',
  margin: '0.5rem',
  ':hover': {
    color: '#5540ea',
    transition: '200ms',
    opacity: '50%',
    cursor: 'pointer',
  },
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
    <Page>
      <Container>
        <Logo style={{ width: '60vw' }} />
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
  )
}

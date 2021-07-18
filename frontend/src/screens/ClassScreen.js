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
import { ReactComponent as Logo } from '../assets/just-bird.svg'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import Page from '../components/common/Page'
import LinkRoundedIcon from '@material-ui/icons/LinkRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import CircularProgress from '@material-ui/core/CircularProgress'

const Container = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 520,
}))

const LinkWrapper = styled.div(() => ({
  transition: '200ms',
  display: 'flex',
  alignItems: 'center',
  color: 'black',
  marginBottom: 24,
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
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: 20,
  marginBottom: 24,
  borderRadius: 8,

  border: '1px solid #eee',
  transition: 'all 0.2s ease',
  '&:hover': {
    border: '1px solid black',
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res1 = await fetch(`http://localhost:5000/class?id=${id}`)
        setClassData(await res1.json())
        const res2 = await fetch(
          `http://localhost:5000/coursework?class_id=${id}`
        )
        setCoursework(await res2.json())
        setLoading(false)
      } catch (e) {
        console.log('err', e)
      } finally {
        setLoading(false)
      }
    }
    fetchClass()
  }, [])

  const Header = styled.div(() => ({
    position: 'relative',
    width: 200,
    height: 64,
    background: 'white',
    borderRadius: 120,
    marginBottom: 24,
    display: 'flex',
    boxShadow: `
      0 1px 2px rgba(0,0,0,0.02), 
      0 2px 4px rgba(0,0,0,0.02), 
      0 4px 8px rgba(0,0,0,0.02), 
      0 8px 16px rgba(0,0,0,0.02),
      0 16px 32px rgba(0,0,0,0.02), 
      0 32px 64px rgba(0,0,0,0.02)`,
  }))

  const HeaderInner = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    justifyContent: 'flex-end',
    flexGrow: 1,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header>
        <Logo style={{ width: 64 }} />
        <HeaderInner>
          <ArrowBackIosRoundedIcon
            style={{ marginRight: 16, cursor: 'pointer' }}
            onClick={() => {
              window.location.href = '/'
            }}
          />

          <HomeRoundedIcon
            style={{ marginRight: 24, cursor: 'pointer' }}
            onClick={() => {
              window.location.href = '/'
            }}
          />
        </HeaderInner>
      </Header>

      <Page>
        <Container>
          {classData ? (
            <>
              <h1>{classData.name}</h1>
              <LinkWrapper
                onClick={() => window.open(classData.alternateLink, '_blank')}
              >
                <LinkRoundedIcon style={{ marginRight: 8 }} />
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
                        <div style={{ lineHeight: 1.6 }}>
                          <div>
                            {`Due ${cw.dueTime.hours}:${cw.dueTime.minutes} ${cw.dueDate.year}/${cw.dueDate.month}/${cw.dueDate.day}`}
                          </div>
                          <div>
                            {`${Math.floor(
                              Math.random() * 4
                            )}/3 students have completed this.`}
                          </div>
                        </div>
                      </SyncedTo>
                    </Tooltip>
                  )
                })
              : null // do loading
          }
          {loading && <CircularProgress />}
        </Container>
      </Page>
    </div>
  )
}

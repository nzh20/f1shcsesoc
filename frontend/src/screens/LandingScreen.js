import Page from '../components/common/Page'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ReactComponent as Logo } from '../assets/just-bird.svg'
import Classroom from '../assets/classroom.png'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowForwardIcon from '@material-ui/icons/Launch'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Container = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 600,
  padding: 24,
}))

const IconWrapper = styled.div(() => ({
  alignSelf: 'center',
  transition: '200ms',
  ':hover': {
    opacity: '50%',
    cursor: 'pointer',
  },
}))

const LinkWrapper = styled.div(() => ({
  transition: '200ms',
  color: '#5540ea',
  ':hover': {
    transition: '400ms',
    cursor: 'pointer',
  },
}))

const Right = styled.div(() => ({
  display: 'flex',
  'flex-direction': 'row',
  justifyContent: 'flex-end',
  color: '#5540ea',
  alignItems: 'center',
  transition: '200ms',
  ':hover': {
    opacity: '50%',
    cursor: 'pointer',
  },
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

export default function LandingScreen() {
  const [classes, setClasses] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then((response) => response.json())
      .then((data) => setClasses(data))
  }, [])
  return (
    <Page>
      <Container>
        <div
          style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}
        >
          <Logo style={{ width: 48 }} />
          <h2 style={{ marginLeft: 16 }}>
            Welcome, <span style={{ color: '#5540ea' }}>An Thy</span>
          </h2>
        </div>
        <SyncedTo>
          <h3>Synced to</h3>
          <Right>
            <ExpandMoreIcon
              style={{
                alignSelf: 'center',
                fill: '5540ea',
                marginRight: '1rem',
              }}
            />
            <h3>Google Classroom</h3>
            <img
              src={Classroom}
              alt='Google classroom logo'
              style={{
                marginLeft: '1.5rem',
                width: 48,
                height: 40,
              }}
            />
          </Right>
        </SyncedTo>
        <div>
          <h2>Your Classes</h2>
        </div>
        {classes &&
          classes.map((c) => {
            return (
              <SyncedTo onClick={() => window.open(c.alternateLink, '_blank')}>
                <LinkWrapper>
                  <Link
                    style={{ textDecoration: 'none', color: '#5540ea' }}
                    to={`/classes/${c.id}`}
                  >
                    <h3>{c.name}</h3>
                  </Link>
                </LinkWrapper>
                <Tooltip
                  title='Access on site'
                  aria-label='Link to access class on site'
                >
                  <IconWrapper>
                    <ArrowForwardIcon />
                  </IconWrapper>
                </Tooltip>
              </SyncedTo>
            )
          })}
      </Container>
    </Page>
  )
}

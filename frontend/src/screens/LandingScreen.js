import Page from '../components/common/Page'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Logo from '../components/common/Logo'
import Classroom from "../assets/classroom.png"
import Tooltip from '@material-ui/core/Tooltip';
import ArrowForwardIcon from '@material-ui/icons/Launch';
import {Link} from "react-router-dom"
import React, {useEffect, useState} from 'react';;

const Container = styled.div(() => ({
  "display": "flex",
  "flex-direction": "column",
  "width": "80vw",
}))

const IconWrapper = styled.div(() => ({
  alignSelf: "center",
  "transition": "200ms",
  ":hover": {
    "opacity": "50%",
    "cursor": "pointer"
  }
}))

const LinkWrapper = styled.div(() => ({
  "transition": "200ms",
  "color": "black",
  ":hover": {
    transition: "400ms",
    color: "#5540ea",
    "cursor": "pointer"
  }
}))


const Right = styled.div(() => ({
  "display": "flex",
  "flex-direction": "row",
  "justifyContent": "flex-end",
  "color": "#5540ea",
  "transition": "200ms",
  ":hover": {
    "opacity": "50%",
    "cursor": "pointer"
  }
}))

const SyncedTo = styled.div(() => ({
  "display": "flex",
  "flex-direction": "row",
  "width": "60vw",
  "padding": "1rem",
  "border-radius": "25px",
  "box-shadow": "0px 5px 9px 2px #B4B1EF",
  "justify-content": "space-between",
  "margin": "0.5rem"
}))

export default function LandingScreen() {
  const [classes, setClasses] = useState([])
  useEffect(() => {
    fetch('/classes')
    .then(response => response.json())
    .then(data => setClasses(data));
  }, [])
  return <Page>
    <Container>
    <Logo style={{width: "60vw"}}/>
    <div>
      <h1 >
      Welcome, <span style={{color: "#5540ea"}}>An Thy</span>.
      </h1>
    </div>
    <SyncedTo>
      <h3 >
        Synced to:
      </h3>
      <Right >
        <ExpandMoreIcon style={{alignSelf: "center", fill: "#5540e", marginRight: "1rem"}}/>
        <h3 >
          Google Classroom
        </h3>
        <img src={Classroom} alt="Google classroom logo" style={{marginLeft: "1.5rem", marginRight: "1.5rem", maxWidth: "3.5rem", width:"100%", maxHeight: "3.5rem"}}/>
      </Right>
    </SyncedTo>
    <div>
      <h1 >
      Your classes:
      </h1>
    </div>
    {classes && classes.map((c) => {
      return (
        <SyncedTo>
          <LinkWrapper>
            <Link style={{textDecoration: "none"}} to={`/classes/${c.id}`}>
            <h3>
              {c.name}
            </h3>
            </Link>
          </LinkWrapper>
          <Tooltip title="Access on site" aria-label="Link to access class on site">
            <IconWrapper onClick={()=>window.open(c.alternateLink, "_blank")}>
              <ArrowForwardIcon/>
            </IconWrapper>
          </Tooltip>
        </SyncedTo>
      )
    })
    }
    </Container>
   
  </Page>
}

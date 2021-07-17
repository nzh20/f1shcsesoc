import {ReactComponent as Parrot } from '../../assets/logo.svg'

import styled from 'styled-components'

const LogoWrapper = styled.div(() => ({
  "transition": "200ms",
  ":hover": {
    "opacity": "50%",
    "cursor": "pointer"
  }
}))

export default function Logo() {
  return <LogoWrapper>
    <Parrot style={{maxWidth: "50vw"}}/>
  </LogoWrapper>
}

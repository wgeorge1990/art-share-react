import React from 'react'
import { Image, Container } from 'semantic-ui-react'
import artShareTextLogo from '../images/artShare.png'


const HeaderImage = (props) => {
  return (
    <Container>
      <Image src={artShareTextLogo} />
    </Container>
  )

}

export default HeaderImage;

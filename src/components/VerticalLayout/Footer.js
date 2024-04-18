import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © HackUSU.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop <i className="mdi mdi-heart text-danger"></i> by &nbsp; 
                <a href="http://minible-v-dark.react.themesbrand.com/dashboard" target="_blank">Theme</a>
              </div>
            </Col>
               {/* <a href="http://minible-v-dark.react.themesbrand.com/dashboard">more</a> */}
              {/* <div className="text-sm-right d-none d-sm-block">
                Design & Develop by Themesbrand
              </div> */}
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer

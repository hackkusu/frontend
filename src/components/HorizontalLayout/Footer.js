import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © HackUSU.</Col>
            <Col md={6}>
              <a href="http://minible-v-dark.react.themesbrand.com/dashboard">more</a>
              {/* <div className="text-sm-right d-none d-sm-block">
                Design & Develop by Themesbrand
              </div> */}
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer

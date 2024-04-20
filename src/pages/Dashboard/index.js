import React from "react";
import { Container, Row, Col, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Components
import MiniWidget from "./mini-widget";
import ResponsesOverTimeChart from "./responses-over-time-chart";
import SentimentOverviewChart from "./sentiment-overview-chart";
import TopUser from "./topuser";
import HighlightResponses from "./highlight-responses";
import SocialSource from "./socialsource";
import LatestTransaction from "./latest-transaction";

//Import Image
import setupanalytics from "../../assets/images/setup-analytics-amico.svg";
import PieChart from "../AllCharts/apex/PieChart"

import SplineArea from "../AllCharts/apex/SplineArea"



const Dashboard = () => {

  document.title=" Dashboard | HackUSU"


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="HackUSU" breadcrumbItem="Dashboard" />
          <Row>
            {/* <MiniWidget reports={reports} /> */}

          </Row>

          <Row>
            <Col xl={12}>
              <ResponsesOverTimeChart />
            </Col>
            <Col xl={12}>
              {/* <Card className="">
                <CardBody>

                  <Row className="align-items-center">
                    <Col sm={8}>
                      <p className="text-white font-size-18">Enhance your <b>Campaign</b> for better outreach <i className="mdi mdi-arrow-right"></i></p>
                      <div className="mt-4">
                        <Link to="#" className="btn btn-success waves-effect waves-light">Upgrade Account!</Link>
                      </div>
                    </Col>
                    <Col sm={4}>
                    <PieChart />
                    </Col>
                  </Row>
                  
                </CardBody>
              </Card> */}
              
              <SentimentOverviewChart />
            </Col>
          </Row>
          <Row>
            {/* <Col xl={4}>
              <TopUser />
            </Col> */}
            <Col xl={12}>
              <HighlightResponses />
            </Col>
            {/* <Col xl={4}>
              <SocialSource />
            </Col> */}
          </Row>
          {/* <LatestTransaction /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
import React, { useEffect, useState } from "react";
import { Card, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Progress } from "reactstrap";
import { PUSHER_CLIENT_ID, get } from "../../helpers/api_helper";
import Pusher from 'pusher-js';

const SentimentOverviewChart = () => {
    const [progressbars, setProgressbars] = useState([]);

    useEffect(() => {
        const fetchInitialData = () => {
            get('/api/get_sentiment_overview')
                .then(data => setProgressbars(data.progressbars))
                .catch(error => console.error('Error fetching sentiment data:', error));
        };

        // Initialize data fetching on mount
        fetchInitialData();

        // Set up Pusher for real-time updates
        const pusher = new Pusher(PUSHER_CLIENT_ID, {
            cluster: 'us3',
            encrypted: true
        });

        const channel = pusher.subscribe('survey-response-channel');
        channel.bind('new-response', (data) => {
            // Re-fetch the data or you could directly manipulate the state depending on the data structure returned
            fetchInitialData();
        });

        return () => {
            pusher.unsubscribe('survey-response-channel');
        };
    }, []);

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end">
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="text-reset" id="dropdownMenuButton5" caret href="#">
                                {/* <span className="fw-semibold">Sort By:</span>  */}
                                <span className="text-muted">Yearly<i className="mdi mdi-chevron-down ms-1"></i></span>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#">Monthly</DropdownItem>
                                <DropdownItem href="#">Yearly</DropdownItem>
                                <DropdownItem href="#">Weekly</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    <h4 className="card-title mb-4">Sentiment Overview</h4>

                    {progressbars.map((progressbar, key) => (
                        <Row className="align-items-center g-0 mt-3" key={key}>
                            <Col sm={3}>
                                <p className="text-truncate mt-1 mb-0"><i className={`mdi mdi-circle-medium text-${progressbar.color} me-2`}></i> {progressbar.title} </p>
                            </Col>
                            <Col sm={9}>
                                <div className="mt-1" style={{ height: "6px" }}>
                                    <Progress
                                        value={progressbar.value}
                                        color={progressbar.color}
                                        size="sm"
                                        className="progress-sm"
                                    />
                                </div>
                            </Col>
                        </Row>
                    ))}
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default SentimentOverviewChart;
